"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useQuery } from "@tanstack/react-query";
import { getItemById } from "@/lib/firebase/items";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Item } from "@/lib/types/item";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Location = {
  id: string;
  name: string;
};

export default function ItemPage() {
  const { itemId } = useParams();
  const { currentWorkspaceId } = useWorkspace();
  const router = useRouter();

  const {
    data: item,
    isLoading,
    isError,
  } = useQuery<Item>({
    queryKey: ["item", currentWorkspaceId, itemId],
    queryFn: () => getItemById(currentWorkspaceId!, itemId as string),
    enabled: !!currentWorkspaceId && !!itemId,
  });

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
          item.locationId
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
    <div className="px-4 space-y-6 max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-1 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
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

        <div className="md:w-1/2 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">{item.name}</h1>
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
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>

          <dl className="space-y-1 text-sm text-muted-foreground">
            <div>
              <dt className="font-medium text-foreground">Mini Number</dt>
              <dd>{item.mininumber ? item.mininumber : "N/A"}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">SKU</dt>
              <dd>{item.sku}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Quantity</dt>
              <dd>{item.qty}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Unit</dt>
              <dd>{item.unit}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Location</dt>
              <dd>
                {loadingLocation ? (
                  "Loading..."
                ) : location ? (
                  <Link
                    href={`/dashboard/locations/${location.id}`}
                    className="text-blue-600 dark:text-blue-400 underline hover:opacity-80"
                  >
                    {location.name}
                  </Link>
                ) : (
                  "N/A"
                )}
              </dd>
            </div>
          </dl>

          {item.description && (
            <div>
              <h2 className="text-sm font-medium text-foreground mb-1">
                Description
              </h2>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {item.description}
              </p>
            </div>
          )}

          {item.tags.length > 0 && (
            <div className="mb-4">
              <h2 className="text-sm font-medium text-foreground mb-1">Tags</h2>
              <div className="flex flex-wrap gap-2">
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
          )}
        </div>
      </div>
    </div>
  );
}
