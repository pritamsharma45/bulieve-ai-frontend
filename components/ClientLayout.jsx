"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "@/utils/analytics";
import BottomAppBar from "./BottomAppBar";
import TopBar from "./TopBar";
import GoogleAnalytics from "./GoogleAnalytics";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    if (pathname) {
      gtag("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);

  return (
    <>
      <GoogleAnalytics />
      <TopBar />
      <main className="flex-grow pt-16 pb-20">{children}</main>
      <BottomAppBar />
    </>
  );
}
