"use client";

import React from "react";
import { db } from "@/app/firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { HelpCircle, MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type CreateLocationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type LocationFormData = {
  name: string;
  type: string;
};

export default function CreateLocationModal({
  open,
  onOpenChange,
}: CreateLocationModalProps) {
  const { register, handleSubmit, reset } = useForm<LocationFormData>();
  const { user } = useAuth();
  const { currentWorkspaceId } = useWorkspace();
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      reset();
      setType("");
    }
  }, [open, reset]);

  const onSubmit = async (data: LocationFormData) => {
    if (!currentWorkspaceId || !user) return;

    setLoading(true);

    try {
      const locationRef = doc(
        collection(db, "workspaces", currentWorkspaceId, "locations")
      );
      await setDoc(locationRef, {
        id: locationRef.id,
        name: data.name,
        type: type,
        qrCode: locationRef.id,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      });

      queryClient.invalidateQueries({
        queryKey: ["locations", currentWorkspaceId],
      });

      reset();
      onOpenChange(false);
      toast.success("Location created successfully!");
    } catch (error) {
      console.error("Error creating location:", error);
      toast.error("Failed to create location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-gray-900 my-1">
        <div className="overflow-y-auto px-2 max-h-[95vh]">
          <DialogHeader className="mb-4">
            <DialogTitle className="py-2 flex items-center gap-2">
              <MapPin size={22} />
              Create New Location
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new location to your workspace.
            </DialogDescription>
          </DialogHeader>

          <TooltipProvider>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Label>Location Name</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Name of the location (e.g. Rack A1, Shelf B2)
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input required {...register("name")} />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Label>Type</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Type of location (e.g. rack, shelf, room)
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rack">Rack</SelectItem>
                    <SelectItem value="shelf">Shelf</SelectItem>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="bin">Bin</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="link"
                  className="cursor-pointer"
                  disabled={loading}
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer"
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
