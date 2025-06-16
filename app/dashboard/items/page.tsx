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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Plus, MoreHorizontal, Loader2 } from "lucide-react";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* <ItemCard /> */}
        {items.map((item) => (
          <div
            key={item.id}
            className="relative border p-4 rounded-lg shadow-sm"
          >
            <AspectRatio
              ratio={1}
              className="mb-3 rounded-xl relative overflow-hidden"
            >
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain rounded-xl"
                />
              ) : (
                <div className="bg-muted flex items-center justify-center w-full h-full text-sm text-muted-foreground">
                  No Image
                </div>
              )}
            </AspectRatio>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
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
              </div>
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
            {item.mininumber && (
              <p className="text-sm text-muted-foreground">
                #{item.mininumber}
              </p>
            )}
            {item.sku?.trim() ? (
              <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
            ) : (
              <p className="text-sm text-muted-foreground">SKU: N/A</p>
            )}
            {/* item qty field */}
            <div className="flex items-baseline gap-1">
              <p className="mt-2 text-md">Qty: {item.qty}</p>
              <p className="mt-1 text-md">{item.unit}</p>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
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
        ))}
      </div>

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
