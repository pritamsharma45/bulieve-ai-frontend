"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, FacebookIcon, Twitter, Send } from "lucide-react";

export default function ShareMenu({ url, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrls, setShareUrls] = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    // Set up share URLs after component mounts (client-side only)
    setShareUrls({
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${title} ${url}`
      )}`,
    });
  }, [url, title]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShare = (platform) => {
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 cursor-pointer hover:text-gray-700 transition-colors"
      >
        <Share2 className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 min-w-[150px]">
          <button
            onClick={() => handleShare("facebook")}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FacebookIcon className="h-4 w-4 mr-3" />
            Facebook
          </button>
          <button
            onClick={() => handleShare("twitter")}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Twitter className="h-4 w-4 mr-3" />
            Twitter
          </button>
          <button
            onClick={() => handleShare("whatsapp")}
            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Send className="h-4 w-4 mr-3" />
            WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
