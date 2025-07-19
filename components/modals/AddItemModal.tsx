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
import { Controller } from "react-hook-form";
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
import { storage } from "@/app/firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

type AddItemModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ItemFormData = {
  name: string;
  description: string;
  sku: string;
  mininumber: string;
  qty: number;
  unit: "pcs" | "cases" | "liters" | "other";
  tags: string;
  status: "available" | "checked-out" | "used" | "broken";
};

export default function AddItemModal({
  open,
  onOpenChange,
}: AddItemModalProps) {
  const { register, handleSubmit, reset, control } = useForm<ItemFormData>();

  const { user } = useAuth();
  const { currentWorkspaceId } = useWorkspace();
  const queryClient = useQueryClient();

  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      reset();
      setImageFile(null);
      setImagePreview(null);
    }
  }, [open, reset]);

  // Submit form data to Firestore
  const onSubmit = async (data: ItemFormData) => {
    if (!currentWorkspaceId || !user) return;

    setLoading(true); // ← Start loading

    let imageUrl = "";

    try {
      if (imageFile) {
        const storageRef = ref(
          storage,
          `workspaces/${currentWorkspaceId}/items/${Date.now()}_${
            imageFile.name
          }`
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
        qty: data.qty || 0,
        unit: data.unit || "",
        sku: data.sku || "",
        mininumber: data.mininumber || "",
        createdAt: serverTimestamp(),
        createdBy: user?.uid || "unknown user",
        lastMovedAt: serverTimestamp(),
        locations: {},
        imageUrl,
      };

      await addDoc(
        collection(db, "workspaces", currentWorkspaceId, "items"),
        itemData
      );

      queryClient.invalidateQueries({
        queryKey: ["items", currentWorkspaceId],
      });

      reset();
      setImageFile(null);
      setImagePreview(null);
      onOpenChange(false);
      toast.success("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
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
              <FilePlus size={22} />
              Create New Item
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new item to your workspace.
            </DialogDescription>
          </DialogHeader>

          {/* Item Name */}
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
                <Input required {...register("name")} />
              </div>

              {/* Description field */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Label>Description</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      A brief description of the item.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Textarea {...register("description")} />
              </div>

              {/* Divider */}
              <hr className="my-4 border-t border-muted" />

              {/* SKU and Mini Number fields */}
              <section className="flex flex-row md:items-end gap-4 flex-wrap">
                {/* SKU field */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Label>SKU</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Stock Keeping Unit (SKU) for the item
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input {...register("sku")} />
                </div>

                {/* Mini Number field */}
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <Label>Mini number</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Short unique identifier (e.g. #1234).
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input {...register("mininumber")} className="max-w-md" />
                </div>
              </section>

              {/* Quantity and Unit fields */}
              <section className="flex flex-row md:items-end gap-4 flex-wrap">
                {/* Select quantity */}
                <div className="w-[100px]">
                  <div className="flex items-center gap-1 mb-1">
                    <Label>Qty</Label>
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
                    className="max-w-full"
                  />
                </div>

                {/* Select unit */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Label>Unit</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        Unit of measurement (e.g. pieces, kg, liters)
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="unit"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pcs">Pieces</SelectItem>
                          <SelectItem value="cases">Cases</SelectItem>
                          <SelectItem value="boxes">Boxes</SelectItem>
                          <SelectItem value="liters">Liters</SelectItem>
                          <SelectItem value="kg">Kilograms</SelectItem>
                          <SelectItem value="lbs">Pounds</SelectItem>
                          <SelectItem value="ft">Feet</SelectItem>
                          <SelectItem value="in">Inches</SelectItem>
                          <SelectItem value="rolls">Rolls</SelectItem>
                          <SelectItem value="bags">Bags</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </section>

              {/* Divider */}
              <hr className="my-4 border-t border-muted" />

              {/* Tags field */}
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

              {/* Image upload field */}
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
                        className="object-contain rounded-lg"
                      />
                    </div>
                  )}
                </div>
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
