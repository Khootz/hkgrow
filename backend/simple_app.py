from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
from urllib.parse import urlencode

app = Flask(__name__)

# Configure CORS with specific settings for production
CORS(app, 
     origins=['*'],  # Allow all origins for now
     methods=['GET', 'POST', 'OPTIONS'],
     allow_headers=['Content-Type', 'Accept', 'Authorization'],
     supports_credentials=False)

# Your Google Maps API Key
API_KEY = "AIzaSyB1wtsPtU3a4zB9PwcdbhgFhgLqJlQneew"

# Add CORS headers to all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'false')
    return response

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "HK Grow Backend API is running on Vercel!", "cors": "enabled"})

@app.route('/api/health', methods=['GET', 'OPTIONS'])
def health():
    if request.method == 'OPTIONS':
        # Handle preflight request
        response = jsonify({'status': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET, OPTIONS')
        return response
    
    return jsonify({"status": "healthy", "message": "Backend is running", "cors": "enabled"})

@app.route('/api/extract-leads', methods=['POST', 'OPTIONS'])
def extract_leads():
    # Handle preflight OPTIONS request explicitly
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
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
        
        # For testing, let's use mock data to isolate the CORS issue
        mock_leads = [
            {
                'name': f'{keywords} Business 1',
                'address': f'123 Main St, {location}',
                'phone': '+852-1234-5678',
                'website': 'https://example1.com',
                'rating': 4.5,
                'user_ratings_total': 123
            },
            {
                'name': f'{keywords} Business 2',
                'address': f'456 Central Ave, {location}',
                'phone': '+852-8765-4321',
                'website': 'https://example2.com',
                'rating': 4.2,
                'user_ratings_total': 89
            },
            {
                'name': f'{keywords} Business 3',
                'address': f'789 Queen St, {location}',
                'phone': '+852-5555-1234',
                'website': 'https://example3.com',
                'rating': 4.7,
                'user_ratings_total': 156
            },
            {
                'name': f'{keywords} Business 4',
                'address': f'321 King Rd, {location}',
                'phone': '+852-9999-8888',
                'website': 'https://example4.com',
                'rating': 4.0,
                'user_ratings_total': 67
            },
            {
                'name': f'{keywords} Business 5',
                'address': f'654 Harbor St, {location}',
                'phone': '+852-7777-2222',
                'website': 'https://example5.com',
                'rating': 4.3,
                'user_ratings_total': 234
            }
        ]
        
        response_data = {
            'success': True,
            'message': f'Successfully extracted {len(mock_leads)} leads',
            'data': {
                'leads': mock_leads,
                'records_count': len(mock_leads),
                'location': location,
                'keywords': keywords,
                'filename': f"{keywords.replace(' ', '_').replace(',', '_')}.csv"
            }
        }
        
        response = jsonify(response_data)
        # Add explicit CORS headers
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
        
    except Exception as e:
        error_response = jsonify({'success': False, 'error': f'Server error: {str(e)}'})
        # Add CORS headers to error responses too
        error_response.headers.add('Access-Control-Allow-Origin', '*')
        error_response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization')
        error_response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return error_response, 500

# Add global after_request handler for additional CORS support
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    response.headers.add('Access-Control-Allow-Credentials', 'false')
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)