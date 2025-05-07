"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/app/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Workspace = {
  id: string;
  name: string;
  createdAt?: { toDate: () => Date };
  members?: string[];
};

const SettingsPage = () => {
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWorkspace = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) return;
      const workspaceId = userSnap.data().workspaces;
      const workspaceRef = doc(db, "workspaces", workspaceId);
      const workspaceSnap = await getDoc(workspaceRef);
      if (workspaceSnap.exists()) {
        const data = workspaceSnap.data() as Omit<Workspace, "id">;
        setWorkspace({ id: workspaceSnap.id, ...data });
      }
    };

    fetchWorkspace();
  }, [user]);

  if (!workspace) {
    return <div>Loading workspace settings...</div>;
  }

  return (
    <div className="max-w-xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow space-y-6">
      <h1 className="text-3xl font-semibold">Workspace Settings</h1>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          <strong className="text-foreground">Name:</strong> {workspace.name}
        </p>
        <p>
          <strong className="text-foreground">Created:</strong>{" "}
          {workspace.createdAt?.toDate().toLocaleString() || "Unknown"}
        </p>
        <p>
          <strong className="text-foreground">Members:</strong>{" "}
          {workspace.members?.length || 0}
        </p>
      </div>

      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Workspace</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this workspace?
              </AlertDialogTitle>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. All data associated with this
                workspace will be permanently deleted.
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (!workspace?.id || !user) return;

                  try {
                    await deleteDoc(doc(db, "workspaces", workspace.id));
                    // Optionally remove currentWorkspace from user
                    await updateDoc(doc(db, "users", user.uid), {
                      workspaces: "",
                    });
                    toast("Workspace deleted successfully!", {
                      duration: 3000,
                    });

                    router.push("/dashboard"); // or redirect as needed
                  } catch (error) {
                    console.error("Error deleting workspace:", error);
                    alert("Failed to delete workspace.");
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SettingsPage;
