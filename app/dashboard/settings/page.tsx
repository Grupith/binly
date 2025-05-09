"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { Building2, Home, Wrench } from "lucide-react";

type Workspace = {
  id: string;
  name: string;
  createdAt?: { toDate: () => Date };
  members?: string[];
  icon?: string;
};

const SettingsPage = () => {
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);
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
        setNewName(data.name || "");
        setNewIcon(data.icon || null);
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
        <p className="flex items-center gap-2">
          <strong className="text-foreground">Name:</strong> {workspace.name}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-gray-900">
              <DialogHeader>
                <DialogTitle>Edit Workspace Name</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new name"
                />
              </div>
              <div className="flex items-center space-x-4 py-6">
                <p className="text-sm text-muted-foreground">
                  Choose an icon for your workspace
                </p>
                {[
                  { label: "Building", value: "Building2", Icon: Building2 },
                  { label: "Home", value: "Home", Icon: Home },
                  { label: "Wrench", value: "Wrench", Icon: Wrench },
                ].map(({ value, Icon }) => (
                  <button
                    key={value}
                    onClick={() => setNewIcon(value)}
                    className={`flex items-center justify-center p-2 border rounded ${
                      newIcon === value ? "border-primary" : "border-muted"
                    }`}
                    type="button"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
              <DialogFooter className="mt-4">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setNewName(workspace.name || "");
                    setOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    if (!workspace?.id || !newName.trim()) return;
                    try {
                      setIsUpdating(true);
                      await updateDoc(doc(db, "workspaces", workspace.id), {
                        name: newName.trim(),
                        icon: newIcon,
                      });
                      setWorkspace((prev) =>
                        prev
                          ? {
                              ...prev,
                              name: newName.trim(),
                              icon: newIcon || prev.icon,
                            }
                          : prev
                      );
                      setOpen(false);
                      window.location.reload();
                      toast("Workspace name updated", { duration: 3000 });
                    } catch (err) {
                      console.error("Failed to update name:", err);
                      toast("Failed to update name", { duration: 3000 });
                    } finally {
                      setIsUpdating(false);
                    }
                  }}
                  disabled={isUpdating}
                >
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
          <AlertDialogContent className="dark:bg-gray-900">
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
