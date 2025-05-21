"use client";

import React from "react";
import { db } from "@/app/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
import { FilePlus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { storage } from "@/app/firebase"; // your initialized storage instance

type AddItemModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ItemFormData = {
  name: string;
  barcode: string;
  mininumber: string;
  qty: number;
  tags: string;
  status: "available" | "checked-out" | "used" | "broken";
};

export default function AddItemModal({
  open,
  onOpenChange,
}: AddItemModalProps) {
  const { register, handleSubmit, reset } = useForm<ItemFormData>();

  const { user } = useAuth();
  const { currentWorkspaceId } = useWorkspace();
  const queryClient = useQueryClient();

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const onSubmit = async (data: ItemFormData) => {
    if (!currentWorkspaceId || !user) return;

    let imageUrl = "";

    if (imageFile) {
      const storageRef = ref(
        storage,
        `workspaces/${currentWorkspaceId}/items/${Date.now()}_${imageFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      await new Promise((resolve, reject) => {
        uploadTask.on("state_changed", null, reject, async () => {
          imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(null);
        });
      });
    }

    const itemData = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim().toLowerCase()),
      status: "available",
      createdAt: serverTimestamp(),
      createdBy: user?.uid || "unknown user",
      lastMovedAt: serverTimestamp(),
      locations: {},
      assigned: {},
      imageUrl, // new field
    };

    try {
      await addDoc(
        collection(db, "workspaces", currentWorkspaceId, "items"),
        itemData
      );
      queryClient.invalidateQueries({
        queryKey: ["items", currentWorkspaceId],
      });
      console.log("Item saved!");
      reset();
      setImageFile(null);
      setImagePreview(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="py-2 flex items-center gap-2">
            <FilePlus size={22} />
            Add New Item
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new item to your workspace.
          </DialogDescription>
        </DialogHeader>

        <TooltipProvider>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Label>Name</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    What is the item called?
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input {...register("name")} />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <Label>Mini Number</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Short reference ID (e.g. M001)
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  {...register("mininumber")}
                  className="max-w-full md:max-w-[200px]"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <Label>Quantity</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      How many do you currently have?
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  type="number"
                  {...register("qty", { valueAsNumber: true })}
                  className="max-w-full md:max-w-[150px]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 mb-1">
                <Label>Tags</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Keywords for easy searching (comma-separated)
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input {...register("tags")} />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  <Label htmlFor="picture">Image</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      Upload an image of the item
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;

                    if (file) {
                      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
                      if (file.size > maxSizeInBytes) {
                        alert("Image must be 5MB or smaller.");
                        return;
                      }

                      setImageFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setImagePreview(reader.result as string);
                      reader.readAsDataURL(file);
                    } else {
                      setImageFile(null);
                      setImagePreview(null);
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Max file size: 5MB
                </p>

                {imagePreview && (
                  <div className="relative mt-2 w-full h-40 rounded overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
