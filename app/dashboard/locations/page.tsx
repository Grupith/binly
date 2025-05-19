"use client";

import { useState } from "react";
import { PrintLocationLabel } from "@/components/modals/PrintLocationLabel";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  HousePlusIcon,
  MoreVertical,
  Package,
} from "lucide-react";

const mockLocations = [
  {
    id: "loc1",
    name: "Rack A1",
    type: "rack",
    qrCode: "rack-a1",
    items: {
      item123: 8,
      item456: 2,
    },
  },
  {
    id: "loc2",
    name: "Shelf B2",
    type: "shelf",
    qrCode: "shelf-b2",
    items: {
      item789: 5,
    },
  },
];

export default function LocationsPage() {
  const [openLocationId, setOpenLocationId] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof mockLocations)[0] | null
  >(null);

  const toggleOpen = (id: string) => {
    setOpenLocationId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-muted-foreground">
            View and manage items stored in each location.
          </p>
        </div>
        <Button>
          <HousePlusIcon className="mr-1" />
          Add Location
        </Button>
      </div>

      <div className="space-y-4">
        {mockLocations.map((location) => {
          const itemCount = Object.values(location.items).reduce(
            (sum, qty) => sum + qty,
            0
          );
          return (
            <div
              key={location.id}
              className="max-w-3xl transition-colors rounded-md outline-none focus:ring-2 focus:ring-ring"
              tabIndex={0}
              role="button"
              onClick={() => toggleOpen(location.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleOpen(location.id);
                }
              }}
            >
              <Card
                className={`border border-gray-200 dark:border-gray-700 cursor-pointer ${
                  openLocationId === location.id
                    ? "bg-muted/40 dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <CardHeader className="p-0">
                  <div className="flex items-center justify-between w-full h-full px-4 pt-4">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200 capitalize">
                        {location.type}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                        {itemCount} items
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
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
                      {openLocationId === location.id ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </div>
                  </div>
                </CardHeader>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openLocationId === location.id ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <CardContent className="bg-muted/50">
                    {itemCount === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No items assigned to this location.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {Object.entries(location.items).map(([itemId, qty]) => (
                          <li
                            key={itemId}
                            className="flex justify-between items-center p-2 rounded-md border bg-gray-100 dark:bg-gray-900 hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-muted-foreground" />
                              <span>{itemId}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground">
                                Qty: {qty}
                              </span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  side="bottom"
                                  align="end"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Move</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-500">
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      {selectedLocation && (
        <PrintLocationLabel
          open={!!selectedLocation}
          onClose={() => setSelectedLocation(null)}
          locationName={selectedLocation.name}
          qrCode={selectedLocation.qrCode}
        />
      )}
    </div>
  );
}
