import { useState } from "react";
import { Search, Download, Play, MapPin, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const recentExtractions = [
  {
    id: 1,
    name: "Coffee Shops - Central HK",
    keywords: "coffee shop, cafe",
    location: "Central, Hong Kong",
    results: 234,
    status: "Completed",
    date: "2 hours ago"
  },
  {
    id: 2,
    name: "Restaurants - Tsim Sha Tsui",
    keywords: "restaurant, dining",
    location: "Tsim Sha Tsui, Hong Kong",
    results: 156,
    status: "Completed",
    date: "1 day ago"
  },
  {
    id: 3,
    name: "Fitness Centers - Kowloon",
    keywords: "gym, fitness center",
    location: "Kowloon, Hong Kong",
    results: 89,
    status: "Completed",
    date: "3 days ago"
  }
];

export default function LeadsPage() {
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [extractionResult, setExtractionResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // Test backend connection
  const testConnection = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hkgrow-n2ye94dqf-thiens-projects-80bfe1b8.vercel.app';
    
    const addDebugLog = (message: string) => {
      const timestamp = new Date().toLocaleTimeString();
      const logMessage = `[${timestamp}] ${message}`;
      console.log(logMessage);
      setDebugInfo(prev => [...prev, logMessage]);
    };

    setIsTestingConnection(true);
    setDebugInfo([]);

    try {
      addDebugLog(`🧪 Testing connection to: ${API_BASE_URL}/api/health`);
      
      const response = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      addDebugLog(`📈 Health check response: ${response.status} ${response.statusText}`);
      addDebugLog(`🔍 Response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`);

      if (response.ok) {
        const result = await response.json();
        addDebugLog(`✅ Connection successful! Response: ${JSON.stringify(result)}`);
        setExtractionResult({
          success: true,
          message: `✅ Backend connection successful! Status: ${result.status}`,
        });
      } else {
        addDebugLog(`❌ Health check failed: ${response.status}`);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      addDebugLog(`💥 Connection test failed: ${error instanceof Error ? error.message : String(error)}`);
      setExtractionResult({
        success: false,
        message: `❌ Connection failed: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleStartExtraction = async () => {
    if (!keywords.trim() || !location.trim()) {
      alert("Please enter both keywords and location");
      return;
    }

    setIsExtracting(true);
    setExtractionResult(null);
    setDebugInfo([]);

    const addDebugLog = (message: string) => {
      const timestamp = new Date().toLocaleTimeString();
      const logMessage = `[${timestamp}] ${message}`;
      console.log(logMessage);
      setDebugInfo(prev => [...prev, logMessage]);
    };

    // Define API URL at the start so it's available in catch block
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hkgrow-n2ye94dqf-thiens-projects-80bfe1b8.vercel.app';

    try {
      addDebugLog(`🚀 Starting extraction with keywords: "${keywords}", location: "${location}"`);
      addDebugLog(`🌐 Backend URL: ${API_BASE_URL}`);
      addDebugLog(`📡 Making request to: ${API_BASE_URL}/api/extract-leads`);

      const requestBody = {
        keywords: keywords.trim(),
        location: location.trim(),
        category: category
      };
      
      addDebugLog(`📦 Request payload: ${JSON.stringify(requestBody)}`);
      addDebugLog(`⏰ Starting fetch request with 30s timeout...`);

      // Add timeout to catch hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        addDebugLog(`⏰ Request timeout (30 seconds) - aborting...`);
        controller.abort();
      }, 30000);

      const response = await fetch(`${API_BASE_URL}/api/extract-leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      addDebugLog(`📈 Response received! Status: ${response.status} ${response.statusText}`);
      addDebugLog(`🔍 Response headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`);

      if (!response.ok) {
        addDebugLog(`❌ Response not OK: ${response.status}`);
        const errorText = await response.text();
        addDebugLog(`❌ Error response body: ${errorText}`);
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      addDebugLog(`📥 Reading response JSON...`);
      const result = await response.json();
      addDebugLog(`📋 Response data: ${JSON.stringify(result, null, 2)}`);
      
      if (result.success) {
        addDebugLog(`✅ Extraction successful: ${result.message}`);
        setExtractionResult({
          success: true,
          message: result.message,
          data: result.data
        });
      } else {
        addDebugLog(`❌ Extraction failed: ${result.error}`);
        setExtractionResult({
          success: false,
          message: result.error || 'An error occurred during extraction'
        });
      }
    } catch (error) {
      addDebugLog(`💥 Caught error: ${error instanceof Error ? error.name : 'Unknown error'}`);
      addDebugLog(`💥 Error message: ${error instanceof Error ? error.message : String(error)}`);
      addDebugLog(`💥 Error type: ${typeof error}`);
      console.error('Extraction failed:', error);
      
      let errorMessage = 'An unexpected error occurred.';
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = `⏰ Request Timed Out (30 seconds)
          
This means the request is taking too long. Possible causes:
1. 🌐 Backend server is overloaded or slow
2. 🔗 Network connectivity is slow
3. 🚫 Request is being blocked somewhere
4. 📡 DNS resolution issues

Backend URL: ${API_BASE_URL}
Try opening: ${API_BASE_URL}/api/health in your browser to test connectivity.`;
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
          errorMessage = `🚨 Network/Connection Error
          
Error: ${error.message}
Backend: ${API_BASE_URL}

This usually means:
1. 🌐 Backend server is down or unreachable
2. 🔗 No internet connection
3. 🚫 CORS policy is blocking the request
4. 🔒 Mixed content (HTTP vs HTTPS) issue

Debug steps:
1. Open ${API_BASE_URL}/api/health in your browser
2. Check browser network tab (F12)
3. Check console for CORS errors`;
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = `🌐 Fetch Request Failed
          
This is typically a network or CORS issue:
1. 🔗 Check internet connection
2. 🚫 CORS policy blocking request
3. 🌐 Backend server unreachable
4. 🔒 Browser security blocking request

Backend URL: ${API_BASE_URL}
Test direct access: ${API_BASE_URL}/api/health`;
        } else {
          errorMessage = `❌ Unexpected Error
          
Type: ${error.name}
Message: ${error.message}
Backend: ${API_BASE_URL}

Check debug logs below for more details.`;
        }
      } else {
        errorMessage = `❌ Unknown Error Type
        
Error: ${String(error)}
Backend: ${API_BASE_URL}`;
      }
      
      setExtractionResult({
        success: false,
        message: errorMessage
      });
    } finally {
      addDebugLog(`🏁 Extraction process completed. isExtracting: false`);
      setIsExtracting(false);
    }
  };

  const handleDownloadCSV = () => {
    if (extractionResult?.data?.filename) {
      // Create download link for the CSV file
      const downloadUrl = `${import.meta.env.VITE_API_URL || 'https://hkgrow-n2ye94dqf-thiens-projects-80bfe1b8.vercel.app'}/api/download/${extractionResult.data.filename.split('/').pop()}`;
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = extractionResult.data.filename.split('/').pop() || 'leads.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Lead Extraction</h1>
          <p className="text-white/60">Extract leads from Google Maps and OpenRice</p>
        </div>
      </div>

      {/* Extraction Result */}
      {extractionResult && (
        <div className={`p-4 rounded-lg border ${
          extractionResult.success 
            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
            : 'bg-red-500/10 border-red-500/20 text-red-400'
        }`}>
          <p>{extractionResult.message}</p>
          {extractionResult.success && extractionResult.data && (
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-white/60">
                File saved: {extractionResult.data.filename?.split('/').pop()}
              </p>
              <Button
                onClick={handleDownloadCSV}
                variant="outline"
                size="sm"
                className="border-green-500/20 text-green-400 hover:bg-green-500/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CSV
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Debug Panel - Temporary */}
      {debugInfo.length > 0 && (
        <div className="bg-black/50 border border-white/10 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">🐛 Debug Info (Temporary)</h3>
          <div className="max-h-60 overflow-y-auto space-y-1">
            {debugInfo.map((log, index) => (
              <div key={index} className="text-xs text-white/80 font-mono bg-black/30 p-2 rounded">
                {log}
              </div>
            ))}
          </div>
          <button 
            onClick={() => setDebugInfo([])}
            className="mt-2 text-xs text-white/60 hover:text-white"
          >
            Clear Debug Logs
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="bg-glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Search className="w-5 h-5" />
                New Extraction
              </CardTitle>
              <CardDescription className="text-white/60">
                Enter your search criteria to find potential leads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-white">Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., coffee shop, restaurant, spa"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="bg-glass-light border-white/20 text-foreground placeholder:text-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Hong Kong, Central District"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-glass-light border-white/20 text-foreground placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">Business Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-glass-light border-white/20 text-foreground">
                    <SelectValue placeholder="Select category (optional)" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-white/20 backdrop-blur-xl z-50">
                    <SelectItem value="restaurant" className="text-foreground hover:bg-white/10 focus:bg-white/10">Restaurant</SelectItem>
                    <SelectItem value="retail" className="text-foreground hover:bg-white/10 focus:bg-white/10">Retail</SelectItem>
                    <SelectItem value="service" className="text-foreground hover:bg-white/10 focus:bg-white/10">Service</SelectItem>
                    <SelectItem value="healthcare" className="text-foreground hover:bg-white/10 focus:bg-white/10">Healthcare</SelectItem>
                    <SelectItem value="fitness" className="text-foreground hover:bg-white/10 focus:bg-white/10">Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button 
                  className="bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-glow flex-1"
                  onClick={handleStartExtraction}
                  disabled={isExtracting || !keywords.trim() || !location.trim()}
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Extraction
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                  onClick={testConnection}
                  disabled={isTestingConnection}
                >
                  {isTestingConnection ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "🩺 Test Connection"
                  )}
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          <Card className="bg-glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Total Leads</span>
                <span className="text-xl font-bold text-white">2,847</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">This Week</span>
                <span className="text-lg font-semibold text-green-400">+234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Success Rate</span>
                <span className="text-lg font-semibold text-blue-400">94.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-glass border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-white/10"
                onClick={() => {
                  setKeywords("coffee shop, cafe");
                  setLocation("Hong Kong");
                  setCategory("restaurant");
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                HK Coffee Shops
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-white/10"
                onClick={() => {
                  setKeywords("restaurant, dining");
                  setLocation("Hong Kong");
                  setCategory("restaurant");
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                HK Restaurants
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white hover:bg-white/10"
                onClick={() => {
                  setKeywords("spa, massage, wellness");
                  setLocation("Hong Kong");
                  setCategory("service");
                }}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Wellness Centers
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Extractions */}
      <Card className="bg-glass border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Extractions</CardTitle>
          <CardDescription className="text-white/60">
            Your recent lead extraction history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExtractions.map((extraction) => (
              <div
                key={extraction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-glass-light border border-white/10"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-white">{extraction.name}</h4>
                  <p className="text-sm text-white/60">
                    {extraction.keywords} • {extraction.location}
                  </p>
                  <p className="text-xs text-white/40">{extraction.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{extraction.results}</div>
                    <div className="text-xs text-white/60">leads found</div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}