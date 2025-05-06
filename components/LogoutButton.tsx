// components/LogoutButton.tsx
"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase"; // adjust path if needed
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // or wherever you want to redirect after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Button onClick={handleLogout} className="w-full" variant="outline">
      Sign Out
    </Button>
  );
}
