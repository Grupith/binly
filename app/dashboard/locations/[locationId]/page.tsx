"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "@/app/firebase";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  ArrowLeft,
  RefreshCw,
  Pencil,
  MapPin,
  Warehouse,
  Boxes,
  Building2,
  Loader2,
  ExternalLink,
  PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function initialsFrom(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatQty(n?: number) {
  if (typeof n !== "number") return "—";
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
    n,
  );
}

type ItemStatus = "available" | "archived" | "out of stock" | string;

type Item = {
  id: string;
  name: string;
  qty: number;
  sku?: string;
  status?: ItemStatus;
  imageUrl?: string;
};

type Location = {
  id: string;
  name: string;
  type?: string;
};

function getLocationIcon(type?: string) {
  const t = type?.toLowerCase?.() ?? "";
  if (t.includes("rack") || t.includes("shelf") || t.includes("bin"))
    return <Boxes className="w-4 h-4" aria-hidden />;
  if (t.includes("warehouse") || t.includes("shop"))
    return <Warehouse className="w-4 h-4" aria-hidden />;
  if (t.includes("office") || t.includes("room"))
    return <Building2 className="w-4 h-4" aria-hidden />;
  return <MapPin className="w-4 h-4" aria-hidden />;
}

export default function LocationDetailPage() {
  const params = useParams();
  const locationId = params.locationId as string;
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["location", currentWorkspaceId, locationId],
    });
    queryClient.invalidateQueries({
      queryKey: ["items", currentWorkspaceId, locationId],
    });
  };

  const { currentWorkspaceId } = useWorkspace();

  const {
    data: location,
    isLoading: loadingLocation,
    isFetching: fetchingLocation,
  } = useQuery<Location | null>({
    queryKey: ["location", currentWorkspaceId, locationId],
    queryFn: async () => {
      if (!currentWorkspaceId) return null;
      const locationRef = doc(
        db,
        "workspaces",
        currentWorkspaceId,
        "locations",
        locationId,
      );
      const snap = await getDoc(locationRef);
      return snap.exists()
        ? ({ id: snap.id, ...snap.data() } as Location)
        : null;
    },
    enabled: !!currentWorkspaceId && !!locationId,
  });

  const {
    data: items = [],
    isLoading: loadingItems,
    isFetching: fetchingItems,
  } = useQuery({
    queryKey: ["items", currentWorkspaceId, locationId],
    queryFn: async () => {
      if (!currentWorkspaceId) return [];
      const itemsRef = collection(
        db,
        "workspaces",
        currentWorkspaceId,
        "items",
      );
      const q = query(itemsRef, where("locationId", "==", locationId));
      const snap = await getDocs(q);
      return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Item);
    },
    enabled: !!currentWorkspaceId && !!locationId,
  });

  const [editOpen, setEditOpen] = React.useState(false);

  type LocationFormValues = {
    name: string;
    type?: string;
  };

  const form = useForm<LocationFormValues>({
    defaultValues: { name: "", type: "" },
  });

  // Reset form values when location loads or dialog opens
  React.useEffect(() => {
    if (location && editOpen) {
      form.reset({ name: location.name ?? "", type: location.type ?? "" });
    }
  }, [location, editOpen, form]);

  if (!location) {
    return <div className="p-4 text-red-500">Location not found.</div>;
  }

  return (
    <div className="px-4 space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {getLocationIcon(location?.type)}
            <h1 className="text-2xl font-bold leading-none">
              {location?.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 my-2">
            {location?.type && (
              <Badge variant="secondary" className="capitalize">
                {location.type}
              </Badge>
            )}
          </div>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="gap-2 cursor-pointer"
            disabled={fetchingLocation || fetchingItems}
          >
            {fetchingLocation || fetchingItems ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="secondary"
            className="gap-2 cursor-pointer"
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="w-4 h-4" /> Edit
          </Button>
          <Button className="gap-2 cursor-pointer">
            <PlusIcon className="w-4 h-4" /> Add Item
          </Button>
        </div>
      </div>

      <Separator />

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit location</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(async (values) => {
              if (!currentWorkspaceId || !locationId) return;
              const ref = doc(
                db,
                "workspaces",
                currentWorkspaceId,
                "locations",
                locationId,
              );
              await updateDoc(ref, {
                name: values.name,
                type: values.type ?? "",
              });
              // Optimistic refresh
              queryClient.invalidateQueries({
                queryKey: ["location", currentWorkspaceId, locationId],
              });
              setEditOpen(false);
            })}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...form.register("name", { required: true })}
                placeholder="e.g. Rack A1"
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500">
                  Location name is required.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                {...form.register("type")}
                placeholder="Rack / Shelf / Office / Shop"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="gap-2"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Pencil className="w-4 h-4" />
                )}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Items Table */}
      {loadingLocation || loadingItems ? (
        <div className="space-y-2 p-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-full rounded-md bg-muted animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-muted-foreground py-12 text-sm text-center">
          No items in this location yet.
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden mt-6 ">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-accent/90 text-accent-foreground uppercase tracking-wide">
              <TableRow className="border-b">
                <TableHead className="w-[50%] py-2 text-[11px]">Item</TableHead>
                <TableHead className="py-2 text-[11px]">SKU</TableHead>
                <TableHead className="py-2 text-[11px]">Status</TableHead>
                <TableHead className="text-right py-2 text-[11px]">
                  Qty
                </TableHead>
                <TableHead className="w-[150px] text-right py-2 text-[11px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item: Item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-accent/40 focus:bg-accent/40 transition-colors odd:bg-muted/30"
                >
                  <TableCell className="py-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-8 w-8">
                        {/* If you later add item.imageUrl, use AvatarImage src here */}
                        <AvatarImage
                          src={item.imageUrl ?? ""}
                          alt={item.name}
                        />
                        <AvatarFallback>
                          {initialsFrom(item.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="truncate font-medium leading-tight">
                          {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          ID: {item.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-6 align-middle text-sm">
                    <span className="text-sm text-blue-500 font-normal">
                      {item.sku ?? "—"}
                    </span>
                  </TableCell>
                  <TableCell className="py-2 text-sm">
                    <Badge
                      className={cn(
                        "capitalize",
                        item.status?.toLowerCase() === "available" &&
                          "bg-green-500/20 text-green-700 dark:text-green-300",
                        item.status?.toLowerCase() === "archived" &&
                          "bg-gray-500/20 text-gray-700 dark:text-gray-300",
                        item.status?.toLowerCase() === "out of stock" &&
                          "bg-red-500/20 text-red-700 dark:text-red-300",
                      )}
                    >
                      {item.status ?? "active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2 text-right tabular-nums font-medium text-sm">
                    {formatQty(item.qty)}
                  </TableCell>
                  <TableCell className="py-2 pr-4 text-right text-sm">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 cursor-pointer"
                      onClick={() => router.push(`/dashboard/items/${item.id}`)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      View item
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
