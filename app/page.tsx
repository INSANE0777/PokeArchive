import { PokemonList } from "./components/PokemonList";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16">
        <PokemonList />
      </div>
    </main>
  );
}
