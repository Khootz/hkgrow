from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from lead_extractor import extract_leads

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/extract-leads', methods=['POST'])
def api_extract_leads():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        keywords = data.get('keywords', '').strip()
        location = data.get('location', '').strip()
        category = data.get('category', '')
        
        if not keywords or not location:
            return jsonify({'error': 'Keywords and location are required'}), 400
        
        print(f"Starting extraction for keywords: '{keywords}' in location: '{location}'")
        
        # Call the lead extraction function
        result = extract_leads(keywords, location, category)
        
        return jsonify({
            'success': True,
            'message': f'Successfully extracted {result["records_count"]} leads',
            'data': {
                'filename': result['filename'],
                'records_count': result['records_count'],
                'location': location,
                'keywords': keywords
            }
        })
        
    except Exception as e:
        print(f"Error during extraction: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, host='127.0.0.1', port=5000)