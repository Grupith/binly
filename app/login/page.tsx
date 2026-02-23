"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInButton from "@/components/(marketing)/SignInButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import Link from "next/link";

const Login = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 px-4">
        <Card className="w-full max-w-sm shadow-lg dark:bg-slate-900">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Join
              <Link href="/" className="ml-2 hover:underline">
                Binly
              </Link>
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-muted-foreground dark:text-gray-400">
              Binly is currently in beta. Sign in with Google to continue. More
              providers coming soon!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInButton />
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground justify-center dark:text-gray-500">
            By continuing, you agree to our Terms and Privacy Policy.
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;
