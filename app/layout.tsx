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
    <html
      lang="en"
      suppressHydrationWarning
      className="bg-white dark:bg-gray-900"
    >
      <head>
        <link rel="icon" href="/images/logo.png" />
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
