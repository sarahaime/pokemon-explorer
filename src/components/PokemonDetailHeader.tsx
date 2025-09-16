import { HeartIcon, BackIcon } from "./icons";
import { LOADING_STYLES } from '../constants/loadingStyles';

interface PokemonDetailHeaderProps {
  pokemonName?: string;
  isLoading?: boolean;
  isFavorite: boolean;
  onBackClick: () => void;
  onFavoriteClick: () => void;
}

export const PokemonDetailHeader = ({
  pokemonName,
  isLoading = false,
  isFavorite,
  onBackClick,
  onFavoriteClick,
}: PokemonDetailHeaderProps) => {
  return (
    <div className="px-6 py-2 flex justify-between items-center max-w-7xl mx-auto">
      <div className="flex items-center gap-1">
        <button
          onClick={onBackClick}
          className="hover:scale-110 transition-transform duration-200 cursor-pointer"
        >
          <BackIcon />
        </button>
        <div>
          {isLoading ? (
            <div className={`h-9 w-32 ${LOADING_STYLES.skeletonBgWhite} rounded ${LOADING_STYLES.pulse}`}></div>
          ) : (
            <h1 className="text-3xl font-bold capitalize text-white">
              {pokemonName}
            </h1>
          )}
        </div>
      </div>
      <button
        onClick={onFavoriteClick}
        className="hover:scale-110 transition-transform duration-200 cursor-pointer"
      >
        <HeartIcon
          width={32}
          height={32}
          fillColor={isFavorite ? '#ef4444' : '#9ca3af'}
          filled={isFavorite}
        />
      </button>
    </div>
  );
};
