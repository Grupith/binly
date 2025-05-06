// components/SignInButton.tsx
"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/app/firebase"; // Adjust the import path as necessary
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SignInButton() {
  const router = useRouter();
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in:", user.displayName);
      router.push("/dashboard"); // Redirect to the dashboard after sign-in
      // You can now store user info in Firestore or context
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return (
    <Button onClick={handleSignIn} className="w-full" variant="outline">
      Sign in with Google
    </Button>
  );
}
