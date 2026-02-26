import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, LayoutDashboard, Building2, DollarSign, FileText,
  Wrench, Search, Users, BarChart3, Handshake, Settings,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const navItems = [
  { to: '/manager', icon: Home, label: 'Home', end: true },
  { divider: true },
  { to: '/manager/dashboards', icon: LayoutDashboard, label: 'Dashboards' },
  { divider: true },
  { to: '/manager/properties', icon: Building2, label: 'Properties' },
  { to: '/manager/accounting', icon: DollarSign, label: 'Accounting' },
  { to: '/manager/leasing', icon: FileText, label: 'Leasing' },
  { to: '/manager/maintenance', icon: Wrench, label: 'Maintenance' },
  { to: '/manager/screening', icon: Search, label: 'Screening' },
  { to: '/manager/contacts', icon: Users, label: 'Contacts' },
  { to: '/manager/reports', icon: BarChart3, label: 'Reports' },
  { to: '/manager/crm', icon: Handshake, label: 'CRM' },
  { divider: true },
  { to: '/manager/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-brand-950 text-white flex flex-col transition-all duration-200 z-40 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-brand-900">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight">rentvine</span>
        )}
        {collapsed && (
          <span className="text-lg font-bold mx-auto">R</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item, i) => {
          if ('divider' in item) {
            return <div key={i} className="my-2 mx-3 border-t border-brand-900" />;
          }
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to!}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 mx-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-800 text-white'
                    : 'text-brand-200 hover:bg-brand-900 hover:text-white'
                } ${collapsed ? 'justify-center px-0' : ''}`
              }
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 flex items-center justify-center border-t border-brand-900 text-brand-300 hover:text-white transition-colors cursor-pointer"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
