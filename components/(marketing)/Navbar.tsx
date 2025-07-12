"use client";

import React, { useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Factory, Menu, Stethoscope } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import logo from "@/public/images/BinlyLogoLarge.png";
import {
  Boxes,
  Building2,
  School,
  ShoppingCart,
  Warehouse,
  CheckCircle,
  QrCode,
  FileSpreadsheet,
  BellRing,
  ListTodo,
  History,
  Users,
} from "lucide-react";
import Image from "next/image";
import { auth, provider } from "@/app/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

const components = [
  {
    title: "Organizing",
    href: "/#feature-organizing",
    description: "Easily upload and organize your inventory by space or job.",
    icon: Boxes,
  },
  {
    title: "Smart Locations",
    href: "/#feature-locations",
    description: "Assign items to shelves, bins, or trucks for easy access.",
    icon: Warehouse,
  },
  {
    title: "Check In & Out",
    href: "/#feature-checkin",
    description: "Track usage and returns with due dates and logs.",
    icon: CheckCircle,
  },
  {
    title: "Barcode Scanning",
    href: "/#feature-barcodes",
    description: "Scan items with QR or barcode labels for quick access.",
    icon: QrCode,
  },
  {
    title: "CSV Import",
    href: "/#feature-bulk-entry",
    description: "Bulk upload your inventory from spreadsheets in seconds.",
    icon: FileSpreadsheet,
  },
  {
    title: "Smart Alerts",
    href: "/#feature-alerts",
    description: "Get notified about overdue items or low stock.",
    icon: BellRing,
  },
  {
    title: "Pick Lists",
    href: "/#feature-picklists",
    description: "Build and reuse material kits for jobs or repeat tasks.",
    icon: ListTodo,
  },
  {
    title: "Usage Logs",
    href: "/#feature-logs",
    description: "View item history by user, status, and job.",
    icon: History,
  },
  {
    title: "Role-Based Access",
    href: "/#feature-access",
    description: "Assign permissions by team role or workspace.",
    icon: Users,
  },
];

