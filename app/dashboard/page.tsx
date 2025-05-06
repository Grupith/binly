"use client";
import { useAuth } from "@/contexts/AuthContext";

export default function Page() {
  const { user } = useAuth();
  return (
    <div className=" dark:bg-gray-900 dark:text-gray-200">
      <h1>Dashboard</h1>
      <p className="text-2xl font-bold">
        Welcome {user?.displayName || "unknown name"}
      </p>
    </div>
  );
}
