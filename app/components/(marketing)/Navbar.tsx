"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Organizing",
    href: "#feature-organizing",
    description: "Easily upload and organize your inventory by space or job.",
  },
  {
    title: "Smart Locations",
    href: "#feature-locations",
    description: "Assign items to shelves, bins, or trucks for easy access.",
  },
  {
    title: "Check In & Out",
    href: "#feature-checkin",
    description: "Track usage and returns with due dates and logs.",
  },
  {
    title: "Barcode Scanning",
    href: "#feature-barcodes",
    description: "Scan items with QR or barcode labels for quick access.",
  },
  {
    title: "CSV Import",
    href: "#feature-bulk-entry",
    description: "Bulk upload your inventory from spreadsheets in seconds.",
  },
  {
    title: "Smart Alerts",
    href: "#feature-alerts",
    description: "Get notified about overdue items or low stock.",
  },
  {
    title: "Pick Lists",
    href: "#feature-picklists",
    description: "Build and reuse material kits for jobs or repeat tasks.",
  },
  {
    title: "Usage Logs",
    href: "#feature-logs",
    description: "View item history by user, status, and job.",
  },
  {
    title: "Role-Based Access",
    href: "#feature-access",
    description: "Assign permissions by team role or workspace.",
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "w-full flex items-center justify-between md:justify-around px-6 py-4 border-b bg-white transition-transform duration-300 sticky top-0 z-50",
        { "-translate-y-full": !isVisible }
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <div className="text-2xl font-bold text-sky-600">Binly</div>
      </Link>
      {/* Nav Menu */}
      <div className="hidden md:flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about"
                className={navigationMenuTriggerStyle()}
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/#pricing" className="px-4 py-2">
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/#contact" className="px-4 py-2">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="md:hidden relative flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-600 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
        <a
          href="/login"
          className="ml-4 text-sm font-medium text-gray-700 hover:underline md:hidden"
        ></a>
        <Button variant="outline">Login</Button>
        {mobileMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full right-4 mt-2 w-64 rounded-md border bg-white shadow-md md:hidden z-50"
          >
            <ul className="flex flex-col gap-2 p-4">
              <li>
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:underline"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:underline"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-gray-700 hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Right Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <a href="/login" className="text-sm font-medium hover:underline">
          Login
        </a>
        <a
          href="/get-started"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
