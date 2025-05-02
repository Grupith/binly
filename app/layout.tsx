import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
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
        className={`${poppins.variable} antialiased overflow-x-hidden max-w-screen`}
      >
        {children}
      </body>
    </html>
  );
}
