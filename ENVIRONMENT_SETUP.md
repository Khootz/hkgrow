# Environment Variables Setup Guide

## Security Fix Applied ✅

The API keys have been moved from hardcoded values to environment variables for security.

## Local Development Setup

1. **Copy environment variables:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file with your actual API keys:**
   ```bash
   VITE_API_URL=http://localhost:5000
   GOOGLE_API_KEY=your_actual_google_search_api_key
   GOOGLE_CSE_ID=your_actual_custom_search_engine_id  
   GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key
   ```

3. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

## Vercel Deployment Setup

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your `hkgrow` project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

   | Name | Value |
   |------|-------|
   | `GOOGLE_API_KEY` | `AIzaSyBolcztbvjV-c7tD21uzH7g4zV-F11pZdI` |
   | `GOOGLE_CSE_ID` | `124ddefbc9b4c43c3` |
   | `GOOGLE_MAPS_API_KEY` | `AIzaSyB1wtsPtU3a4zB9PwcdbhgFhgLqJlQneew` |

5. **Redeploy** your application for changes to take effect

### Option 2: Via Vercel CLI
```bash
vercel env add GOOGLE_API_KEY
vercel env add GOOGLE_CSE_ID  
vercel env add GOOGLE_MAPS_API_KEY
```

## Files Changed ✅

- ✅ `backend/people_extractor.py` - API keys moved to environment variables
- ✅ `backend/lead_extractor.py` - API keys moved to environment variables
- ✅ `backend/app.py` - Added dotenv support
- ✅ `backend/requirements.txt` - Added python-dotenv dependency
- ✅ `.env` - Added actual API keys (NOT committed to git)
- ✅ `.env.example` - Template for required environment variables
- ✅ `.gitignore` - Added .env files to prevent committing secrets
- ✅ `GoogleMap/people.py` - API keys moved to environment variables

## Important Security Notes 🔒

- ✅ **API keys are no longer hardcoded in source files**
- ✅ **`.env` files are gitignored and won't be committed**
- ✅ **Production environment uses Vercel environment variables**
- ⚠️ **Your API keys are still in git history** - Consider rotating them

## Next Steps

1. **Set up Vercel environment variables** (see above)
2. **Redeploy your application**
3. **Consider rotating your API keys** since they were previously exposed in git history
4. **Test both local and production deployments**

## Testing

- **Local:** Run `python backend/app.py` - should load from `.env`
- **Production:** Deploy to Vercel - should load from Vercel environment variables