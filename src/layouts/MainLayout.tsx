import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';

export const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};
