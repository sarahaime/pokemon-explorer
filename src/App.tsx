
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { PokemonDetailPage } from './pages/PokemonDetailPage';
import { MainLayout } from './layouts/MainLayout';

function App() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-200 to-gray-100">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="pokemon/:name" element={<PokemonDetailPage />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
