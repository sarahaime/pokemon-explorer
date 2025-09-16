import { Link, useLocation } from 'react-router-dom';
import { PokeballIcon, HeartIcon } from '../components/icons';

export const TopBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-red-600 shadow-lg sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <PokeballIcon 
                width={32} 
                height={32} 
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <h1 className="text-2xl font-bold text-white group-hover:text-red-100 transition-colors duration-200 font-poppins">
                Pokéxplorer
              </h1>
            </Link>
          </div>

          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-white  text-sm font-medium transition-all duration-200 hover:text-red-100 hover:bg-red-400 hover:bg-opacity-20 ${
                currentPath === '/' 
                  ? 'border-b-2 border-white bg-red-500' 
                  : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className={`flex items-center space-x-2 px-3 py-2 text-white rounded-md text-sm font-medium transition-all duration-200 group hover:text-red-100 hover:bg-red-400 hover:bg-opacity-20 ${
                currentPath === '/favorites' 
                  ? 'border-b-2 border-white bg-red-500' 
                  : ''
              }`}
            >
              <HeartIcon 
                width={20} 
                height={20} 
                className={`transition-transform duration-200 ${
                  currentPath === '/favorites' ? '' : 'group-hover:scale-110'
                }`}
              />
              <span>Favs</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};