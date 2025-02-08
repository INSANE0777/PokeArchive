"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      // Try to interpret the search query as a Pokémon index (number)
      const id = Number(trimmedQuery);
      if (!isNaN(id) && id >= 1 && id <= 1010) {
        router.push(`/pokemon/${id}`);
      } else {
        alert("Please enter a valid Pokémon index between 1 and 1010.");
      }
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`${poppins.className} fixed w-full z-50 bg-black shadow-lg`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              {/* Insert your logo or image here if needed */}
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              PokéArchive
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search Pokémon by index..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="text-gray-400 hover:text-white transition duration-300" />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search Pokémon by index..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-300"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="text-gray-400 hover:text-white transition duration-300" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
