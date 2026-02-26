import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import ChatWidget from "../chat/ChatWidget";

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarWidth = sidebarOpen ? 256 : 72;

  return (
    <div className="flex h-screen overflow-hidden bg-rv-nav-bg">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main area */}
      <div
        className="flex flex-col flex-1 min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Top bar */}
        <TopBar />

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-[20px] shadow-sm min-h-[calc(100vh-56px-48px)] p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
}
