import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-[#f5f6f6]">
      <Sidebar />
      <div className="ml-[220px] min-h-screen flex flex-col transition-all duration-200">
        <TopBar />
        <main className="flex-1 p-6">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
