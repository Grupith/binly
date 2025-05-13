import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Binly Inventory",
  description:
    "Easily manage your inventory, tools, and workspaces with Binly.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Binly Inventory" />
        <meta name="apple-mobile-web-app-title" content="Binly Inventory" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="Binly Inventory" />
        <meta
          property="og:description"
          content="Easily manage your inventory, tools, and workspaces with Binly."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://binly.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body
        className={`${poppins.variable} antialiased overflow-x-hidden max-w-screen scroll-smooth dark:bg-gray-900`}
      >
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
