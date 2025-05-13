"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserWorkspaces } from "@/lib/firebase/workspaces";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { GalleryVerticalEnd, Building2, Home, Wrench } from "lucide-react";
import type { ReactNode } from "react";

type Workspace = {
  id: string;
  name: string;
  logo: React.ElementType;
  plan: string;
  icon?: string;
};

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspaceId: string | undefined;
  setCurrentWorkspaceId: (id: string | undefined) => void;
  isLoading: boolean;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined
);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context)
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  return context;
};

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<
    string | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const fetchedRef = useRef(false);

  const workspaceRef = useRef<Workspace[]>([]);
  const currentWorkspaceRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!user || fetchedRef.current) {
        setIsLoading(false);
        return;
      }
      fetchedRef.current = true;

      setIsLoading(true);

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
      workspaceRef.current = formatted;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const wsId = userSnap.data().workspaces;
        setCurrentWorkspaceId(wsId);
        currentWorkspaceRef.current = wsId;
      } else {
        setCurrentWorkspaceId(undefined);
        currentWorkspaceRef.current = undefined;
      }
      setIsLoading(false);
    };

    fetchWorkspaces();
  }, [user]);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces: workspaceRef.current,
        currentWorkspaceId: currentWorkspaceRef.current,
        setCurrentWorkspaceId,
        isLoading,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
