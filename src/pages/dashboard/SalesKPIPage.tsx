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
      color: "text-emerald-600"
    },
    {
      title: "Conversion Rate",
      value: "18.7%",
      change: "+4.2%",
      trend: "up",
      icon: Target,
      description: "from leads to sales",
      color: "text-blue-600"
    },
    {
      title: "Active Deals",
      value: "247",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      description: "in pipeline",
      color: "text-orange-600"
    },
    {
      title: "Team Performance",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      icon: Award,
      description: "avg target achievement",
      color: "text-purple-600"
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
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Good</Badge>;
      case "needs improvement":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Needs Focus</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200/60 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Sales KPI Dashboard</h1>
              <p className="text-slate-600 mt-1">Monitor and analyze your sales performance metrics</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  kpi.color === "text-emerald-600" ? "bg-emerald-100" :
                  kpi.color === "text-blue-600" ? "bg-blue-100" :
                  kpi.color === "text-orange-600" ? "bg-orange-100" :
                  "bg-purple-100"
                }`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  kpi.trend === "up" 
                    ? "bg-emerald-100 text-emerald-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {kpi.change}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {kpi.value}
                </h3>
                <p className="text-sm font-medium text-slate-700">{kpi.title}</p>
                <p className="text-xs text-slate-500">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-lg p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="targets" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Target className="w-4 h-4 mr-2" />
            Targets
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-2" />
            Team Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue performance vs targets</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-64 flex items-end justify-between gap-2 p-4">
                  {monthlyTargets.map((month, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-full bg-slate-200 rounded-lg overflow-hidden h-32 flex flex-col justify-end">
                        <div 
                          className={`w-full rounded-lg transition-all duration-700 ${
                            month.percentage >= 100 ? "bg-gradient-to-t from-emerald-500 to-emerald-400" : "bg-gradient-to-t from-blue-500 to-blue-400"
                          }`}
                          style={{ height: `${Math.min(month.percentage, 120)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-slate-600">{month.month}</span>
                      <span className={`text-xs font-bold ${month.percentage >= 100 ? "text-emerald-600" : "text-blue-600"}`}>
                        {month.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pipeline Status */}
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  Pipeline Status
                </CardTitle>
                <CardDescription>Current deals distribution by stage</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Qualified Leads</span>
                    <span className="text-sm font-bold text-slate-900">156 deals</span>
                  </div>
                  <Progress value={78} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Proposal Sent</span>
                    <span className="text-sm font-bold text-slate-900">89 deals</span>
                  </div>
                  <Progress value={56} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Negotiation</span>
                    <span className="text-sm font-bold text-slate-900">47 deals</span>
                  </div>
                  <Progress value={34} className="h-3" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Closed Won</span>
                    <span className="text-sm font-bold text-slate-900">23 deals</span>
                  </div>
                  <Progress value={28} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="targets" className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Target className="w-5 h-5 text-blue-600" />
                Monthly Targets vs Actuals
              </CardTitle>
              <CardDescription>Detailed breakdown of performance against targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left p-3 text-sm font-semibold text-slate-700">Month</th>
                      <th className="text-right p-3 text-sm font-semibold text-slate-700">Target</th>
                      <th className="text-right p-3 text-sm font-semibold text-slate-700">Actual</th>
                      <th className="text-right p-3 text-sm font-semibold text-slate-700">Achievement</th>
                      <th className="text-center p-3 text-sm font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyTargets.map((month, index) => (
                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-medium text-slate-900">{month.month} 2024</td>
                        <td className="p-3 text-right text-slate-700">${(month.target / 1000).toFixed(0)}K</td>
                        <td className="p-3 text-right font-semibold text-slate-900">${(month.actual / 1000).toFixed(0)}K</td>
                        <td className="p-3 text-right">
                          <span className={`font-bold ${month.percentage >= 100 ? "text-emerald-600" : "text-red-600"}`}>
                            {month.percentage}%
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          {month.percentage >= 100 ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-600 mx-auto" />
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

        <TabsContent value="team" className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200/60 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Users className="w-5 h-5 text-purple-600" />
                Sales Team Performance
              </CardTitle>
              <CardDescription>Individual performance metrics and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesReps.map((rep, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {rep.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{rep.name}</h4>
                        <p className="text-sm text-slate-600">{rep.deals} active deals • {rep.revenue} revenue</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-slate-600">Target Achievement</div>
                        <div className="font-bold text-slate-900">{rep.target}%</div>
                      </div>
                      <div className="w-20">
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