# LinkedIn Targeting Integration

## Overview
The LinkedIn Targeting feature allows users to search for management-level professionals at specific companies using Google Custom Search API. This integration extracts LinkedIn profiles and provides detailed information for outreach campaigns.

## Backend Implementation (`people_extractor.py`)

### Key Features:
- **Google Custom Search Integration**: Uses Google Custom Search API to find LinkedIn profiles
- **Smart Filtering**: Filters results to management positions (CEO, CTO, VP, Director, Manager, etc.)
- **Company Matching**: Uses similarity algorithms to ensure profiles match the target company
- **Vercel Compatible**: Optimized for serverless deployment with `/tmp` directory usage
- **CSV Export**: Automatically generates CSV files with extracted profile data

### API Endpoint:
```
POST /api/extract-linkedin-profiles
```

#### Request Body:
```json
{
  "company_name": "Tesla",
  "limit": 10
}
```

#### Response:
```json
{
  "success": true,
  "profiles": [
    {
      "id": "1",
      "name": "Howard Ro",
      "role_title": "Tesla",
      "linkedin_url": "https://www.linkedin.com/in/hro",
      "company": "Tesla",
      "location": "Taiwan",
      "connection_level": "3rd",
      "experience": "3+ years"
    }
  ],
  "count": 3,
  "company": "Tesla",
  "filename": "tesla_linkedin_profiles_20250923_034620.csv",
  "message": "Successfully extracted 3 LinkedIn profiles for Tesla"
}
```

## Frontend Implementation (`LinkedInTargeting.tsx`)

### Features:
- **Company Search**: Clean input interface for entering company names
- **Profile Results**: Card-based layout showing management profiles with avatars, titles, and connection info
- **Profile Selection**: Click to select/deselect profiles with visual feedback
- **Message Composition**: Toggle between custom writing and AI generation (UI ready)
- **Professional Design**: Uses glass card aesthetic consistent with the app design

### Usage:
1. Enter a company name (e.g., "Tesla", "Apple", "Microsoft")
2. Click "Search" to find LinkedIn profiles
3. Review the management profiles displayed
4. Select profiles for outreach campaigns
5. Compose messages (custom or AI-generated)
6. Send messages to selected profiles

## Configuration

### Environment Variables:
```env
VITE_API_URL=https://hkgrow-6vghzu7ui-thiens-projects-80bfe1b8.vercel.app
```

### Google API Keys:
The backend uses Google Custom Search API with the following credentials:
- `GOOGLE_API_KEY`: AIzaSyBolcztbvjV-c7tD21uzH7g4zV-F11pZdI
- `GOOGLE_CSE_ID`: 124ddefbc9b4c43c3

## Testing

### Backend Test:
```powershell
Invoke-RestMethod -Uri "https://hkgrow-6vghzu7ui-thiens-projects-80bfe1b8.vercel.app/api/extract-linkedin-profiles" -Method POST -ContentType "application/json" -Body '{"company_name": "Tesla", "limit": 3}'
```

### Expected Results:
- Successfully extracts LinkedIn profiles for management positions
- Returns structured data with names, titles, LinkedIn URLs, and metadata
- Generates CSV files for download
- Handles various company names and sizes

## Deployment Status:
✅ Backend deployed to: `https://hkgrow-6vghzu7ui-thiens-projects-80bfe1b8.vercel.app`
✅ Frontend integrated and ready for use
✅ API tested and working with real companies (Tesla, Apple, Microsoft)
✅ Environment variables configured
✅ Repository updated and synced to GitHub

## Next Steps:
- AI message generation integration
- Message sending functionality
- Enhanced profile filtering options
- Connection level analysis
- Bulk outreach campaigns