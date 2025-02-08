"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pokemon } from "../types/pokemon";
import Image from "next/image";
import Link from "next/link";
import { Heart, Swords, Shield, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

const typeColors = {
  normal: "bg-gray-400 hover:bg-gray-500",
  fire: "bg-red-500 hover:bg-red-600",
  water: "bg-blue-500 hover:bg-blue-600",
  electric: "bg-yellow-400 hover:bg-yellow-500",
  grass: "bg-green-500 hover:bg-green-600",
  ice: "bg-blue-200 hover:bg-blue-300",
  fighting: "bg-red-700 hover:bg-red-800",
  poison: "bg-purple-500 hover:bg-purple-600",
  ground: "bg-yellow-600 hover:bg-yellow-700",
  flying: "bg-indigo-400 hover:bg-indigo-500",
  psychic: "bg-pink-500 hover:bg-pink-600",
  bug: "bg-lime-500 hover:bg-lime-600",
  rock: "bg-yellow-800 hover:bg-yellow-900",
  ghost: "bg-purple-700 hover:bg-purple-800",
  dragon: "bg-indigo-700 hover:bg-indigo-800",
  dark: "bg-gray-800 hover:bg-gray-900",
  steel: "bg-gray-500 hover:bg-gray-600",
  fairy: "bg-pink-300 hover:bg-pink-400",
};

const StatBar = ({
  value,
  maxValue,
  color,
}: {
  value: number;
  maxValue: number;
  color: string;
}) => (
  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${(value / maxValue) * 100}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`h-full ${color}`}
    />
  </div>
);

export function PokemonCard({ pokemon, index }: { pokemon: Pokemon; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get the primary type's color and extract a base color name for glow effects.
  const mainType = pokemon.types[0].type.name as keyof typeof typeColors;
  const rawColor = typeColors[mainType].split(" ")[0].replace("bg-", ""); // e.g. "red-500"
  const baseColor = rawColor.split("-")[0]; // e.g. "red"

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${poppins.className} relative bg-gradient-to-br from-gray-800 to-black rounded-lg overflow-hidden transition-all duration-300 ${
        isHovered ? `shadow-2xl shadow-${baseColor}-500/20` : "shadow-lg"
      }`}
    >
      {/* Favorite Toggle Button - Moved to the top-left */}
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setIsFavorite(!isFavorite);
        }}
        className="absolute top-2 left-2 z-20 cursor-pointer"
      >
        {isFavorite ? (
          <Heart className="w-6 h-6 text-red-500" />
        ) : (
          <Heart className="w-6 h-6 text-gray-400" />
        )}
      </motion.div>

      {/* Glowing overlay behind the card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.2, scale: 1.05 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent blur-xl z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <Link href={`/pokemon/${pokemon.id}`}>
        <div className="p-4 relative z-10">
          {/* Sparkle and colored overlay effects on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-2 right-2"
                >
                  <Sparkles className="w-6 h-6 text-blue-300 animate-pulse" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  exit={{ opacity: 0 }}
                  className={`absolute inset-0 bg-gradient-to-br from-${baseColor}-700/20 to-${baseColor}-700/40`}
                />
              </>
            )}
          </AnimatePresence>

          <div className="relative w-full aspect-square mb-4">
            {/* Removed image animation by using a plain div */}
            <div className="w-full h-full relative">
              <Image
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                fill
                className="object-contain z-10 drop-shadow-xl"
                priority={index < 8}
              />
            </div>
          </div>

          <div className="text-center">
            <motion.p
              initial={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              className="text-gray-300 text-sm mb-1"
            >
              #{pokemon.id.toString().padStart(3, "0")}
            </motion.p>

            <motion.h2
              className="text-xl font-bold capitalize mb-2 text-white"
              whileHover={{ scale: 1.05 }}
            >
              {pokemon.name}
            </motion.h2>

            <div className="flex gap-2 justify-center mb-3">
              {pokemon.types.map((type) => (
                <motion.span
                  key={type.type.name}
                  whileHover={{ scale: 1.1 }}
                  className={`${typeColors[type.type.name as keyof typeof typeColors]} text-white px-3 py-1 rounded-full text-sm transition-colors duration-200 shadow-md`}
                >
                  {type.type.name}
                </motion.span>
              ))}
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  variants={statsVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-2 px-2"
                >
                  <motion.div className="flex items-center gap-2" variants={statsVariants}>
                    <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                    <StatBar value={pokemon.stats[0].base_stat} maxValue={255} color="bg-red-500" />
                  </motion.div>
                  <motion.div className="flex items-center gap-2" variants={statsVariants}>
                    <Swords className="w-4 h-4 text-orange-500 animate-pulse" />
                    <StatBar value={pokemon.stats[1].base_stat} maxValue={255} color="bg-orange-500" />
                  </motion.div>
                  <motion.div className="flex items-center gap-2" variants={statsVariants}>
                    <Shield className="w-4 h-4 text-blue-500 animate-pulse" />
                    <StatBar value={pokemon.stats[2].base_stat} maxValue={255} color="bg-blue-500" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
