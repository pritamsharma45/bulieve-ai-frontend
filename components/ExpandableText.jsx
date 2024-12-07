"use client";

import { useState, useRef, useEffect } from "react";

export default function ExpandableText({ text, maxLines = 3 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkHeight = () => {
      const element = textRef.current;
      if (element) {
        const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
        const maxHeight = lineHeight * maxLines;
        setShowButton(element.scrollHeight > maxHeight);
      }
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [text, maxLines]);

  return (
    <div>
      <p
        ref={textRef}
        className={`text-gray-600 dark:text-gray-300 ${
          !isExpanded 
            ? `overflow-hidden text-ellipsis ${maxLines === 3 ? 'line-clamp-3' : 'line-clamp-5'}`
            : ''
        }`}
      >
        {text}
      </p>
      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-600 text-sm mt-1 focus:outline-none"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
} 