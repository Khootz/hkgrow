from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from urllib.parse import urlencode

app = Flask(__name__)
CORS(app)

# Your Google Maps API Key
API_KEY = "AIzaSyB1wtsPtU3a4zB9PwcdbhgFhgLqJlQneew"

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "HK Grow Backend API is running on Vercel!"})

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "message": "Backend is running"})

@app.route('/api/extract-leads', methods=['POST'])
def extract_leads():
    try:
        data = request.json
        if not data:
            return jsonify({'success': False, 'error': 'No data provided'}), 400
            
        keywords = data.get('keywords', '').strip()
        location = data.get('location', '').strip()
        
        if not keywords or not location:
            return jsonify({'success': False, 'error': 'Keywords and location required'}), 400
        
        # Geocode location
        geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?{urlencode({'address': location, 'key': API_KEY})}"
        geocode_resp = requests.get(geocode_url, timeout=10).json()
        
        if not geocode_resp.get('results'):
            return jsonify({'success': False, 'error': f'Location not found: {location}'}), 400
            
        loc = geocode_resp['results'][0]['geometry']['location']
        lat, lng = loc['lat'], loc['lng']
        
        # Search nearby places
        search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        search_params = {
            'key': API_KEY,
            'location': f"{lat},{lng}",
            'keyword': keywords,
            'radius': 500
        }
        
        search_resp = requests.get(search_url, params=search_params, timeout=10).json()
        places = search_resp.get('results', [])[:5]  # Limit to 5
        
        # Get detailed info for each place
        leads = []
        for place in places:
            details_url = "https://maps.googleapis.com/maps/api/place/details/json"
            details_params = {
                'key': API_KEY,
                'place_id': place['place_id'],
                'fields': 'name,formatted_address,international_phone_number,website,rating,user_ratings_total'
            }
            
            try:
                details_resp = requests.get(details_url, params=details_params, timeout=10).json()
                result = details_resp.get('result', {})
                
                leads.append({
                    'name': result.get('name', 'Unknown'),
                    'address': result.get('formatted_address', ''),
                    'phone': result.get('international_phone_number', ''),
                    'website': result.get('website', ''),
                    'rating': result.get('rating', ''),
                    'user_ratings_total': result.get('user_ratings_total', '')
                })
            except:
                continue
        
        return jsonify({
            'success': True,
            'message': f'Successfully extracted {len(leads)} leads',
            'data': {
                'leads': leads,
                'records_count': len(leads),
                'location': location,
                'keywords': keywords,
                'filename': f"{keywords.replace(' ', '_')}.csv"
            }
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)