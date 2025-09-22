from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from lead_extractor import extract_leads

app = Flask(__name__)

# Enhanced CORS configuration
CORS(app, 
     origins=['*'],
     methods=['GET', 'POST', 'OPTIONS'],
     allow_headers=['Content-Type', 'Accept', 'Authorization'],
     supports_credentials=False)

@app.route('/api/extract-leads', methods=['POST', 'OPTIONS'])
def api_extract_leads():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
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
    return jsonify({'status': 'healthy', 'message': 'Backend is running'})

@app.route('/api/download/<filename>', methods=['GET'])
def download_file(filename):
    try:
        # Ensure the filename is safe and exists
        import os
        from flask import send_file
        
        # Enhanced Vercel/serverless environment detection
        is_vercel = (
            os.environ.get("VERCEL") == "1" or 
            os.environ.get("VERCEL_ENV") is not None or 
            "/var/task" in os.environ.get("PYTHONPATH", "") or
            os.path.exists("/tmp") and not os.path.exists("C:\\")
        )
        
        if is_vercel:
            base_dir = "/tmp"
            print(f"🔧 Using Vercel serverless directory for download: {base_dir}")
        else:
            base_dir = "exports"
            print(f"🔧 Using local directory for download: {base_dir}")
        
        # Construct the full path to the file
        file_path = os.path.join(base_dir, filename)
        print(f"📥 Attempting to download file: {file_path}")
        
        if os.path.exists(file_path):
            print(f"✅ File found, sending: {file_path}")
            return send_file(file_path, as_attachment=True, download_name=filename)
        else:
            print(f"❌ File not found: {file_path}")
            return jsonify({'error': f'File not found: {filename}'}), 404
            
    except Exception as e:
        print(f"Error downloading file: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def root():
    return jsonify({'message': 'HK Grow Backend API is running'})

# Add global after_request handler for additional CORS support
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    response.headers.add('Access-Control-Allow-Credentials', 'false')
    return response

# For Vercel deployment
if __name__ != '__main__':
    # This is for Vercel
    application = app
else:
    # This is for local development
    if __name__ == "__main__":
        print("Starting Flask server...")
        app.run(debug=True, host='127.0.0.1', port=5000)