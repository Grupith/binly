"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  checkUserExists,
  createUserIfNotExists,
  getUserWorkspace,
} from "@/lib/firebase/users";
import { CreateWorkspaceModal } from "@/components/modals/CreateWorkspaceModal";

export default function Page() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!user) return;

      const exists = await checkUserExists(user.uid);
      if (!exists) {
        await createUserIfNotExists({
          uid: user.uid,
          name: user.displayName || "Unnamed",
          email: user.email || "",
        });
      }

      const workspace = await getUserWorkspace(user.uid);
      if (!workspace) {
        setShowModal(true);
      }

      setLoading(false);
    };

    init();
  }, [user]);

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-gray-200 p-4">
      {showModal && (
        <CreateWorkspaceModal onClose={() => setShowModal(false)} />
      )}
      <h1>Dashboard</h1>
      <p className="text-2xl font-bold">
        Welcome {user?.displayName || "unknown name"}
      </p>
    </div>
  );
}
