"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Poppins } from "next/font/google";
import { Pokemon, PokemonSpecies } from "../app/types/pokemon";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

interface PokemonDetailProps {
  pokemon: Pokemon;
  species: PokemonSpecies;
  evolutionChain: any;
}

export default function PokemonDetail({
  pokemon,
  species,
  evolutionChain,
}: PokemonDetailProps) {
  const [showShiny, setShowShiny] = useState(false);

  const description = species.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  )?.flavor_text.replace(/\f/g, " ");

  // Helper function to extract the Pokémon ID from a species URL.
  const getPokemonId = (url: string): string => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  // Recursive function to render the evolution chain with images.
  // It uses the showShiny flag to choose between default and shiny images.
  const renderEvolutionChain = (chain: any): JSX.Element => {
    const id = getPokemonId(chain.species.url);
    const imageUrl = showShiny
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
      : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <div className="flex flex-col items-center">
          <Image
            src={imageUrl}
            alt={chain.species.name}
            width={96}
            height={96}
            className="object-contain rounded-full border-2 border-gray-700"
          />
          <span className="capitalize font-bold mt-2">{chain.species.name}</span>
        </div>
        {chain.evolves_to && chain.evolves_to.length > 0 && (
          <>
            <span className="mx-4 text-2xl">→</span>
            <div className="flex items-center space-x-4">
              {chain.evolves_to.map((next: any, index: number) => (
                <React.Fragment key={index}>
                  {renderEvolutionChain(next)}
                  {index < chain.evolves_to.length - 1 && (
                    <span className="mx-2 text-xl">/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </motion.div>
    );
  };

  // Choose the main image based on the showShiny flag.
  const mainImage = showShiny
    ? pokemon.sprites.other["official-artwork"].front_shiny
    : pokemon.sprites.other["official-artwork"].front_default;

  return (
    <div className={`${poppins.className} min-h-screen bg-black py-8 text-white`}>
      <div className="container mx-auto px-4">
        {/* Back to Pokédex Link */}
        <Link href="/" className="inline-flex items-center space-x-2 mb-8">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <ArrowLeft className="w-6 h-6" />
          </motion.div>
          <div className="relative inline-block">
            <motion.span
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
              className="text-base sm:text-xl font-bold"
            >
              Back to Pokédex
            </motion.span>
            <motion.div
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 -bottom-1 h-0.5 bg-white"
            />
          </div>
        </Link>

        {/* Toggle Buttons for Default vs. Shiny */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => setShowShiny(false)}
            className={`px-3 sm:px-4 py-2 rounded-full ${
              !showShiny ? "bg-gray-700" : "bg-gray-800"
            } transition-colors text-sm sm:text-base`}
          >
            Default
          </button>
          <button
            onClick={() => setShowShiny(true)}
            className={`px-3 sm:px-4 py-2 rounded-full ${
              showShiny ? "bg-gray-700" : "bg-gray-800"
            } transition-colors text-sm sm:text-base`}
          >
            Shiny
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:gap-8 sm:p-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square"
            >
              <Image
                src={mainImage}
                alt={pokemon.name}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <div>
              <div className="mb-6">
                <p className="text-gray-300 text-lg sm:text-xl mb-2">
                  #{pokemon.id.toString().padStart(3, "0")}
                </p>
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold capitalize mb-4"
                >
                  {pokemon.name}
                </motion.h1>
                <p className="text-gray-400 text-sm sm:text-base">{description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Height</h2>
                  <p className="text-base">{pokemon.height / 10} m</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Weight</h2>
                  <p className="text-base">{pokemon.weight / 10} kg</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Abilities</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <motion.span
                      key={ability.ability.name}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                    >
                      {ability.ability.name}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Stats</h2>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize text-sm sm:text-base">
                          {stat.stat.name}
                        </span>
                        <span className="text-sm sm:text-base">{stat.base_stat}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full">
                        <motion.div
                          style={{
                            width: `${(stat.base_stat / 255) * 100}%`,
                          }}
                          className="h-full bg-white rounded-full"
                          whileHover={{ backgroundColor: "#d1d5db" }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evolution Chain Section */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Evolution Chain</h2>
                {evolutionChain && evolutionChain.chain ? (
                  <div className="overflow-x-auto">
                    {renderEvolutionChain(evolutionChain.chain)}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    No evolution data available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
