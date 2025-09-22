import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare, 
  Users, 
  Mail, 
  Bot, 
  Settings,
  Zap 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Lead Extraction", url: "/dashboard/leads", icon: Search },
  { title: "WhatsApp Automation", url: "/dashboard/whatsapp", icon: MessageSquare },
  { title: "LinkedIn Targeting", url: "/dashboard/linkedin", icon: Users },
  { title: "Email Extraction", url: "/dashboard/email", icon: Mail },
  { title: "AI Chatbot", url: "/dashboard/chatbot", icon: Bot },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/20 text-primary border-primary/30" : "hover:bg-white/5 border-transparent";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-sidebar-border bg-sidebar backdrop-blur-xl`}>
      <SidebarContent className="bg-transparent">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-primary">HK Grow</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider px-4 py-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg border transition-all duration-200 ${isActive 
                          ? 'bg-sidebar-accent text-sidebar-primary-foreground border-l-2 border-primary' 
                          : 'text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                        }`
                      }
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}