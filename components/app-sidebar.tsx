"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  MapIcon,
  PieChartIcon,
  Settings2,
  SquareTerminal,
  Building2,
  Home,
  Wrench,
} from "lucide-react";

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
import { getUserWorkspaces } from "@/lib/firebase/workspaces";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";

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
  const [workspaces, setWorkspaces] = useState<
    { id: string; name: string; logo: React.ElementType; plan: string }[]
  >([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!user) return;

      const iconMap: Record<string, React.ElementType> = {
        Building2,
        Home,
        Wrench,
      };

      const workspaceData = await getUserWorkspaces(user.uid);
      const formatted = workspaceData.map(
        (ws: { id: string; name?: string; logo?: string }) => ({
          id: ws.id,
          name: ws.name ?? "Untitled Workspace",
          logo: iconMap[ws.logo ?? ""] || GalleryVerticalEnd,
          plan: "Free Plan",
        })
      );
      setWorkspaces(formatted);

      // Fetch current workspace ID from user doc
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setCurrentWorkspaceId(userSnap.data().workspaces || null);
      }
    };

    fetchWorkspaces();
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {workspaces.length === 0 ? (
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[165px]" />
              <Skeleton className="h-3 w-[165px]" />
            </div>
          </div>
        ) : (
          currentWorkspaceId && (
            <TeamSwitcher
              teams={workspaces}
              initialWorkspaceId={currentWorkspaceId}
            />
          )
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
