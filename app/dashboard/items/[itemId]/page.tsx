"use client";
import * as React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getItemById } from "@/lib/firebase/items";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Item } from "@/lib/types/item";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Location = {
  id: string;
  name: string;
};

export default function ItemPage() {
  const { itemId } = useParams();
  const { currentWorkspaceId } = useWorkspace();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: item,
    isLoading,
    isError,
  } = useQuery<Item>({
    queryKey: ["item", currentWorkspaceId, itemId],
    queryFn: () => getItemById(currentWorkspaceId!, itemId as string),
    enabled: !!currentWorkspaceId && !!itemId,
  });

  const itemIdStr = Array.isArray(itemId) ? itemId[0] : (itemId as string);

  const [qtyValue, setQtyValue] = React.useState<number>(0);
  const [isEditingQty, setIsEditingQty] = React.useState(false);
  const [qtyDraft, setQtyDraft] = React.useState<string>("0");

  React.useEffect(() => {
    const n = typeof item?.qty === "number" ? item.qty : Number(item?.qty ?? 0);
    const safe = Number.isFinite(n) ? n : 0;
    setQtyValue(safe);
    setQtyDraft(String(safe));
  }, [item?.qty]);

  const updateQtyMutation = useMutation({
    mutationFn: async (nextQty: number) => {
      if (!currentWorkspaceId || !itemIdStr) return;
      const ref = doc(db, "workspaces", currentWorkspaceId, "items", itemIdStr);
      await updateDoc(ref, {
        qty: nextQty,
        updatedAt: serverTimestamp(),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["item", currentWorkspaceId, itemIdStr],
      });
    },
  });

  const commitQty = (raw: string) => {
    const parsed = Number(raw);
    const next = Number.isFinite(parsed)
      ? Math.max(0, Math.floor(parsed))
      : qtyValue;
    setQtyValue(next);
    setQtyDraft(String(next));
    updateQtyMutation.mutate(next);
    setIsEditingQty(false);
  };

  const decQty = () => {
    const next = Math.max(0, qtyValue - 1);
    setQtyValue(next);
    setQtyDraft(String(next));
    updateQtyMutation.mutate(next);
  };

  const incQty = () => {
    const next = qtyValue + 1;
    setQtyValue(next);
    setQtyDraft(String(next));
    updateQtyMutation.mutate(next);
  };

  const { data: location, isLoading: loadingLocation } =
    useQuery<Location | null>({
      queryKey: ["location", currentWorkspaceId, item?.locationId],
      queryFn: async () => {
        if (!item?.locationId || !currentWorkspaceId) return null;
        const docRef = doc(
          db,
          "workspaces",
          currentWorkspaceId,
          "locations",
          item.locationId,
        );
        const snap = await getDoc(docRef);
        return snap.exists()
          ? ({ id: snap.id, ...snap.data() } as Location)
          : null;
      },
      enabled: !!item?.locationId && !!currentWorkspaceId,
    });

  if (isLoading) return <div className="p-6">Loading item...</div>;
  if (isError || !item)
    return <div className="p-6 text-red-500">Item not found.</div>;

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Badge
          className={
            item.status === "available"
              ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
              : item.status === "checked-out"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
                : item.status === "used"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100"
                  : item.status === "broken"
                    ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                    : item.status === "archived"
                      ? "bg-muted text-muted-foreground hover:bg-muted"
                      : "bg-muted text-muted-foreground hover:bg-muted"
          }
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      </div>

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-col gap-2">
            <CardTitle className="text-2xl md:text-3xl">{item.name}</CardTitle>

            {/* Quantity control */}
            <div className="flex items-center gap-3">
              <Label className="text-sm text-muted-foreground">Quantity</Label>

              <div className="flex items-center rounded-lg border bg-background overflow-hidden">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-none px-3 cursor-pointer"
                  onClick={decQty}
                  disabled={updateQtyMutation.isPending || qtyValue <= 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <div className="min-w-[80px] px-3 py-2 text-center">
                  {isEditingQty ? (
                    <Input
                      value={qtyDraft}
                      onChange={(e) => setQtyDraft(e.target.value)}
                      onBlur={() => commitQty(qtyDraft)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") commitQty(qtyDraft);
                        if (e.key === "Escape") {
                          setIsEditingQty(false);
                          setQtyDraft(String(qtyValue));
                        }
                      }}
                      inputMode="numeric"
                      className="h-8 text-center"
                      autoFocus
                    />
                  ) : (
                    <button
                      type="button"
                      className="w-full text-xl font-semibold leading-none hover:opacity-80 cursor-pointer"
                      onClick={() => setIsEditingQty(true)}
                      title="Click to edit"
                    >
                      {qtyValue}
                    </button>
                  )}
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-none px-3 cursor-pointer"
                  onClick={incQty}
                  disabled={updateQtyMutation.isPending}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {updateQtyMutation.isPending && (
                <span className="text-xs text-muted-foreground">Saving…</span>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image */}
            <div className="space-y-3">
              <div className="rounded-xl border bg-muted/30 p-3">
                <AspectRatio
                  ratio={4 / 3}
                  className="bg-muted rounded-lg overflow-hidden"
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full text-sm text-muted-foreground">
                      No Image
                    </div>
                  )}
                </AspectRatio>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Mini Number
                    </div>
                    <div className="text-sm font-medium">
                      {item.mininumber ? item.mininumber : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">SKU</div>
                    <div className="text-sm font-medium">
                      {item.sku ? item.sku : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Unit</div>
                    <div className="text-sm font-medium">
                      {item.unit ? item.unit : "N/A"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      Location
                    </div>
                    <div className="text-sm font-medium">
                      {loadingLocation ? (
                        "Loading..."
                      ) : location ? (
                        <Link
                          href={`/dashboard/locations/${location.id}`}
                          className="underline underline-offset-4 hover:opacity-80"
                        >
                          {location.name}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {item.description ? (
                <div className="space-y-2">
                  <h2 className="text-sm font-medium">Description</h2>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
              ) : null}

              {item.tags.length > 0 ? (
                <div className="space-y-2">
                  <h2 className="text-sm font-medium">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full"
                      >
                        {tag && tag.trim() !== "" ? tag : "N/A"}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
