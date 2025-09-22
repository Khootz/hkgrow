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
  const [extractionResult, setExtractionResult] = useState<{
    success: boolean;
    message: string;
    data?: any;
  } | null>(null);

  const handleStartExtraction = async () => {
    if (!keywords.trim() || !location.trim()) {
      alert("Please enter both keywords and location");
      return;
    }

    setIsExtracting(true);
    setExtractionResult(null);

    // Define API URL at the start so it's available in catch block
    const API_BASE_URL = process.env.REACT_APP_API_URL || 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://127.0.0.1:5000' 
        : 'https://hkgrow-b9seecqw7-thiens-projects-80bfe1b8.vercel.app');

    try {
      console.log('Connecting to backend:', `${API_BASE_URL}/api/extract-leads`);

      const response = await fetch(`${API_BASE_URL}/api/extract-leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords: keywords.trim(),
          location: location.trim(),
          category: category
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setExtractionResult({
          success: true,
          message: result.message,
          data: result.data
        });
      } else {
        setExtractionResult({
          success: false,
          message: result.error || 'An error occurred during extraction'
        });
      }
    } catch (error) {
      console.error('Extraction failed:', error);
      
      let errorMessage = 'An unexpected error occurred.';
      
      if (error instanceof Error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          errorMessage = `🚨 Cannot connect to backend server.
          
Local Development: Make sure to run: python backend/app.py
Production: Backend should be available at: ${API_BASE_URL}

Check the console for more details.`;
        } else if (error.message.includes('Failed to fetch')) {
          errorMessage = `🌐 Network connection failed. 

Backend URL: ${API_BASE_URL}
Please check:
1. Internet connection
2. Backend server status
3. CORS configuration`;
        } else {
          errorMessage = `❌ Error: ${error.message}`;
        }
      }
      
      setExtractionResult({
        success: false,
        message: errorMessage
      });
    } finally {
      setIsExtracting(false);
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
            <p className="text-sm mt-2 text-white/60">
              File saved: {extractionResult.data.filename?.split('/').pop()}
            </p>
          )}
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