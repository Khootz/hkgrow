import os
import csv
import time
import requests
import math
from urllib.parse import urlencode

API_KEY = "AIzaSyB1wtsPtU3a4zB9PwcdbhgFhgLqJlQneew"

def geocode_address(address: str) -> tuple[float, float]:
    """Geocode an address to get lat/lng coordinates."""
    geocode_url = (
        "https://maps.googleapis.com/maps/api/geocode/json?"
        + urlencode({"address": address, "key": API_KEY})
    )
    resp = requests.get(geocode_url, timeout=10).json()
    results = resp.get("results")
    if not results:
        raise ValueError(f"Geocode failed for '{address}': {resp.get('status')}")
    loc = results[0]["geometry"]["location"]
    return loc["lat"], loc["lng"]

def nearby_search(lat: float, lng: float, keyword: str, radius: int = 500, limit: int = 5):
    """Search for places near the given coordinates."""
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "key": API_KEY,
        "location": f"{lat},{lng}",
        "keyword": keyword,
        "radius": radius,
    }

    places_found = 0
    while places_found < limit:
        resp = requests.get(base_url, params=params, timeout=10).json()
        
        for place in resp.get("results", []):
            if places_found >= limit:
                break
            yield place
            places_found += 1
        
        # Break if we've found enough places or there's no next page
        if places_found >= limit:
            break
            
        next_token = resp.get("next_page_token")
        if not next_token:
            break
            
        time.sleep(2)
        params = {"key": API_KEY, "pagetoken": next_token}

def normalize_address(address: str) -> str:
    """Normalize address format."""
    if not isinstance(address, str):
        return address
    parts = [p.strip() for p in address.split(",")]
    if parts and parts[0].lower() == "hong kong":
        parts = parts[1:] + [parts[0]]
    return ", ".join([p for p in parts if p])

def get_place_details(place_id: str) -> dict:
    """Get detailed information about a place."""
    details_url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "key": API_KEY,
        "place_id": place_id,
        "fields": ",".join([
            "name",
            "formatted_address",
            "international_phone_number",
            "website",
            "price_level",
            "rating",
            "user_ratings_total",
            "geometry",
        ])
    }
    resp = requests.get(details_url, params=params, timeout=10).json()
    return resp.get("result", {})

def save_csv(rows: list[dict], filename: str):
    """Write list of dicts to CSV."""
    if not rows:
        print("No data to save.")
        return
    
    # Ensure the directory exists
    os.makedirs(os.path.dirname(filename) if os.path.dirname(filename) else '.', exist_ok=True)
    
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    print(f"✅ Saved {len(rows)} rows to {filename}")

def extract_leads(keywords: str, location: str, category: str = "") -> dict:
    """
    Extract leads based on keywords and location.
    Returns a dictionary with extraction results.
    """
    try:
        print(f"🔍 Geocoding location: {location}...")
        lat, lng = geocode_address(location)
        print(f"   ➜ {location} → {lat:.5f}, {lng:.5f}")

        print(f"📡 Searching for '{keywords}' near {location}...")
        records = []
        limit = 5  # Set limit to 5 as requested
        
        for place in nearby_search(lat, lng, keywords, limit=limit):
            try:
                details = get_place_details(place["place_id"])
                time.sleep(0.2)  # Rate limiting
                
                normalized_address = normalize_address(details.get("formatted_address", ""))
                record = {
                    "name": details.get("name", ""),
                    "address": normalized_address,
                    "phone": details.get("international_phone_number", ""),
                    "website": details.get("website", ""),
                    "price_level": details.get("price_level", ""),
                    "rating": details.get("rating", ""),
                    "user_ratings_total": details.get("user_ratings_total", ""),
                }
                records.append(record)
                print(f"   → {details.get('name', 'Unknown')}")
                
            except Exception as e:
                print(f"   ✗ Error processing place: {e}")
                continue

        print(f"🔎 Found {len(records)} places.")
        
        # Create filename based on keywords
        safe_keywords = "".join(c for c in keywords if c.isalnum() or c in (' ', '-', '_')).rstrip()
        safe_keywords = safe_keywords.replace(' ', '_')
        filename = f"c:/Users/User/Desktop/hkgrow/backend/exports/{safe_keywords}.csv"
        
        # Save to CSV
        save_csv(records, filename)
        
        return {
            "records_count": len(records),
            "filename": filename,
            "success": True
        }
        
    except Exception as e:
        print(f"❌ Error during extraction: {e}")
        raise e

def main():
    """Main function for standalone usage."""
    keyword = input("Enter keyword: ").strip()
    location = input("Enter location: ").strip()
    
    if not keyword or not location:
        print("Both keyword and location are required.")
        return
    
    try:
        result = extract_leads(keyword, location)
        print(f"\n🎉 SUMMARY: {result['records_count']} records saved to {result['filename']}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if API_KEY in ("", "PASTE_YOUR_KEY_HERE", "(hidden)"):
        raise SystemExit("‼ Please set your GOOGLE_API_KEY.")
    main()