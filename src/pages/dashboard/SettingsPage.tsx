import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database, 
  Key,
  Globe,
  Mail,
  Phone,
  Save,
  Download,
  Upload,
  Trash2,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  Zap
} from "lucide-react";

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "HK Grow Solutions",
    role: "Sales Manager"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
    leadAlerts: true,
    campaignUpdates: true
  });

  const [apiKeys, setApiKeys] = useState({
    perplexity: "••••••••••••••••",
    openai: "••••••••••••••••",
    whatsapp: "••••••••••••••••"
  });

  const [showKeys, setShowKeys] = useState({
    perplexity: false,
    openai: false,
    whatsapp: false
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginNotifications: true
  });

  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`
    });
  };

  const toggleKeyVisibility = (key: keyof typeof showKeys) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-background-medium to-background-light p-4">
      {/* Header */}
      <div className="mb-6 bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Settings className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground text-sm">Manage your account preferences and configurations</p>
            </div>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <Check className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-card/80 backdrop-blur-sm border border-border shadow-lg p-1">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Key className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Profile Information */}
            <div className="lg:col-span-2">
              <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                    <User className="w-5 h-5 text-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground/80">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                        className="bg-background/50 border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground/80">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                        className="bg-background/50 border-border text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-background/50 border-border text-foreground"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground/80">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="bg-background/50 border-border text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-foreground/80">Company</Label>
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                        className="bg-background/50 border-border text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-foreground/80">Role</Label>
                    <Input
                      id="role"
                      value={profile.role}
                      onChange={(e) => setProfile(prev => ({ ...prev, role: e.target.value }))}
                      className="bg-background/50 border-border text-foreground"
                    />
                  </div>
                  
                  <Button onClick={() => handleSave('Profile')} className="bg-gradient-primary hover:opacity-90">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Account Actions */}
            <div className="space-y-4">
              <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-foreground text-lg">Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <Button variant="outline" className="w-full justify-start border-border bg-card/50 text-foreground hover:bg-card">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-border bg-card/50 text-foreground hover:bg-card">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Settings
                  </Button>
                  <Separator />
                  <Button variant="destructive" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose how you want to be notified about important events</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground/80">Communication Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">Email Notifications</span>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">Push Notifications</span>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">SMS Notifications</span>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, smsNotifications: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-foreground/80">Event Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Weekly Reports</span>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">New Lead Alerts</span>
                    <Switch
                      checked={notifications.leadAlerts}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, leadAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Campaign Updates</span>
                    <Switch
                      checked={notifications.campaignUpdates}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, campaignUpdates: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={() => handleSave('Notification')} className="bg-gradient-primary hover:opacity-90">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                <Key className="w-5 h-5 text-primary" />
                API Integrations
              </CardTitle>
              <CardDescription>Manage your third-party service connections</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Perplexity AI</p>
                      <p className="text-xs text-muted-foreground">AI-powered chatbot integration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility('perplexity')}
                    >
                      {showKeys.perplexity ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Connected</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">OpenAI</p>
                      <p className="text-xs text-muted-foreground">GPT integration for content generation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility('openai')}
                    >
                      {showKeys.openai ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Disconnected</Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">WhatsApp Business</p>
                      <p className="text-xs text-muted-foreground">Automated messaging platform</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleKeyVisibility('whatsapp')}
                    >
                      {showKeys.whatsapp ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Connected</Badge>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-primary hover:opacity-90">
                <Key className="w-4 h-4 mr-2" />
                Add New Integration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security preferences</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch
                    checked={security.twoFactorAuth}
                    onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, twoFactorAuth: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-foreground/80">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    className="bg-background/50 border-border text-foreground"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Login Notifications</p>
                    <p className="text-xs text-muted-foreground">Get notified of new sign-ins</p>
                  </div>
                  <Switch
                    checked={security.loginNotifications}
                    onCheckedChange={(checked) => setSecurity(prev => ({ ...prev, loginNotifications: checked }))}
                  />
                </div>

                <Button onClick={() => handleSave('Security')} className="bg-gradient-primary hover:opacity-90">
                  <Save className="w-4 h-4 mr-2" />
                  Update Security
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/80">Password Strength</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Strong</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/80">Last Login</span>
                    <span className="text-sm text-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground/80">Active Sessions</span>
                    <span className="text-sm text-foreground">3 devices</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-border bg-card/50 text-foreground hover:bg-card">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-border bg-card/50 text-foreground hover:bg-card">
                    View Login History
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Sign Out All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;