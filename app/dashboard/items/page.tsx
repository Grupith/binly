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
                : totalCount ?? "—"}
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
            }}
            variant="outline"
            disabled={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RotateCcw className="w-4 h-4" />
            )}
          </Button>

          {/* Create item button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer"
            variant={"outline"}
          >
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>
      </header>
      {/* Items grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/items/${item.id}`}
            className="block"
          >
            {/* <ItemCard /> */}
            <div className="flex border p-4 rounded-lg shadow-sm gap-4 items-start overflow-hidden w-full hover:ring-1 transition bg-gray-50 dark:bg-gray-800">
              <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
                    <Package className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold truncate">
                      {item.name}
                    </h2>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {item.description || "No description available"}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {item.sku?.trim()
                        ? `SKU: ${item.sku}`
                        : item.mininumber
                        ? `#${item.mininumber}`
                        : "SKU: N/A"}
                    </p>
                    <p className="text-xs sm:text-sm text-foreground">
                      Qty: {item.qty} {item.unit}
                    </p>

                    <span
                      className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
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
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Dropdown menu for item actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 cursor-pointer hover:focus:ring-2 focus:ring-ring"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Link href={`/dashboard/items/${item.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Move</DropdownMenuItem>
                        {item.status !== "archived" && (
                          <DropdownMenuItem
                            onClick={async () => {
                              const itemRef = doc(
                                db,
                                "workspaces",
                                currentWorkspaceId!,
                                "items",
                                item.id
                              );
                              await updateDoc(itemRef, { status: "archived" });
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
                <div className="flex justify-between items-center mt-2">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full"
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
