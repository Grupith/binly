"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/app/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { Building2, Home, Wrench } from "lucide-react";

interface Props {
  onClose: () => void;
}

export function CreateWorkspaceModal({ onClose }: Props) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [icon, setIcon] = useState("Building2");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!workspaceName.trim() || !user) return;

    setIsSubmitting(true);

    try {
      // 1. Create workspace doc
      const workspaceId = `${user.uid}-${Date.now()}`;
      await setDoc(doc(db, "workspaces", workspaceId), {
        name: workspaceName.trim(),
        owner: user.uid,
        members: [user.uid],
        createdAt: new Date(),
        logo: icon,
      });

      // 2. Update user doc with workspace ID
      await updateDoc(doc(db, "users", user.uid), {
        workspaces: workspaceId,
      });

      onClose();
      router.push("/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Error creating workspace:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Your Workspace</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Think of a workspace as an organization, company, or team. Examples:
            Smith&apos;s Home, Randy&apos;s Shop.
          </p>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            disabled={isSubmitting}
          />
          <div className="flex items-center space-x-4">
            {[
              { label: "Building", value: "Building2", Icon: Building2 },
              { label: "Home", value: "Home", Icon: Home },
              { label: "Wrench", value: "Wrench", Icon: Wrench },
            ].map(({ value, Icon }) => (
              <button
                key={value}
                onClick={() => setIcon(value)}
                className={`flex items-center justify-center p-2 border rounded ${
                  icon === value ? "border-primary" : "border-muted"
                }`}
                type="button"
              >
                <Icon className="h-5 w-5" />
              </button>
            ))}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !workspaceName.trim()}
          >
            {isSubmitting ? "Creating..." : "Create Workspace"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