const industries = [
  {
    title: "Government",
    href: "/industries/government",
    description: "Track assets across departments with compliance in mind.",
    icon: Building2,
  },
  {
    title: "Construction",
    href: "/industries/construction",
    description: "Manage tools, gear, and job site inventory with ease.",
    icon: Warehouse,
  },
  {
    title: "Education",
    href: "/industries/education",
    description: "Keep tabs on school supplies, tech, and classroom gear.",
    icon: School,
  },
  {
    title: "Retail",
    href: "/industries/retail",
    description: "Organize backroom stock and store supplies for your team.",
    icon: ShoppingCart,
  },
  {
    title: "Healthcare",
    href: "/industries/healthcare",
    description:
      "Track medical kits, supplies, and mobile equipment across teams.",
    icon: Stethoscope, // or HeartPulse, Syringe, FirstAidKit, depending on your Lucide version
  },
  {
    title: "Manufacturing",
    href: "/industries/manufacturing",
    description: "Track tools, parts, and production gear across workstations.",
    icon: Factory, // Use a relevant Lucide icon here
  },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showIndustriesDropdown, setShowIndustriesDropdown] = useState(false);
  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const { theme, setTheme } = useTheme();
  const [darkMode, setDarkMode] = useState(theme === "dark");

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !(target as HTMLElement).closest("button[data-menu-toggle]")
      ) {
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

  // Function to handle Google login popup for quick access
  const handleGoogleLoginPopup = async () => {
    try {
      if (!auth) return;
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
    <nav
      aria-label="Navigation menu"
      className={cn(
        "w-full flex items-center justify-between md:justify-around px-6 py-4 border-b bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-transform duration-300 sticky top-0 z-50",
        { "-translate-y-full": !isVisible }
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src={logo}
          alt="binly logo"
          aria-label="Binly Logo"
          height={24}
          width={24}
          className="rounded-md mr-2"
        />
        <div className="text-2xl font-bold text-sky-600">Binly</div>
      </Link>
      {/* Nav Menu */}
      <div className="hidden md:flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about"
                className="px-4 py-2"
                aria-label="About"
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="dark:bg-gray-900"
                aria-label="Features"
                aria-expanded="false"
                aria-haspopup="true"
                aria-controls="desktop-features-dropdown"
                role="button"
              >
                Features
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  id="desktop-features-dropdown"
                  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                >
                  {components.map(({ title, href, description, icon }) => (
                    <ListItem
                      key={title}
                      title={title}
                      href={href}
                      className="bg-gray-50 dark:bg-gray-900 dark:border-gray-800 border border-gray-100 hover:bg-sky-50 dark:hover:bg-sky-900 transition"
                      icon={icon}
                      aria-label={title}
                    >
                      {description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="dark:bg-gray-900"
                aria-label="Industries"
                aria-expanded="false"
                aria-haspopup="true"
                aria-controls="desktop-industries-dropdown"
                role="button"
              >
                Industries
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  id="desktop-industries-dropdown"
                  className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                >
                  {industries.map(({ title, href, description, icon }) => (
                    <ListItem
                      key={title}
                      title={title}
                      href={href}
                      className="bg-gray-50 dark:bg-gray-900 dark:border-gray-800 border border-gray-100 hover:bg-sky-50 dark:hover:bg-sky-900/90 transition"
                      icon={icon}
                      aria-label={title}
                    >
                      {description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#pricing"
                className="px-4 py-2"
                aria-label="Pricing"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/blog"
                className="px-4 py-2"
                aria-label="Blog"
              >
                Blog
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#contact"
                className="px-4 py-2"
                aria-label="Contact"
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="md:hidden relative flex items-center">
        {mounted && (
          <Switch
            checked={darkMode}
            onCheckedChange={(checked) => setDarkMode(checked)}
            aria-label="Toggle dark mode"
            className="mr-3"
          />
        )}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="text-gray-600 focus:outline-none rounded-md  transition duration-200 ease-in-out p-2"
          data-menu-toggle
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6 dark:text-gray-100" />
        </button>
        <a
          href="/login"
          className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-200 hover:underline md:hidden"
          aria-label="Login"
        ></a>

        {mobileMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full right-2 mt-3 w-64 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg transition-all duration-200 ease-in-out md:hidden z-50"
          >
            <ul className="flex flex-col gap-3 px-4 py-6">
              <li>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                  aria-label="About"
                >
                  About
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setShowFeaturesDropdown(!showFeaturesDropdown)}
                  className="flex justify-between items-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                  aria-label="Features"
                  aria-expanded={showFeaturesDropdown}
                  aria-controls="mobile-features-dropdown"
                  role="button"
                >
                  Features
                  <span>{showFeaturesDropdown ? "▲" : "▼"}</span>
                </button>

                {showFeaturesDropdown && (
                  <ul
                    className="ml-4 mt-2 space-y-2"
                    id="mobile-features-dropdown"
                  >
                    {components.map(({ title, href }) => (
                      <li key={title}>
                        <Link
                          href={href.startsWith("#") ? `/${href}` : href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setShowFeaturesDropdown(false);
                          }}
                          className="block w-full text-left px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:underline"
                          aria-label={title}
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <button
                  onClick={() =>
                    setShowIndustriesDropdown(!showIndustriesDropdown)
                  }
                  className="flex justify-between items-center w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                  aria-label="Industries"
                  aria-expanded={showIndustriesDropdown}
                  aria-controls="mobile-industries-dropdown"
                  role="button"
                >
                  Industries
                  <span>{showIndustriesDropdown ? "▲" : "▼"}</span>
                </button>

                {showIndustriesDropdown && (
                  <ul
                    className="ml-4 mt-2 space-y-2"
                    id="mobile-industries-dropdown"
                  >
                    {industries.map(({ title, href }) => (
                      <li key={title}>
                        <Link
                          href={href.startsWith("#") ? `/${href}` : href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setShowIndustriesDropdown(false);
                          }}
                          className="block w-full text-left px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:underline"
                          aria-label={title}
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <Link
                  href="/#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                  aria-label="Pricing"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                  aria-label="Blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                  aria-label="Contact"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-700 transition"
                  aria-label="Login"
                >
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Right Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2">
          {mounted && (
            <Switch
              checked={darkMode}
              onCheckedChange={(checked) => setDarkMode(checked)}
              aria-label="Toggle dark mode"
              className="cursor-pointer"
            />
          )}
        </div>
        <Button
          variant="link"
          className="text-sm font-medium cursor-pointer"
          onClick={handleGoogleLoginPopup}
        >
          Login
        </Button>
        <Link href="/login">
          <Button
            variant="default"
            className="text-sm font-medium cursor-pointer"
          >
            Try now{" "}
          </Button>
        </Link>
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ComponentType<{ className?: string }>;
  }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sky-50 dark:hover:bg-sky-900 focus:bg-sky-100 dark:focus:bg-sky-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-500 focus:outline-none",
            className
          )}
          aria-label={title}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none text-gray-800 dark:text-white">
            {Icon && <Icon className="h-4 w-4 text-sky-600" />}
            {title}
          </div>
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
