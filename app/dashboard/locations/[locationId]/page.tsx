"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/app/firebase";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

type Item = {
  id: string;
  name: string;
  qty: number;
};

type Location = {
  id: string;
  name: string;
  type?: string;
};

export default function LocationDetailPage() {
  const params = useParams();
  const locationId = params.locationId as string;
  const router = useRouter();

  const { currentWorkspaceId } = useWorkspace();

  const { data: location, isLoading: loadingLocation } =
    useQuery<Location | null>({
      queryKey: ["location", currentWorkspaceId, locationId],
      queryFn: async () => {
        if (!currentWorkspaceId) return null;
        const locationRef = doc(
          db,
          "workspaces",
          currentWorkspaceId,
          "locations",
          locationId
        );
        const snap = await getDoc(locationRef);
        return snap.exists()
          ? ({ id: snap.id, ...snap.data() } as Location)
          : null;
      },
      enabled: !!currentWorkspaceId && !!locationId,
    });

  const { data: items = [], isLoading: loadingItems } = useQuery({
    queryKey: ["items", currentWorkspaceId, locationId],
    queryFn: async () => {
      if (!currentWorkspaceId) return [];
      const itemsRef = collection(
        db,
        "workspaces",
        currentWorkspaceId,
        "items"
      );
      const q = query(itemsRef, where("locationId", "==", locationId));
      const snap = await getDocs(q);
      return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Item));
    },
    enabled: !!currentWorkspaceId && !!locationId,
  });

  if (loadingLocation || loadingItems) {
    return <div className="p-4 text-muted-foreground">Loading...</div>;
  }

  if (!location) {
    return <div className="p-4 text-red-500">Location not found.</div>;
  }

  return (
    <div className="px-4 space-y-4">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-1 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
      {/* Location details */}
      <div>
        <h1 className="text-2xl font-bold">{location.name}</h1>
        {location.type && (
          <p className="text-muted-foreground capitalize">{location.type}</p>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Items in this location:</h2>
        {items.length === 0 ? (
          <p className="text-muted-foreground">
            No items in this location yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {items.map((item: Item) => (
              <li
                key={item.id}
                onClick={() => router.push(`/dashboard/items/${item.id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.push(`/dashboard/items/${item.id}`);
                  }
                }}
                tabIndex={0}
                role="button"
                className="flex justify-between items-center p-3 border rounded-md bg-muted cursor-pointer hover:bg-muted/70 transition"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-muted-foreground" />
                  <span>{item.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Qty: {item.qty}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
