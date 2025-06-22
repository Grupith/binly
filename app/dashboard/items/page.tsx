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
import { Plus, MoreHorizontal, Loader2, Package } from "lucide-react";
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
    <div className="px-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Items</h1>
        <Button onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </header>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* <ItemCard /> */}
        {items.map((item) => (
          <div
            key={item.id}
            className="flex border p-4 rounded-lg shadow-sm gap-4 items-start overflow-hidden w-full"
          >
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
                <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                  <Package className="w-6 h-6" />
                </div>
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold truncate max-w-[200px]">
                    {item.name}
                  </h2>
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
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 w-fit rounded-full ${
                      item.status === "available"
                        ? "bg-green-100 text-green-800"
                        : item.status === "checked-out"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "used"
                        ? "bg-blue-100 text-blue-800"
                        : item.status === "broken"
                        ? "bg-red-100 text-red-800"
                        : item.status === "archived"
                        ? "bg-gray-200 text-gray-600"
                        : ""
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
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
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
