import { Plus, TrendingUp, Users, MessageCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const statsCards = [
  {
    title: "Leads Extracted",
    value: "2,847",
    change: "+12% this week",
    icon: Target,
    trend: "up"
  },
  {
    title: "Active Campaigns",
    value: "8",
    change: "3 running now",
    icon: MessageCircle,
    trend: "stable"
  },
  {
    title: "AI Replies Sent",
    value: "456",
    change: "+23% this week",
    icon: Users,
    trend: "up"
  },
  {
    title: "Conversion Rate",
    value: "18.2%",
    change: "+2.1% vs last week",
    icon: TrendingUp,
    trend: "up"
  }
];

const quickActions = [
  {
    title: "Google Maps Scraping",
    description: "Extract leads from Google Maps",
    href: "/dashboard/leads"
  },
  {
    title: "WhatsApp Campaign",
    description: "Start automated outreach",
    href: "/dashboard/whatsapp"
  },
  {
    title: "LinkedIn Targeting",
    description: "Find decision makers",
    href: "/dashboard/linkedin"
  },
  {
    title: "Email Extraction",
    description: "Extract emails from websites",
    href: "/dashboard/email"
  }
];

const recentTasks = [
  {
    id: 1,
    name: "Coffee Shops - Hong Kong",
    type: "Google Maps",
    status: "Completed",
    results: "234 leads",
    date: "2 hours ago"
  },
  {
    id: 2,
    name: "Restaurant Outreach Q4",
    type: "WhatsApp",
    status: "Running",
    results: "45/100 sent",
    date: "1 day ago"
  },
  {
    id: 3,
    name: "Tech Startups LinkedIn",
    type: "LinkedIn",
    status: "Completed",
    results: "89 connections",
    date: "3 days ago"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
          <p className="text-white/60">Here's what's happening with your lead generation.</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-gradient-primary/90 text-white shadow-glow">
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-glass border-white/20 hover:bg-glass-light transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/80">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-white/60 mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-glass border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-white/60">
            Start a new task with one of our powerful tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-glass-light border border-white/10 hover:border-gold/50 transition-all duration-300 cursor-pointer group"
              >
                <h3 className="font-semibold text-white group-hover:text-gold transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-white/60 mt-1">{action.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Tasks */}
      <Card className="bg-glass border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Recent Tasks</CardTitle>
          <CardDescription className="text-white/60">
            Your latest lead generation activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 rounded-lg bg-glass-light border border-white/10"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-white">{task.name}</h4>
                  <p className="text-sm text-white/60">{task.type} • {task.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      task.status === 'Completed' ? 'text-green-400' : 
                      task.status === 'Running' ? 'text-blue-400' : 'text-yellow-400'
                    }`}>
                      {task.status}
                    </div>
                    <div className="text-xs text-white/60">{task.results}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}