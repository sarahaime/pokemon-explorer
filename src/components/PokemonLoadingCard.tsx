export const PokemonLoadingCard = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200/50 p-6 animate-pulse">
      <div className="h-36 bg-gray-300/50 rounded-xl mb-4"></div>
      <div className="h-6 bg-gray-300/50 rounded-lg mb-3"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-300/50 rounded-full w-16"></div>
        <div className="h-6 bg-gray-300/50 rounded-full w-20"></div>
      </div>
    </div>
  );
};