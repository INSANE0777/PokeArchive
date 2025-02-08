export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: PokemonStat[];
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  species: {
    url: string;
  };
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}