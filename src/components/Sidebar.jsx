import { useState } from 'react';
import {
  Home, LayoutDashboard, Building2, DollarSign, FileText,
  Wrench, ShieldCheck, Users, BarChart3, Megaphone, Settings,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboards', label: 'Dashboards', icon: LayoutDashboard },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'accounting', label: 'Accounting', icon: DollarSign },
  { id: 'leasing', label: 'Leasing', icon: FileText },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'screening', label: 'Screening', icon: ShieldCheck },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'crm', label: 'CRM', icon: Megaphone },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeSection, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col bg-sidebar text-white transition-all duration-200 flex-shrink-0 ${
        collapsed ? 'w-[60px]' : 'w-[240px]'
      }`}
      style={{ height: '100%' }}
    >
      <div className={`flex items-center h-10 px-3 ${collapsed ? 'justify-center' : 'justify-end'}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-sidebar-hover text-gray-400 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors relative ${
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-gray-400 hover:bg-sidebar-hover hover:text-white'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-brand rounded-r" />
              )}
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className={`border-t border-white/10 p-3 ${collapsed ? 'text-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand text-xs font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Jane Doe</p>
              <p className="text-xs text-gray-500 truncate">ABC Property Mgmt</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-full bg-brand/20 flex items-center justify-center text-brand text-xs font-semibold">
            JD
          </div>
        )}
      </div>
    </aside>
  );
}
