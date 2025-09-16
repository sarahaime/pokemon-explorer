import { PokeballBackgroundIcon } from './icons';
import { LOADING_STYLES } from '../constants/loadingStyles';

export const PokemonDetailLoading = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="px-6 py-8 flex justify-center relative">
        <span className={`text-lg text-white opacity-80 absolute top-0 right-0 ${LOADING_STYLES.pulse}`}>
          <div className={`h-6 w-12 ${LOADING_STYLES.skeletonBgWhite} rounded`}></div>
        </span>
        <div className="absolute inset-0 flex items-start justify-end z-0">
          <PokeballBackgroundIcon width={300} height={300} />
        </div>
        <div className={`w-64 h-64 ${LOADING_STYLES.skeletonBgWhite} rounded-2xl ${LOADING_STYLES.pulse} relative z-10`}></div>
      </div>

      <div className="bg-gray-50 rounded-3xl min-h-96 px-6 py-6">
        <div className="flex gap-2 justify-center mb-6">
          <div className={`h-8 w-16 ${LOADING_STYLES.skeletonBg} rounded-full ${LOADING_STYLES.pulse}`}></div>
          <div className={`h-8 w-20 ${LOADING_STYLES.skeletonBg} rounded-full ${LOADING_STYLES.pulse}`}></div>
        </div>
        
        <div className="mb-8">
          <div className={`h-7 w-32 ${LOADING_STYLES.skeletonBg} rounded-lg mb-4 mx-auto ${LOADING_STYLES.pulse}`}></div>
          <div className="space-y-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`h-4 w-12 ${LOADING_STYLES.skeletonBg} rounded ${LOADING_STYLES.pulse}`}></div>
                <div className={`flex-1 h-2 ${LOADING_STYLES.skeletonBg} rounded-full ${LOADING_STYLES.pulse}`}></div>
                <div className={`h-4 w-8 ${LOADING_STYLES.skeletonBg} rounded ${LOADING_STYLES.pulse}`}></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={`h-7 w-20 ${LOADING_STYLES.skeletonBg} rounded-lg mb-4 ${LOADING_STYLES.pulse}`}></div>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className={`h-10 ${LOADING_STYLES.skeletonBg} rounded-lg ${LOADING_STYLES.pulse}`}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className={`h-10 w-32 ${LOADING_STYLES.skeletonBg} rounded-lg ${LOADING_STYLES.pulse}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
