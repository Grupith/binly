"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { checkUserExists, createUserIfNotExists } from "@/lib/firebase/users";
import { getUserWorkspaces } from "@/lib/firebase/workspaces";
import { CreateWorkspaceModal } from "@/components/modals/CreateWorkspaceModal";
import type { Workspace } from "@/lib/firebase/workspaces";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [workspaceName, setWorkspaceName] = useState<string | null>(null);

  // Placeholder data (swap with real Firestore counts later)
  const itemLimit = 250;
  const itemsUsed = 37;
  const locationLimit = 50;
  const locationsUsed = 6;

  const itemsProgress = Math.min(
    100,
    Math.round((itemsUsed / itemLimit) * 100),
  );
  const locationsProgress = Math.min(
    100,
    Math.round((locationsUsed / locationLimit) * 100),
  );

  useEffect(() => {
    const init = async () => {
      if (!user) return;

      const exists = await checkUserExists(user.uid);
      // If the user does not exist in the database, create a new user
      if (!exists) {
        await createUserIfNotExists({
          uid: user.uid,
          name: user.displayName || "Unnamed",
          email: user.email || "",
        });
      }

      const workspaces = (await getUserWorkspaces(user.uid)) as Workspace[];
      if (!workspaces || workspaces.length === 0) {
        setShowModal(true);
      } else {
        setWorkspaceName(workspaces[0].name);
      }

      setLoading(false);
    };

    init();
  }, [user]);

  if (loading) {
    return (
      <div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-gray-900 dark:text-gray-200">
      {showModal && (
        <CreateWorkspaceModal onClose={() => setShowModal(false)} />
      )}

      <div className="mx-auto w-full max-w-6xl px-4 py-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {workspaceName ? `Welcome to ${workspaceName}` : "Dashboard"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Quick overview of your inventory activity.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="default">Add item</Button>
            <Button variant="outline">Create location</Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Items</CardDescription>
              <CardTitle className="text-3xl">{itemsUsed}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{itemsUsed} used</span>
                <span>{itemLimit} limit</span>
              </div>
              <Progress value={itemsProgress} />
              <p className="text-xs text-muted-foreground">
                {itemsProgress}% of plan limit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Locations</CardDescription>
              <CardTitle className="text-3xl">{locationsUsed}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{locationsUsed} used</span>
                <span>{locationLimit} limit</span>
              </div>
              <Progress value={locationsProgress} />
              <p className="text-xs text-muted-foreground">
                {locationsProgress}% of plan limit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Low stock</CardDescription>
              <CardTitle className="text-3xl">3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Items flagged below minimum.
              </p>
              <div className="mt-3 grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="truncate">Shop rags</span>
                  <span className="text-muted-foreground">2 left</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="truncate">3&quot; deck screws</span>
                  <span className="text-muted-foreground">5 left</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="truncate">Nitrile gloves</span>
                  <span className="text-muted-foreground">1 box</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Activity</CardDescription>
              <CardTitle className="text-3xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Updates in the last 7 days.
              </p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <div className="leading-tight">
                    <p className="font-medium">Added 4 items</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 inline-block h-2 w-2 rounded-full bg-blue-500" />
                  <div className="leading-tight">
                    <p className="font-medium">Created 2 locations</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>
                This will become your audit log (items moved, qty changes,
                etc.).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      Moved “Impact driver” → Shop / Shelf A1
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Location
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      Updated qty: “Shop rags” (+12)
                    </p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Item</span>
                </div>

                <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      Created location “Rack B2”
                    </p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Location
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Setup checklist</CardTitle>
              <CardDescription>Finish these to get value fast.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>✅ Create a workspace</span>
                  <span className="text-xs text-muted-foreground">Done</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>⬜ Add your first location</span>
                  <Button size="sm" variant="outline">
                    Go
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>⬜ Add your first item</span>
                  <Button size="sm" variant="outline">
                    Go
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>⬜ Print a location QR</span>
                  <Button size="sm" variant="outline">
                    Go
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
