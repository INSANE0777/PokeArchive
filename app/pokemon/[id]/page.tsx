// /app/pokemon/[id]/page.tsx

import { getPokemon, getPokemonSpecies, getEvolutionChain } from '../../lib/api';
import { Pokemon, PokemonSpecies } from '../../types/pokemon';
import PokemonDetail from '../../../components/PokemonDetail';

interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  // Fetch Pokémon data based on the id from the URL
  const pokemon: Pokemon = await getPokemon(params.id);
  const species: PokemonSpecies = await getPokemonSpecies(params.id);

  // Fetch the evolution chain using the URL provided in the species data
  const evolutionChain = await getEvolutionChain(species.evolution_chain.url);

  return (
    <PokemonDetail
      pokemon={pokemon}
      species={species}
      evolutionChain={evolutionChain}
    />
  );
}

export async function generateStaticParams() {
  // Generate parameters for Pokémon IDs 1 through 1010 for static generation
  const totalPokemon = 1010;
  return Array.from({ length: totalPokemon }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}
