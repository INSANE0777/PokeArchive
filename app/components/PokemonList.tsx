"use client";

import { useEffect, useState, useRef } from "react";
import { getPokemonList, getPokemon } from "../lib/api";
import { PokemonCard } from "./PokemonCard";
import { Pokemon } from "../types/pokemon";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

export function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      const genOffsets = {
        1: { offset: 0, limit: 151 },
        2: { offset: 151, limit: 100 },
        3: { offset: 251, limit: 135 },
        4: { offset: 386, limit: 107 },
        5: { offset: 493, limit: 156 },
        6: { offset: 649, limit: 72 },
        7: { offset: 721, limit: 88 },
        8: { offset: 809, limit: 96 },
        9: { offset: 905, limit: 105 },
      };

      const { offset, limit } =
        genOffsets[generation as keyof typeof genOffsets];
      const { results } = await getPokemonList(limit, offset);

      const pokemonData = await Promise.all(
        results.map((result: { name: string }) => getPokemon(result.name))
      );

      setPokemon(pokemonData);
      setLoading(false);
    }

    loadPokemon();
  }, [generation]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value as number, { duration: 0, easing: (t: number) => t })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [generation]);

  if (loading) {
    return (
      <div
        className={`${poppins.className} flex flex-col justify-center items-center min-h-screen bg-black`}
      >
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-500 mb-4"></div>
        <p className="text-white text-xl">Loading Pokémon...</p>
      </div>
    );
  }

  return (
    <div
      className={`${poppins.className} relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white`}
    >
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-8"
          >
            Pokémon Gallery
          </motion.h1>
          <div className="w-full overflow-x-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {Array.from({ length: 9 }, (_, i) => i + 1).map((gen) => (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  key={gen}
                  onClick={() => setGeneration(gen)}
                  className={`px-4 py-2 rounded-full ${
                    generation === gen
                      ? "bg-gray-700 text-white"
                      : "bg-gray-800 hover:bg-gray-600"
                  } transition-colors`}
                >
                  Gen {gen}
                </motion.button>
              ))}
            </motion.div>
          </div>
          <motion.div
            ref={containerRef}
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {pokemon.map((p, index) => (
              <PokemonCard key={p.id} pokemon={p} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}