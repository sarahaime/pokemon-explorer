import { PokemonList } from "../components/PokemonList";
import { PokemonListItem } from "../types/pokemon";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  
  const handlePokemonClick = (pokemon: PokemonListItem) => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <div className="h-full overflow-hidden">
      <PokemonList onPokemonClick={handlePokemonClick} />
    </div>
  );
};