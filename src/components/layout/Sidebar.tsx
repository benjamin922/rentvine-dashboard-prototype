import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Building2,
  DollarSign,
  FileText,
  Wrench,
  Shield,
  Users,
  FileBarChart,
  Target,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

const navItems: NavItem[] = [
  { label: "Home", icon: LayoutDashboard, to: "/" },
  { label: "Dashboards", icon: BarChart3, to: "/" },
  { label: "Properties", icon: Building2, to: "/properties" },
  { label: "Accounting", icon: DollarSign, to: "/accounting" },
  { label: "Leasing", icon: FileText, to: "/leasing" },
  { label: "Maintenance", icon: Wrench, to: "/maintenance" },
  { label: "Screening", icon: Shield, to: "/screening" },
  { label: "Contacts", icon: Users, to: "/contacts" },
  { label: "Reports", icon: FileBarChart, to: "/reports" },
  { label: "CRM", icon: Target, to: "/crm" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const sidebarWidth = isOpen ? 256 : 72;

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col bg-rv-nav-bg z-30 transition-all duration-300"
      style={{ width: sidebarWidth }}
    >
      {/* Logo */}
      <div
        className="flex items-center shrink-0 px-4"
        style={{ height: 56 }}
      >
        {isOpen ? (
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-rv-blue-dark tracking-tight">
              Rent
            </span>
            <span className="text-xl font-bold text-rv-blue-dark tracking-tight">
              vine
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-rv-green -mt-2" />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <span className="text-xl font-bold text-rv-blue-dark">R</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rv-green -mt-2" />
          </div>
        )}
      </div>

      {/* Company selector */}
      {isOpen && (
        <div className="px-3 mb-2">
          <button className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-rv-blue-dark hover:bg-rv-blue-hover transition-colors">
            <span className="truncate font-medium">ABC Property Mgmt</span>
            <ChevronDown size={14} className="shrink-0 ml-1" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-1">
        <ul className="flex flex-col gap-0.5">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl transition-colors",
                    isOpen ? "px-3 py-2.5" : "justify-center p-0",
                    isActive
                      ? "bg-rv-blue-hover text-rv-blue-dark font-medium"
                      : "text-rv-blue-dark hover:bg-rv-blue-hover",
                  ].join(" ")
                }
                style={
                  !isOpen
                    ? { width: 48, height: 48, borderRadius: 16 }
                    : undefined
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={20}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                    {isOpen && (
                      <span className="text-sm truncate">{item.label}</span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Toggle button */}
      <div className="px-3 py-3 shrink-0">
        <button
          onClick={onToggle}
          className={[
            "flex items-center justify-center rounded-xl text-rv-blue-dark hover:bg-rv-blue-hover transition-colors",
            isOpen ? "w-full py-2.5 gap-2" : "w-12 h-12 mx-auto",
          ].join(" ")}
          style={!isOpen ? { borderRadius: 16 } : undefined}
        >
          {isOpen ? (
            <>
              <ChevronLeft size={18} />
              <span className="text-sm">Collapse</span>
            </>
          ) : (
            <ChevronRight size={18} />
          )}
        </button>
      </div>
    </aside>
  );
}
