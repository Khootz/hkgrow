import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  DollarSign, 
  Users, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download
} from "lucide-react";

const SalesKPIPage = () => {
  const kpiData = [
    {
      title: "Total Revenue",
      value: "$2,847,392",
      change: "+23.5%",
      trend: "up",
      icon: DollarSign,
      description: "vs last quarter",
      color: "text-emerald-400"
    },
    {
      title: "Conversion Rate",
      value: "18.7%",
      change: "+4.2%",
      trend: "up",
      icon: Target,
      description: "from leads to sales",
      color: "text-blue-400"
    },
    {
      title: "Active Deals",
      value: "247",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      description: "in pipeline",
      color: "text-orange-400"
    },
    {
      title: "Team Performance",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      icon: Award,
      description: "avg target achievement",
      color: "text-purple-400"
    }
  ];

  const salesReps = [
    { name: "Sarah Chen", deals: 47, revenue: "$487K", target: 89, performance: "excellent" },
    { name: "Marcus Johnson", deals: 52, revenue: "$532K", target: 94, performance: "excellent" },
    { name: "Elena Rodriguez", deals: 38, revenue: "$398K", target: 76, performance: "good" },
    { name: "David Park", deals: 41, revenue: "$445K", target: 82, performance: "good" },
    { name: "Lisa Thompson", deals: 35, revenue: "$356K", target: 68, performance: "needs improvement" }
  ];

  const monthlyTargets = [
    { month: "Jan", target: 450000, actual: 487000, percentage: 108 },
    { month: "Feb", target: 480000, actual: 445000, percentage: 93 },
    { month: "Mar", target: 520000, actual: 578000, percentage: 111 },
    { month: "Apr", target: 500000, actual: 523000, percentage: 105 },
    { month: "May", target: 550000, actual: 495000, percentage: 90 },
    { month: "Jun", target: 580000, actual: 612000, percentage: 105 }
  ];

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "excellent":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Good</Badge>;
      case "needs improvement":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Needs Focus</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-dark via-background-medium to-background-light p-4">
      {/* Header */}
      <div className="mb-6 bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sales KPI Dashboard</h1>
              <p className="text-muted-foreground text-sm">Monitor and analyze your sales performance metrics</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border bg-card/50 text-foreground hover:bg-card">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-card/80 backdrop-blur-sm border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  kpi.color === "text-emerald-400" ? "bg-emerald-500/20" :
                  kpi.color === "text-blue-400" ? "bg-blue-500/20" :
                  kpi.color === "text-orange-400" ? "bg-orange-500/20" :
                  "bg-purple-500/20"
                }`}>
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
                  kpi.trend === "up" 
                    ? "bg-emerald-500/20 text-emerald-400" 
                    : "bg-red-500/20 text-red-400"
                }`}>
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  <span>{kpi.change}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {kpi.value}
                </h3>
                <p className="text-sm font-medium text-foreground/80">{kpi.title}</p>
                <p className="text-xs text-muted-foreground">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-card/80 backdrop-blur-sm border border-border shadow-lg p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="targets" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Target className="w-4 h-4 mr-2" />
            Targets
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Users className="w-4 h-4 mr-2" />
            Team Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Revenue Trend */}
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue performance vs targets</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-48 flex items-end justify-between gap-2 p-3">
                  {monthlyTargets.map((month, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-muted rounded-lg overflow-hidden h-24 flex flex-col justify-end">
                        <div 
                          className={`w-full rounded-lg transition-all duration-700 ${
                            month.percentage >= 100 ? "bg-gradient-to-t from-emerald-500 to-emerald-400" : "bg-gradient-to-t from-primary to-primary/80"
                          }`}
                          style={{ height: `${Math.min(month.percentage, 120)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{month.month}</span>
                      <span className={`text-xs font-bold ${month.percentage >= 100 ? "text-emerald-400" : "text-primary"}`}>
                        {month.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pipeline Status */}
            <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  Pipeline Status
                </CardTitle>
                <CardDescription>Current deals distribution by stage</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground/80">Qualified Leads</span>
                    <span className="text-sm font-bold text-foreground">156 deals</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground/80">Proposal Sent</span>
                    <span className="text-sm font-bold text-foreground">89 deals</span>
                  </div>
                  <Progress value={56} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground/80">Negotiation</span>
                    <span className="text-sm font-bold text-foreground">47 deals</span>
                  </div>
                  <Progress value={34} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground/80">Closed Won</span>
                    <span className="text-sm font-bold text-foreground">23 deals</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="targets" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                <Target className="w-5 h-5 text-primary" />
                Monthly Targets vs Actuals
              </CardTitle>
              <CardDescription>Detailed breakdown of performance against targets</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 text-sm font-semibold text-foreground/80">Month</th>
                      <th className="text-right p-2 text-sm font-semibold text-foreground/80">Target</th>
                      <th className="text-right p-2 text-sm font-semibold text-foreground/80">Actual</th>
                      <th className="text-right p-2 text-sm font-semibold text-foreground/80">Achievement</th>
                      <th className="text-center p-2 text-sm font-semibold text-foreground/80">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyTargets.map((month, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-2 font-medium text-foreground">{month.month} 2024</td>
                        <td className="p-2 text-right text-foreground/80">${(month.target / 1000).toFixed(0)}K</td>
                        <td className="p-2 text-right font-semibold text-foreground">${(month.actual / 1000).toFixed(0)}K</td>
                        <td className="p-2 text-right">
                          <span className={`font-bold ${month.percentage >= 100 ? "text-emerald-400" : "text-red-400"}`}>
                            {month.percentage}%
                          </span>
                        </td>
                        <td className="p-2 text-center">
                          {month.percentage >= 100 ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-red-400 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card className="bg-card/80 backdrop-blur-sm border-border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-foreground text-lg">
                <Users className="w-5 h-5 text-purple-400" />
                Sales Team Performance
              </CardTitle>
              <CardDescription>Individual performance metrics and achievements</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {salesReps.map((rep, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {rep.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm">{rep.name}</h4>
                        <p className="text-xs text-muted-foreground">{rep.deals} active deals • {rep.revenue} revenue</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Target Achievement</div>
                        <div className="font-bold text-foreground text-sm">{rep.target}%</div>
                      </div>
                      <div className="w-16">
                        <Progress value={rep.target} className="h-2" />
                      </div>
                      {getPerformanceBadge(rep.performance)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesKPIPage;