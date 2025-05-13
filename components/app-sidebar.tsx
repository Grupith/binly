"use client";

import * as React from "react";

import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  MapIcon,
  PieChartIcon,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { useWorkspace } from "@/contexts/WorkspaceContext";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  workspaces: [
    {
      name: "Storage Unit",
      logo: GalleryVerticalEnd,
      plan: "Free Plan",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/",
      icon: PieChartIcon,
      isActive: true,
    },
    {
      title: "Search",
      url: "/dashboard/search",
      icon: Bot,
    },
    {
      title: "Items",
      url: "/dashboard/items",
      icon: SquareTerminal,
    },
    {
      title: "Locations",
      url: "/dashboard/locations",
      icon: MapIcon,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Bathroom Renovation",
      url: "#",
      icon: BookOpen,
    },

    {
      name: "Planter Box Build",
      url: "#",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const { workspaces, currentWorkspaceId } = useWorkspace();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="min-h-[30px]">
        {workspaces.length > 0 && currentWorkspaceId ? (
          <TeamSwitcher
            teams={workspaces}
            initialWorkspaceId={currentWorkspaceId}
          />
        ) : (
          <div className="flex justify-center">...</div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarFooter>
        {user ? (
          <NavUser
            user={{
              name: user.displayName || "Unknown",
              email: user.email || "No email",
              avatar: user.photoURL || "/default-avatar.png", // fallback avatar
            }}
          />
        ) : (
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[165px]" />
              <Skeleton className="h-3 w-[165px]" />
            </div>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
