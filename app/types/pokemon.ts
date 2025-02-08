// types/pokemon.ts

// ----- Pokémon Data Types -----

export interface PokemonType {
  slot: number; // The slot order of the type
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number; // Added property
  weight: number; // Added property
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
  // Add any additional properties returned by your API if needed.
}

// ----- Pokémon Species Data Types -----

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface EvolutionChainUrl {
  url: string;
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: EvolutionChainUrl;
  // Add other species properties as needed.
}
