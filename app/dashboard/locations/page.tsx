"use client";

import { useState } from "react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { PrintLocationLabel } from "@/components/modals/PrintLocationLabel";
import CreateLocationModal from "@/components/modals/CreateLocationModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HousePlusIcon,
  MoreVertical,
  QrCode,
  ExternalLink,
  MapPin,
  Warehouse,
  Boxes,
  Building2,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

interface Location {
  id: string;
  name: string;
  type: string;
  qrCode?: string;
}

function getLocationIcon(type: string) {
  const t = type?.toLowerCase?.() ?? "";
  if (t.includes("rack") || t.includes("shelf") || t.includes("bin"))
    return <Boxes className="h-4 w-4" aria-hidden />;
  if (t.includes("warehouse") || t.includes("shop"))
    return <Warehouse className="h-4 w-4" aria-hidden />;
  if (t.includes("office") || t.includes("room"))
    return <Building2 className="h-4 w-4" aria-hidden />;
  return <MapPin className="h-4 w-4" aria-hidden />;
}

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { currentWorkspaceId } = useWorkspace();
  // const router = useRouter();

  const {
    data: locations = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<Location[]>({
    queryKey: ["locations", currentWorkspaceId],
    queryFn: async () => {
      if (!currentWorkspaceId) return [];
      const snap = await getDocs(
        collection(db, "workspaces", currentWorkspaceId, "locations"),
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
    <div className="space-y-6 md:px-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-muted-foreground">
            View and manage items stored in each location.
          </p>
        </div>
        {/* Actions: Refresh & Create Location */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="cursor-pointer"
          >
            {isFetching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
            <span className="sr-only">Refresh locations</span>
          </Button>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="cursor-pointer"
          >
            <HousePlusIcon className="mr-1" />
            Create Location
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-50 dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Total locations</CardTitle>
            <div className="text-xl">
              {isLoading ? <Skeleton className="h-6 w-10" /> : locations.length}
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Most used location</CardTitle>
            <div className="text-xl">
              {isLoading ? <Skeleton className="h-6 w-40" /> : "N/A"}
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Types</CardTitle>
            <div className="text-sm text-muted-foreground">
              {isLoading ? <Skeleton className="h-4 w-28" /> : "N/A"}
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-gray-50 dark:bg-gray-800">
          <CardHeader>
            <CardTitle>Recently added</CardTitle>
            <div className="text-xl">
              {isLoading ? (
                <Skeleton className="h-6 w-48" />
              ) : locations.length > 0 ? (
                locations[0].name
              ) : (
                "N/A"
              )}
            </div>
          </CardHeader>
        </Card>
      </div>

      <Separator className="my-4" />

      {/* Locations Grid */}
      <h2 className="text-lg font-semibold">All Locations</h2>
      <div className="space-y-4">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card
                key={i}
                className="border border-gray-200 dark:border-gray-800 bg-card"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-5 w-40 sm:w-56" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-24 rounded-full hidden sm:inline-flex" />
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <Skeleton className="h-9 w-24 rounded-md" />
                  <Skeleton className="h-9 w-20 rounded-md" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : locations.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No locations yet. Create your first one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Card
                key={location.id}
                className="group relative border border-gray-200 dark:border-gray-800 bg-card transition-colors hover:bg-accent/30 focus-within:ring-2 focus-within:ring-ring"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getLocationIcon(location.type)}
                      <CardTitle className="text-base font-semibold truncate max-w-[16rem] sm:max-w-[18rem]">
                        <Link
                          href={`/dashboard/locations/${location.id}`}
                          className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                        >
                          {location.name}
                        </Link>
                      </CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/locations/${location.id}`}
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" /> Open
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedLocation(location)}
                          className="flex items-center gap-2"
                        >
                          <QrCode className="h-4 w-4" /> View label
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                      {location.type}
                    </Badge>
                    {location.qrCode ? (
                      <Badge
                        variant="outline"
                        className="hidden sm:inline-flex gap-1"
                      >
                        <QrCode className="h-3 w-3" /> QR ready
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="hidden sm:inline-flex"
                      >
                        No label
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <Button
                    asChild
                    size="sm"
                    variant="secondary"
                    className="gap-1"
                  >
                    <Link href={`/dashboard/locations/${location.id}`}>
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedLocation(location)}
                    className="gap-1"
                  >
                    {selectedLocation?.id === location.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <QrCode className="h-4 w-4" />
                    )}
                    Label
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
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
