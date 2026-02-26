import { Plus, MoreHorizontal, Share2 } from 'lucide-react';
import { useState } from 'react';

interface SavedView {
  id: string;
  name: string;
  isDefault: boolean;
  isShared: boolean;
}

interface ViewTabsProps {
  views: SavedView[];
  activeView: string;
  onViewChange: (id: string) => void;
}

export default function ViewTabs({ views, activeView, onViewChange }: ViewTabsProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {views.map((view) => (
        <div key={view.id} className="relative flex items-center">
          <button
            onClick={() => onViewChange(view.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              activeView === view.id
                ? 'bg-brand-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {view.name}
            {view.isShared && <Share2 size={11} className="opacity-60" />}
          </button>
          <button
            onClick={() => setMenuOpen(menuOpen === view.id ? null : view.id)}
            className="p-1 rounded hover:bg-slate-100 -ml-0.5 cursor-pointer"
          >
            <MoreHorizontal size={14} className="text-slate-400" />
          </button>
          {menuOpen === view.id && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg border border-slate-200 shadow-lg py-1 z-20 min-w-36">
              <button className="w-full text-left text-sm px-3 py-1.5 hover:bg-slate-50 text-slate-700 cursor-pointer">Rename</button>
              <button className="w-full text-left text-sm px-3 py-1.5 hover:bg-slate-50 text-slate-700 cursor-pointer">Duplicate</button>
              <button className="w-full text-left text-sm px-3 py-1.5 hover:bg-slate-50 text-slate-700 cursor-pointer">Set as Default</button>
              {!view.isDefault && (
                <button className="w-full text-left text-sm px-3 py-1.5 hover:bg-slate-50 text-red-600 cursor-pointer">Delete</button>
              )}
            </div>
          )}
        </div>
      ))}
      <button className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer">
        <Plus size={14} />
        Save View
      </button>
    </div>
  );
}
