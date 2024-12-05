"use client";

import Image from "next/image";
import Link from "next/link";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";
import { User, FileText, Settings, LogOut } from "lucide-react";

export default function TopBar() {
  const { isAuthenticated, user } = useKindeAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-2 shadow-lg z-50">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-8 h-8">
            <Image
              src="/bulieve-logo.jpeg"
              alt="Bulieve"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <span className="ml-2 font-semibold text-lg">Bulieve</span>
        </Link>

        <div className="relative">
          {isAuthenticated ? (
            <>
              <button
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors uppercase text-center"
              >
                {(user?.given_name?.[0] || user?.email?.[0] || "U").toUpperCase()}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.given_name || user?.email?.split('@')[0]}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <nav className="space-y-1 py-2">
                    <Link
                      href="/my-posts"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FileText className="h-4 w-4 mr-3" />
                      My Posts
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>

                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <LogoutLink className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 w-full">
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </LogoutLink>
                    </div>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-2">
              <LoginLink className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                Login
              </LoginLink>
              <RegisterLink className="px-4 py-2 text-sm bg-green-600 hover:bg-green-700 rounded-md transition-colors">
                Sign Up
              </RegisterLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
