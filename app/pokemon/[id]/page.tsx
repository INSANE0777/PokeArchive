import { getPokemon, getPokemonSpecies, getEvolutionChain } from '../../lib/api';
import { Pokemon, PokemonSpecies } from '../../types/pokemon';
import PokemonDetail from '../../../components/PokemonDetail';

export default async function PokemonDetailPage({ params }: { params: { id: string } }) {
  const pokemon: Pokemon = await getPokemon(params.id);
  const species: PokemonSpecies = await getPokemonSpecies(params.id);
  
  // Use the evolution chain URL from species data to fetch evolution chain details
  const evolutionChain = await getEvolutionChain(species.evolution_chain.url);

  return <PokemonDetail pokemon={pokemon} species={species} evolutionChain={evolutionChain} />;
}

export async function generateStaticParams() {
  // Generate parameters for Pokémon IDs 1 through 1010
  const totalPokemon = 1010;
  return Array.from({ length: totalPokemon }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}
