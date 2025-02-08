import axios from 'axios';
import { Pokemon, PokemonSpecies } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit: number = 151, offset: number = 0) {
  const response = await axios.get(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
}

export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  const response = await axios.get(`${API_BASE_URL}/pokemon/${nameOrId}`);
  return response.data;
}

export async function getPokemonSpecies(nameOrId: string | number): Promise<PokemonSpecies> {
  const response = await axios.get(`${API_BASE_URL}/pokemon-species/${nameOrId}`);
  return response.data;
}

// New function to get the evolution chain using the evolution chain URL provided in species data.
export async function getEvolutionChain(url: string) {
  const response = await axios.get(url);
  return response.data;
}
