import requests
from difflib import SequenceMatcher
import csv
import json
from datetime import datetime
import os
import tempfile

# Use environment variables for API keys
GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
GOOGLE_CSE_ID = os.environ.get('GOOGLE_CSE_ID')

# Validate that required environment variables are set
if not GOOGLE_API_KEY or not GOOGLE_CSE_ID:
    raise ValueError("Missing required environment variables: GOOGLE_API_KEY and/or GOOGLE_CSE_ID")

def google_search(query, api_key, cse_id, max_results=10):
    """Perform Google Custom Search API call"""
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": api_key,
        "cx": cse_id,
        "q": query,
        "num": min(max_results, 10)
    }
    try:
        resp = requests.get(url, params=params)
        resp.raise_for_status()
        data = resp.json()
        items = data.get("items", [])
        return items
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error during search: {e}")
        return []
    except Exception as e:
        print(f"Error during search: {e}")
        return []

def calculate_similarity(text1, text2):
    """Calculate similarity between two strings (0.0 to 1.0)"""
    return SequenceMatcher(None, text1.lower(), text2.lower()).ratio()

def company_name_matches(company_name, title, threshold=0.6):
    """Enhanced company name matching with multiple variations"""
    company_lower = company_name.lower()
    title_lower = title.lower()
    
    # Create variations of company name to check
    company_variations = [
        company_name.lower(),
        normalize_company_name(company_name).lower()
    ]
    
    # Add version without common suffixes
    base_name = normalize_company_name(company_name)
    if base_name != company_name:
        company_variations.append(base_name.lower())
    
    # Remove duplicates while preserving order
    seen = set()
    company_variations = [x for x in company_variations if not (x in seen or seen.add(x))]
    
    print(f"Checking company variations: {company_variations}")
    
    # Check exact matches first
    for variation in company_variations:
        if variation in title_lower:
            print(f"Exact match found for '{variation}'")
            return True, 1.0
    
    # Check word-by-word similarity
    for variation in company_variations:
        company_words = variation.split()
        title_words = title_lower.split()
        
        for company_word in company_words:
            if len(company_word) < 3:  # Skip very short words
                continue
            for title_word in title_words:
                similarity = calculate_similarity(company_word, title_word)
                if similarity >= threshold:
                    print(f"Word match: '{company_word}' ~ '{title_word}' (similarity: {similarity:.2f})")
                    return True, similarity
    
    # Check substring similarity
    max_similarity = 0
    best_match = ""
    for variation in company_variations:
        for i in range(len(title_lower) - len(variation) + 1):
            title_segment = title_lower[i:i+len(variation)]
            similarity = calculate_similarity(variation, title_segment)
            if similarity > max_similarity:
                max_similarity = similarity
                best_match = title_segment
    
    if max_similarity >= threshold:
        print(f"Substring match: '{best_match}' (similarity: {max_similarity:.2f})")
    
    return max_similarity >= threshold, max_similarity

def extract_name_from_title(title):
    """Extract person's name from LinkedIn title"""
    # Common patterns: "Name - Title | LinkedIn" or "Name | Professional Title"
    name = title.split(' - ')[0].split(' | ')[0].strip()
    # Remove common LinkedIn suffixes
    name = name.replace(' | LinkedIn', '').replace(' - LinkedIn', '').strip()
    return name

def extract_location_from_snippet(snippet):
    """Extract location information from snippet"""
    # Look for location patterns in snippet
    location_keywords = ['Taiwan', 'Hong Kong', 'Singapore', 'China', 'Asia', 'CA', 'NY', 'USA']
    for keyword in location_keywords:
        if keyword in snippet:
            return keyword
    return "Unknown"

def determine_connection_level():
    """Randomly assign connection level for demo purposes"""
    import random
    levels = ["1st", "2nd", "3rd"]
    return random.choice(levels)

def extract_experience_from_snippet(snippet, title):
    """Extract experience information from snippet or title"""
    # Look for experience indicators
    if "Senior" in title or "Director" in title or "VP" in title or "Chief" in title:
        return "10+ years"
    elif "Manager" in title or "Lead" in title:
        return "5+ years"
    else:
        return "3+ years"

def save_to_csv(people, company_name):
    """Save results to CSV file in appropriate directory"""
    try:
        # Determine if running on Vercel (serverless) or locally
        is_vercel = os.environ.get('VERCEL') == '1' or os.environ.get('NOW_REGION')
        
        if is_vercel:
            # Use /tmp directory for Vercel serverless functions
            base_dir = '/tmp'
        else:
            # Use current directory for local development
            base_dir = os.getcwd()
            
        # Create exports directory if it doesn't exist
        exports_dir = os.path.join(base_dir, 'exports')
        os.makedirs(exports_dir, exist_ok=True)
        
        # Generate filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{company_name.replace(' ', '_').lower()}_linkedin_profiles_{timestamp}.csv"
        filepath = os.path.join(exports_dir, filename)
        
        with open(filepath, 'w', newline='', encoding='utf-8') as csvfile:
            fieldnames = ['Company', 'Name', 'Title', 'LinkedIn_URL', 'Location', 'Connection_Level', 'Experience']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for person in people:
                writer.writerow({
                    'Company': company_name,
                    'Name': person['name'],
                    'Title': person['role_title'],
                    'LinkedIn_URL': person['linkedin_url'],
                    'Location': person.get('location', 'Unknown'),
                    'Connection_Level': person.get('connection_level', '2nd'),
                    'Experience': person.get('experience', '5+ years')
                })
        
        return filepath
        
    except Exception as e:
        print(f"Error saving CSV: {e}")
        return None

