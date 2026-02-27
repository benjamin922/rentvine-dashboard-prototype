import { useState } from 'react';
import { Search, Sparkles, Bell, Command } from 'lucide-react';

export default function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-12 bg-sidebar flex items-center px-4 border-b border-white/10 flex-shrink-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 w-[200px]">
        <img src={`${import.meta.env.BASE_URL}assets/rentvine-logo-mark.png`} alt="Rentvine" className="h-5 w-5 object-contain" />
        <span className="text-white text-base font-semibold tracking-tight">
          rentvine
        </span>
      </div>

      {/* Search - centered */}
      <div className="flex-1 flex justify-center">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all w-[400px] ${
            searchFocused
              ? 'bg-white border-white/20'
              : 'bg-white/10 border-white/10 hover:bg-white/15'
          }`}
        >
          <Search size={14} className={searchFocused ? 'text-gray-400' : 'text-gray-400'} />
          <input
            type="text"
            placeholder="Search"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`flex-1 bg-transparent text-sm outline-none placeholder-gray-400 ${
              searchFocused ? 'text-gray-900' : 'text-gray-300'
            }`}
          />
          <kbd className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
            searchFocused
              ? 'text-gray-400 bg-gray-100 border-gray-200'
              : 'text-gray-500 bg-white/10 border-white/15'
          }`}>
            <span className="text-[9px]">⌘</span> K
          </kbd>
        </div>
      </div>

      {/* Right side - icons + avatar */}
      <div className="flex items-center gap-1 w-[200px] justify-end">
        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
          <Sparkles size={16} />
        </button>
        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-sidebar"></span>
        </button>
        <div className="ml-2 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs font-semibold">
            BN
          </div>
        </div>
      </div>
    </header>
  );
}
