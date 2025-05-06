"use client";
import { useAuth } from "@/contexts/AuthContext";

export default function Page() {
  const { user } = useAuth();
  return (
    <div className="p-4 dark:bg-gray-900 dark:text-gray-200">
      <h1>Welcome to the Dashboard, {user?.displayName || user?.email}!</h1>
    </div>
  );
}