def normalize_company_name(company_name):
    """Normalize company name for search queries"""
    # Remove common location suffixes that might interfere with search
    name = company_name.strip()
    
    # Remove HK/Hong Kong suffixes for search but keep for matching
    search_name = name
    location_suffixes = ['HK', 'Hong Kong', 'Ltd', 'Limited', 'Co.', 'Inc.', 'Corp.']
    
    for suffix in location_suffixes:
        if search_name.endswith(f' {suffix}'):
            search_name = search_name[:-len(f' {suffix}')].strip()
        elif search_name.endswith(suffix):
            search_name = search_name[:-len(suffix)].strip()
    
    return search_name

def scrape_company_people(company_name, location="Hong Kong", limit=10):
    """Main function to scrape LinkedIn profiles for a company"""
    all_results = []
    
    # Use normalized company name for search queries
    search_company_name = normalize_company_name(company_name)
    
    print(f"Original company name: {company_name}")
    print(f"Normalized for search: {search_company_name}")
    print(f"Location: {location}")
    
    # Single comprehensive search query - simple and effective
    search_query = f'site:linkedin.com/in/ "{search_company_name}" {location}'
    
    print(f"\nSearching: {search_query}")
    search_results = google_search(search_query, GOOGLE_API_KEY, GOOGLE_CSE_ID, max_results=10)
    
    if not search_results:
        print("No search results found.")
        return []
    
    for item in search_results:
            if len(all_results) >= limit:
                break
                
            link = item.get("link", "")
            title = item.get("title", "")
            snippet = item.get("snippet", "")
            
            print(f"Found result: {title[:60]}...")
            
            # Only accept individual LinkedIn profiles
            is_individual_profile = (
                'linkedin.com/in/' in link.lower() and 
                '/pub/dir/' not in link.lower() and
                '/company/' not in link.lower() and
                '/posts/' not in link.lower()
            )
            
            # Check if company name appears in the title with similarity threshold
            company_matches, similarity_score = company_name_matches(company_name, title, threshold=0.5)
            
            print(f"Individual Profile: {is_individual_profile}, Company Match: {company_matches} (similarity: {similarity_score:.2f})")
            
            if is_individual_profile and company_matches:
                # Extract information
                name = extract_name_from_title(title)
                
                # Extract role title
                role_title = ""
                if " - " in title:
                    after_dash = title.split(" - ", 1)[1]
                    role_title = after_dash.split(" | ")[0].strip()
                
                # Extract additional info
                location = extract_location_from_snippet(snippet)
                connection_level = determine_connection_level()
                experience = extract_experience_from_snippet(snippet, title)
                
                profile_data = {
                    'id': str(len(all_results) + 1),
                    'name': name,
                    'role_title': role_title,
                    'linkedin_url': link,
                    'full_title': title,
                    'snippet': snippet,
                    'location': location,
                    'connection_level': connection_level,
                    'experience': experience,
                    'company': company_name
                }
                
                all_results.append(profile_data)
                print(f"✓ ACCEPTED: {name} - {role_title}")
            else:
                print("✗ REJECTED: Does not meet filter criteria")
    
    # Remove duplicates based on name (case-insensitive)
    unique_results = []
    seen_names = set()
    
    for person in all_results:
        name_lower = person['name'].lower().strip()
        if name_lower not in seen_names and name_lower:
            seen_names.add(name_lower)
            unique_results.append(person)
    
    print(f"Total profiles found: {len(all_results)}")
    print(f"Unique people after removing duplicates: {len(unique_results)}")
    
    # Limit results
    limited_results = unique_results[:limit]
    
    return limited_results

def extract_linkedin_profiles(company_name, location="Hong Kong", limit=10):
    """Main API function to extract LinkedIn profiles"""
    try:
        print(f"Starting LinkedIn profile extraction for: {company_name} in {location}")
        
        # Extract profiles
        profiles = scrape_company_people(company_name, location, limit)
        
        if not profiles:
            return {
                'success': False,
                'error': 'No LinkedIn profiles found for the specified company',
                'profiles': [],
                'count': 0,
                'filename': None
            }
        
        # Save to CSV
        csv_filepath = save_to_csv(profiles, company_name)
        
        # Return results
        result = {
            'success': True,
            'profiles': profiles,
            'count': len(profiles),
            'company': company_name,
            'filename': os.path.basename(csv_filepath) if csv_filepath else None,
            'message': f'Successfully extracted {len(profiles)} LinkedIn profiles for {company_name}'
        }
        
        print(f"LinkedIn extraction completed: {len(profiles)} profiles found")
        return result
        
    except Exception as e:
        print(f"Error during LinkedIn extraction: {e}")
        return {
            'success': False,
            'error': str(e),
            'profiles': [],
            'count': 0,
            'filename': None
        }

if __name__ == "__main__":
    # Test function
    company = "Microsoft"
    result = extract_linkedin_profiles(company, limit=5)
    print(json.dumps(result, indent=2))