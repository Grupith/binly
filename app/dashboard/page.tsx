"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { checkUserExists, createUserIfNotExists } from "@/lib/firebase/users";
import { getUserWorkspaces } from "@/lib/firebase/workspaces";
import { CreateWorkspaceModal } from "@/components/modals/CreateWorkspaceModal";
import type { Workspace } from "@/lib/firebase/workspaces";

export default function Page() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [workspaceName, setWorkspaceName] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!user) return;

      const exists = await checkUserExists(user.uid);
      // If the user does not exist in the database, create a new user
      if (!exists) {
        await createUserIfNotExists({
          uid: user.uid,
          name: user.displayName || "Unnamed",
          email: user.email || "",
        });
      }

      const workspaces = (await getUserWorkspaces(user.uid)) as Workspace[];
      if (!workspaces || workspaces.length === 0) {
        setShowModal(true);
      } else {
        setWorkspaceName(workspaces[0].name);
      }

      setLoading(false);
    };

    init();
  }, [user]);

  if (loading) {
    return (
      <div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-gray-200">
      {showModal && (
        <CreateWorkspaceModal onClose={() => setShowModal(false)} />
      )}
      <h1 className="text-2xl font-bold">
        {workspaceName || "No workspace selected"}
      </h1>
      <p className="text-lg text-muted-foreground">
        Manage your inventory, tools, and team here.
      </p>
    </div>
  );
}
