"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useQuery } from "@tanstack/react-query";
import { getItemById } from "@/lib/firebase/items";
import { Item } from "@/lib/types/item";

export default function ItemPage() {
  const { itemId } = useParams();
  const { currentWorkspaceId } = useWorkspace();

  const {
    data: item,
    isLoading,
    isError,
  } = useQuery<Item>({
    queryKey: ["item", currentWorkspaceId, itemId],
    queryFn: () => getItemById(currentWorkspaceId!, itemId as string),
    enabled: !!currentWorkspaceId && !!itemId,
  });

  if (isLoading) return <div className="p-6">Loading item...</div>;
  if (isError || !item)
    return <div className="p-6 text-red-500">Item not found.</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{item.name}</h1>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            item.status === "available"
              ? "bg-green-100 text-green-800"
              : item.status === "checked-out"
              ? "bg-yellow-100 text-yellow-800"
              : item.status === "used"
              ? "bg-blue-100 text-blue-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      </div>

      <div className="mx-auto w-full max-w-md">
        <AspectRatio ratio={4 / 3} className="bg-muted rounded">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover rounded"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full text-sm text-muted-foreground">
              No Image
            </div>
          )}
        </AspectRatio>
      </div>

      <div className="border-t pt-4 space-y-2">
        <p className="text-sm text-muted-foreground">
          Mini Number: {item.mininumber}
        </p>
        <p className="text-sm text-muted-foreground">Quantity: {item.qty}</p>
        <div className="flex gap-2 flex-wrap">
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
  );
}
