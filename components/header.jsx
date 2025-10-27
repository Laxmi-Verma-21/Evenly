"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import { Button } from "./ui/button";
import useStoreUser from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="w-full h-16 flex items-center justify-between px-4">
        {/* Logo  */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/evenlylogo.png"
            alt="Evenly Logo"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/*Nav links */}
        {path === "/" && (
          <div className="hidden md:flex items-center gap-10 text-gray-700">
            <Link
              href="#features"
              className="text-lg font-medium hover:text-[#4A9782] transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-lg font-medium hover:text-[#4A9782] transition-colors"
            >
              How It Works
            </Link>
          </div>
        )}

      
        <div className="flex items-center gap-4">
          <SignedIn>
            {/* Dashboard button for signed-in users */}
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition"
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Button>

              {/* Mobile icon */}
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>

            
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="ghost">Sign In</Button>
            </SignInButton>

            <SignUpButton>
              <Button className="bg-green-900 text-white hover:bg-green-700 border-none">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </nav>

      {isLoading && <BarLoader width="100%" color="#36d7b7" />}
    </header>
  );
};

export default Header;
