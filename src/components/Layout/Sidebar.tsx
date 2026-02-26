import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, LayoutDashboard, Building2, DollarSign, FileText,
  Wrench, Search, Users, BarChart3, Handshake, Settings,
  ChevronLeft, ChevronRight, Sparkles, LogOut,
} from 'lucide-react';

interface NavItem {
  to: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  end?: boolean;
}

interface NavDivider {
  divider: true;
}

type NavEntry = NavItem | NavDivider;

const navItems: NavEntry[] = [
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

function RentvineIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 118 177" width={size} height={size * 1.5}>
      <path
        d="M59,0l53.4,53.4c3.59,3.59,5.6,8.45,5.6,13.52v51.08l-59-59V0Z"
        fill="#00A54F"
      />
      <path
        d="M59,59L5.6,112.4c-3.59,3.59-5.6,8.45-5.6,13.52v51.08l53.4-53.4c3.59-3.59,5.6-8.45,5.6-13.52V59Z"
        fill="#00A54F"
      />
    </svg>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-brand-950 text-white flex flex-col transition-all duration-200 z-40 ${
        collapsed ? 'w-[60px]' : 'w-[220px]'
      }`}
    >
      {/* Logo */}
      <div className="h-[56px] flex items-center gap-2.5 px-4 shrink-0">
        <RentvineIcon size={collapsed ? 18 : 20} />
        {!collapsed && (
          <span className="text-[15px] font-bold tracking-tight text-white">
            rentvine
          </span>
        )}
      </div>

      {/* AI Assistant Button */}
      {!collapsed ? (
        <div className="px-3 mb-2">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-brand-800/60 to-brand-700/40 border border-brand-500/20 text-white/90 text-[13px] font-medium hover:from-brand-800/80 hover:to-brand-700/60 transition-all cursor-pointer">
            <Sparkles size={14} className="text-brand-400" />
            <span>AI Assistant</span>
          </button>
        </div>
      ) : (
        <div className="px-2 mb-2">
          <button className="w-full flex items-center justify-center p-2 rounded-lg bg-gradient-to-r from-brand-800/60 to-brand-700/40 border border-brand-500/20 hover:from-brand-800/80 hover:to-brand-700/60 transition-all cursor-pointer">
            <Sparkles size={14} className="text-brand-400" />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-1">
        {navItems.map((item, i) => {
          if ('divider' in item) {
            return (
              <div
                key={`divider-${i}`}
                className="my-1.5 mx-3 border-t border-white/[0.06]"
              />
            );
          }
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative flex items-center gap-3 mx-2 rounded-lg text-[13px] font-medium transition-colors ${
                  collapsed ? 'justify-center px-0 py-2' : 'px-3 py-2'
                } ${
                  isActive
                    ? 'bg-brand-500/15 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[18px] bg-brand-400 rounded-r-full" />
                  )}
                  <Icon size={18} />
                  {!collapsed && <span>{item.label}</span>}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-3 pb-2">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
              JR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white/90 truncate">
                Jessica Rivera
              </p>
              <p className="text-[10px] text-white/40 truncate">
                ABC Property Mgmt
              </p>
            </div>
            <LogOut size={14} className="text-white/30 hover:text-white/60 shrink-0" />
          </div>
        ) : (
          <div className="flex justify-center py-2">
            <div className="w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center text-[11px] font-bold cursor-pointer">
              JR
            </div>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 flex items-center justify-center border-t border-white/[0.06] text-white/30 hover:text-white/60 transition-colors cursor-pointer shrink-0"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
