"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ onSearch, placeholder }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder || "Search communities..."}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
} 