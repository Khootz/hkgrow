# Lead Extraction Backend

This backend integrates your Google Maps scraping functionality with the React dashboard.

## Setup Instructions

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Start the Flask Server
```bash
python app.py
```

Or use the batch file:
```bash
start_server.bat
```

The server will run on `http://127.0.0.1:5000`

## API Endpoints

### POST /api/extract-leads
Extract leads based on keywords and location.

**Request Body:**
```json
{
  "keywords": "coffee shop",
  "location": "Hong Kong",
  "category": "restaurant" // optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully extracted 5 leads",
  "data": {
    "filename": "coffee_shop.csv",
    "records_count": 5,
    "location": "Hong Kong",
    "keywords": "coffee shop"
  }
}
```

### GET /api/health
Health check endpoint.

## Features

- Extracts up to 5 leads per request (as requested)
- Creates CSV files named after keywords (e.g., `coffee_shop.csv`)
- Runs only once per request (no loops or multiple iterations)
- Returns detailed place information including name, address, phone, website, rating
- CORS enabled for frontend integration

## File Structure

```
backend/
├── app.py                 # Flask server
├── lead_extractor.py      # Refactored Google Maps scraping logic
├── requirements.txt       # Python dependencies
├── start_server.bat      # Windows startup script
├── exports/              # Directory where CSV files are saved
└── README.md             # This file
```

## Notes

- Make sure your Google Maps API key is valid
- The server must be running before using the React frontend
- CSV files are saved in the `exports/` directory
- Each extraction creates a new CSV file (no appending)