"use client";
import type { Item } from "@/lib/types/item";
import { InfiniteData } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreHorizontal,
  Loader2,
  Package,
  RotateCcw,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import AddItemModal from "@/components/modals/AddItemModal";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { getItemsPaginated } from "@/lib/firebase/items";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { DocumentSnapshot } from "firebase/firestore";
import LoadingSpinner from "@/components/LoadingSpinner";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const SkeletonItemCard = () => (
  <div className="group relative overflow-hidden rounded-xl border bg-gray-50 shadow-sm transition hover:shadow-md dark:bg-gray-900">
    <div className="aspect-[4/3] w-full bg-muted">
      <Skeleton className="h-full w-full" />
    </div>

    <div className="space-y-2 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-5/6" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="flex flex-wrap gap-2 pt-1">
        <Skeleton className="h-4 w-14 rounded-full" />
        <Skeleton className="h-4 w-12 rounded-full" />
        <Skeleton className="h-4 w-16 rounded-full" />
      </div>
    </div>
  </div>
);

const ItemsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { currentWorkspaceId } = useWorkspace();
  const pageSize = 10;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    isFetching,
  } = useInfiniteQuery<
    { items: Item[]; lastVisible: DocumentSnapshot | undefined },
    Error,
    InfiniteData<{ items: Item[]; lastVisible: DocumentSnapshot | undefined }>,
    [string, string | undefined],
    DocumentSnapshot | undefined
  >({
    queryKey: ["items", currentWorkspaceId],
    queryFn: ({ pageParam }) =>
      getItemsPaginated(currentWorkspaceId!, pageSize, pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.lastVisible || undefined,
    enabled: !!currentWorkspaceId,
    staleTime: 1000 * 60 * 5, // 5 min; don’t refetch on every mount
    gcTime: 1000 * 60 * 30, // keep cache around
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const {
    data: totalCount,
    isLoading: isCountLoading,
    isError: isCountError,
  } = useQuery({
    queryKey: ["items-count", currentWorkspaceId],
    queryFn: async () => {
      if (!currentWorkspaceId) throw new Error("Missing workspace ID");
      const workspaceRef = doc(db, "workspaces", currentWorkspaceId);
      const itemsCollection = collection(workspaceRef, "items");
      const snapshot = await getCountFromServer(itemsCollection);
      return snapshot.data().count;
    },
    enabled: !!currentWorkspaceId,
    staleTime: 1000 * 60 * 5, // cache count for 5 min
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  // Handle loading and error states
  if (isLoading)
    return (
      <div className="text-center">
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load items.</div>
    );

  return (
    <div className="px-2 sm:px-4 space-y-6">
      {/* Items header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            All Items{" "}
            <span>
              {"("}
              {isCountLoading
                ? "Loading..."
                : isCountError
                  ? "Error"
                  : (totalCount ?? "—")}
            </span>
            {")"}
          </h1>
        </div>

        {/* Refresh button */}
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              queryClient.invalidateQueries({
                queryKey: ["items", currentWorkspaceId],
              });
              queryClient.invalidateQueries({
                queryKey: ["items-count", currentWorkspaceId],
              });
              toast.info("Items list refreshed!");
            }}
            variant="outline"
            disabled={isLoading || (isFetching && !isFetchingNextPage)}
            className="cursor-pointer"
          >
            {isLoading || (isFetching && !isFetchingNextPage) ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RotateCcw className="w-4 h-4" />
            )}
          </Button>

          {/* Create item button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
            variant={"default"}
          >
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </header>
      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isFetching && !isFetchingNextPage
          ? Array.from({ length: Math.max(items.length || 0, pageSize) }).map(
              (_, i) => <SkeletonItemCard key={`sk-${i}`} />,
            )
          : items.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/items/${item.id}`}
                className="group relative overflow-hidden rounded-xl border bg-gray-50 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-ring/30 dark:bg-gray-900"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                      <Package className="h-7 w-7" />
                    </div>
                  )}

                  {/* Top-right actions */}
                  <div className="absolute right-2 top-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/items/${item.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                          }}
                        >
                          Move
                        </DropdownMenuItem>
                        {item.status !== "archived" && (
                          <DropdownMenuItem
                            onSelect={async (e) => {
                              e.preventDefault();
                              const itemRef = doc(
                                db,
                                "workspaces",
                                currentWorkspaceId!,
                                "items",
                                item.id,
                              );
                              await updateDoc(itemRef, {
                                status: "archived",
                              });
                              queryClient.invalidateQueries({
                                queryKey: ["items", currentWorkspaceId],
                              });
                            }}
                            className="cursor-pointer text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20"
                          >
                            Archive
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-2 p-4">
                  <div className="space-y-1">
                    <h2 className="line-clamp-1 text-base font-semibold">
                      {item.name}
                    </h2>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {item.description || "No description available"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.status === "available"
                          ? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : item.status === "checked-out"
                            ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            : item.status === "used"
                              ? "bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : item.status === "broken"
                                ? "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-100"
                                : item.status === "archived"
                                  ? "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                  : ""
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </span>

                    <p className="text-sm font-medium text-foreground">
                      {item.qty} {item.unit}
                    </p>
                  </div>

                  <div className="space-y-0.5 text-xs sm:text-sm text-muted-foreground">
                    <p className="line-clamp-1">
                      {item.locationId && item.locationName ? (
                        <span>
                          Location:{" "}
                          <span className="font-medium text-primary">
                            {item.locationName}
                          </span>
                        </span>
                      ) : (
                        "No location assigned"
                      )}
                    </p>
                    <p className="line-clamp-1">
                      {item.sku?.trim()
                        ? `SKU: ${item.sku}`
                        : item.mininumber
                          ? `#${item.mininumber}`
                          : ""}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{item.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
      </div>
      {/* Load more button */}
      {hasNextPage && (
        <div className="text-center mt-6">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : null}
            Load More
          </Button>
        </div>
      )}

      <AddItemModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default ItemsPage;
