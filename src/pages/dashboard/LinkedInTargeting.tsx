import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Building2, 
  Users, 
  Send, 
  Bot, 
  Edit3, 
  Loader2,
  ExternalLink,
  CheckCircle,
  User,
  Terminal,
  X
} from "lucide-react";
import { toast } from "sonner";

interface LinkedInProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  profileUrl: string;
  avatarUrl?: string;
  location: string;
  connectionLevel: string;
  experience: string;
}

const LinkedInTargeting = () => {
  const [companyName, setCompanyName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [profiles, setProfiles] = useState<LinkedInProfile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [customMessage, setCustomMessage] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messageMode, setMessageMode] = useState<"custom" | "ai">("custom");
  const [logs, setLogs] = useState<string[]>([]);
  const [showDebugTerminal, setShowDebugTerminal] = useState(true);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const handleSearch = async () => {
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      addLog("❌ Search failed: No company name provided");
      return;
    }

    setIsSearching(true);
    setProfiles([]);
    setSelectedProfiles([]);
    
    addLog(`🔍 Starting search for LinkedIn profiles for: ${companyName}`);
    
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://hkgrow-6vghzu7ui-thiens-projects-80bfe1b8.vercel.app';
      addLog(`📡 Making API request to: ${API_BASE_URL}/api/extract-linkedin-profiles`);
      
      const response = await fetch(`${API_BASE_URL}/api/extract-linkedin-profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          company_name: companyName,
          limit: 10
        })
      });

      addLog(`📊 Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        addLog(`❌ API Error: ${errorData.error || `HTTP ${response.status}`}`);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      addLog(`✅ API Response received: ${JSON.stringify(result, null, 2)}`);

      if (result.success && result.profiles) {
        // Transform backend data to frontend format
        const transformedProfiles: LinkedInProfile[] = result.profiles.map((profile: any, index: number) => ({
          id: profile.id || index.toString(),
          name: profile.name || "Unknown",
          title: profile.role_title || "Unknown Title",
          company: profile.company || companyName,
          profileUrl: profile.linkedin_url || "#",
          avatarUrl: "", // No avatar data from backend
          location: profile.location || "Unknown",
          connectionLevel: profile.connection_level || "2nd",
          experience: profile.experience || "5+ years"
        }));

        setProfiles(transformedProfiles);
        addLog(`✅ Successfully processed ${transformedProfiles.length} profiles`);
        toast.success(`Found ${transformedProfiles.length} management profiles for ${companyName}`);
        
        if (transformedProfiles.length === 0) {
          addLog("ℹ️ No profiles found for this company");
          toast.info("No LinkedIn profiles found for this company. Try a different company name or check the spelling.");
        }
      } else {
        addLog(`❌ Backend returned unsuccessful response: ${result.error || 'No profiles'}`);
        throw new Error(result.error || 'Failed to extract profiles');
      }
    } catch (error: any) {
      addLog(`❌ Search error: ${error.message}`);
      toast.error(`Failed to fetch profiles: ${error.message}`);
      setProfiles([]);
    } finally {
      setIsSearching(false);
      addLog("🔚 Search operation completed");
    }
  };

  const handleGenerateMessage = async () => {
    if (selectedProfiles.length === 0) {
      toast.error("Please select at least one profile");
      return;
    }

    setIsGeneratingMessage(true);
    try {
      // Simulate AI message generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      const message = `Hi {{name}},

I hope this message finds you well. I came across your profile and was impressed by your work at {{company}}. 

I'd love to connect and explore potential collaboration opportunities that could benefit both our organizations.

Looking forward to connecting!

Best regards,
[Your Name]`;
      setGeneratedMessage(message);
      setMessageMode("ai");
      toast.success("AI message generated successfully!");
    } catch (error) {
      toast.error("Failed to generate message. Please try again.");
    } finally {
      setIsGeneratingMessage(false);
    }
  };

  const handleSendMessages = async () => {
    if (selectedProfiles.length === 0) {
      toast.error("Please select at least one profile");
      return;
    }

    const message = messageMode === "ai" ? generatedMessage : customMessage;
    if (!message.trim()) {
      toast.error("Please write a message or generate one with AI");
      return;
    }

    setIsSending(true);
    try {
      // Simulate sending messages
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`Successfully sent messages to ${selectedProfiles.length} profiles!`);
      setSelectedProfiles([]);
      setCustomMessage("");
      setGeneratedMessage("");
    } catch (error) {
      toast.error("Failed to send messages. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const toggleProfileSelection = (profileId: string) => {
    setSelectedProfiles(prev => 
      prev.includes(profileId) 
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
          <Users className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-sidebar-foreground">LinkedIn Targeting</h1>
          <p className="text-sidebar-foreground/60">Find and connect with top management profiles</p>
        </div>
      </div>

      {/* Company Search */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sidebar-foreground">
            <Building2 className="w-5 h-5" />
            Company Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Input
              placeholder="Enter company name (e.g., Microsoft, Google, Apple)"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="btn-gold min-w-[120px]"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {profiles.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sidebar-foreground">
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Management Profiles ({profiles.length})
              </span>
              <Badge variant="secondary" className="bg-sidebar-accent text-sidebar-accent-foreground">
                {selectedProfiles.length} selected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {profiles.map((profile) => (
                <div
                  key={profile.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedProfiles.includes(profile.id)
                      ? 'border-sidebar-ring bg-sidebar-accent/50'
                      : 'border-sidebar-border hover:bg-sidebar-accent/30'
                  }`}
                  onClick={() => toggleProfileSelection(profile.id)}
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={profile.avatarUrl} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-sidebar-foreground">{profile.name}</h3>
                          <p className="text-sidebar-foreground/80 font-medium">{profile.title}</p>
                          <p className="text-sidebar-foreground/60 text-sm">{profile.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedProfiles.includes(profile.id) && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {profile.connectionLevel}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-sidebar-foreground/60">
                        <span>{profile.location}</span>
                        <span>•</span>
                        <span>{profile.experience}</span>
                        <span>•</span>
                        <a 
                          href={profile.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sidebar-ring hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Profile <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Debug Terminal */}
      {showDebugTerminal && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sidebar-foreground">
              <span className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Debug Terminal
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDebugTerminal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48 w-full rounded border bg-sidebar/30 p-3">
              <div className="font-mono text-sm space-y-1">
                {logs.length === 0 ? (
                  <div className="text-sidebar-foreground/60">No logs yet. Try searching for a company...</div>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="text-sidebar-foreground/80 whitespace-pre-wrap break-all">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
            <div className="flex justify-between items-center mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLogs([])}
                className="text-xs"
              >
                Clear Logs
              </Button>
              <span className="text-xs text-sidebar-foreground/60">
                {logs.length} log entries
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Message Composition */}
      {profiles.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sidebar-foreground">
              <Send className="w-5 h-5" />
              Compose Outreach Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Message Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={messageMode === "custom" ? "default" : "outline"}
                onClick={() => setMessageMode("custom")}
                className={messageMode === "custom" ? "btn-gold" : ""}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Write Custom
              </Button>
              <Button
                variant={messageMode === "ai" ? "default" : "outline"}
                onClick={handleGenerateMessage}
                disabled={isGeneratingMessage}
                className={messageMode === "ai" ? "btn-gold" : ""}
              >
                {isGeneratingMessage ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4 mr-2" />
                    AI Generate
                  </>
                )}
              </Button>
            </div>

            <Separator />

            {/* Message Input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-sidebar-foreground">
                {messageMode === "ai" ? "AI Generated Message" : "Your Message"}
              </label>
              <Textarea
                placeholder="Write your personalized outreach message here..."
                value={messageMode === "ai" ? generatedMessage : customMessage}
                onChange={(e) => {
                  if (messageMode === "ai") {
                    setGeneratedMessage(e.target.value);
                  } else {
                    setCustomMessage(e.target.value);
                  }
                }}
                 rows={6}
                 className="resize-none"
               />
               <p className="text-xs text-sidebar-foreground/80">
                 Tip: Use {"{"}{"{"} name {"}"}{"}"} and {"{"}{"{"} company {"}"}{"}"} as placeholders for personalization
              </p>
            </div>

            {/* Send Button */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-sidebar-foreground/80">
                {selectedProfiles.length} profile(s) selected for outreach
              </p>
              <Button
                onClick={handleSendMessages}
                disabled={isSending || selectedProfiles.length === 0}
                className="btn-gold min-w-[140px]"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Messages
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LinkedInTargeting;