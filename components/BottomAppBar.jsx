"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Flame,
  TrendingUp,
  Newspaper,
  Users,
  FileText,
  Files,
} from "lucide-react";

export default function BottomAppBar() {
  const pathname = usePathname();

  const getLinkClass = (path) => {
    const baseClass =
      "flex flex-col items-center cursor-pointer transition-colors duration-200";
    return `${baseClass} ${
      pathname === path ? "text-blue-500" : "text-gray-400 hover:text-gray-200"
    }`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 shadow-lg z-50">
      <nav className="flex justify-between px-2">
        <Link href="/hot-takes" className={getLinkClass("/hot-takes")}>
          <Flame className="h-6 w-6" />
          <span className="text-xs">Hot Takes</span>
        </Link>
        <Link href="/news" className={getLinkClass("/news")}>
          <Newspaper className="h-6 w-6" />
          <span className="text-xs">News Arena</span>
        </Link>
        <Link href="/stock-arena" className={getLinkClass("/stock-arena")}>
          <TrendingUp className="h-6 w-6" />
          <span className="text-xs">Stock Arena</span>
        </Link>
        <Link href="/communities" className={getLinkClass("/communities")}>
          <Users className="h-6 w-6" />
          <span className="text-xs">Communities</span>
        </Link>
      </nav>
    </footer>
  );
}
