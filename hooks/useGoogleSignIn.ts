"use client";
import { auth, provider } from "@/app/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export function useGoogleSignIn() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      if (!auth) return;
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in:", user.displayName);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  return { signInWithGoogle };
}
