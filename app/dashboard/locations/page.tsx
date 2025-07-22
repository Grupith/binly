"use client";

import { useState } from "react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { PrintLocationLabel } from "@/components/modals/PrintLocationLabel";
import CreateLocationModal from "@/components/modals/CreateLocationModal";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { HousePlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Location {
  id: string;
  name: string;
  type: string;
  qrCode?: string;
}

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { currentWorkspaceId } = useWorkspace();
  const router = useRouter();

  const { data: locations = [], isLoading } = useQuery<Location[]>({
    queryKey: ["locations", currentWorkspaceId],
    queryFn: async () => {
      if (!currentWorkspaceId) return [];
      const snap = await getDocs(
        collection(db, "workspaces", currentWorkspaceId, "locations")
      );
      return snap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name as string,
          type: data.type as string,
          qrCode: data.qrCode as string | undefined,
        };
      });
    },
    enabled: !!currentWorkspaceId,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-muted-foreground">
            View and manage items stored in each location.
          </p>
        </div>
        {/* Create Location Button */}
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="cursor-pointer"
        >
          <HousePlusIcon className="mr-1" />
          Create Location
        </Button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-muted-foreground py-8">
            Loading locations...
          </div>
        ) : (
          locations.map((location) => (
            <div
              key={location.id}
              className="max-w-3xl transition-colors rounded-md outline-none focus:ring-2 focus:ring-ring"
              tabIndex={0}
              role="button"
              onClick={() => router.push(`/dashboard/locations/${location.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/dashboard/locations/${location.id}`);
                }
              }}
            >
              <Card className="border border-gray-200 dark:border-gray-700 cursor-pointer bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800">
                <CardHeader className="p-0">
                  <div className="flex items-center justify-between w-full h-full px-4 pt-4">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 capitalize">
                        {location.type}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLocation(location);
                      }}
                      className="cursor-pointer"
                    >
                      View Label
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))
        )}
      </div>
      {selectedLocation && (
        <PrintLocationLabel
          open={!!selectedLocation}
          onClose={() => setSelectedLocation(null)}
          locationName={selectedLocation.name}
          qrCode={selectedLocation.qrCode ?? ""}
        />
      )}
      <CreateLocationModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
