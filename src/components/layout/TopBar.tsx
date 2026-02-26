import { useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";

const routeLabels: Record<string, string> = {
  "/": "Dashboard",
  "/properties": "Properties",
  "/properties/list": "Properties",
  "/accounting": "Accounting",
  "/maintenance": "Maintenance",
  "/leasing": "Leasing",
  "/screening": "Screening",
  "/contacts": "Contacts",
  "/reports": "Reports",
  "/crm": "CRM",
  "/settings": "Settings",
};

export default function TopBar() {
  const location = useLocation();
  const currentLabel = routeLabels[location.pathname] ?? "Dashboard";

  return (
    <header
      className="flex items-center justify-between bg-white border-b border-rv-lightgray px-6 shrink-0"
      style={{ height: 56 }}
    >
      {/* Left: Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-rv-gray">Home</span>
        <span className="text-rv-gray">/</span>
        <span className="font-medium text-rv-blue-dark">{currentLabel}</span>
      </div>

      {/* Center: Search */}
      <div className="flex items-center max-w-md w-full mx-8">
        <div className="relative w-full">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-rv-gray"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 pl-9 pr-4 rounded-lg border border-rv-lightgray bg-rv-nav-bg text-sm text-rv-black placeholder:text-rv-gray focus:outline-none focus:border-rv-blue focus:ring-1 focus:ring-rv-blue"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-rv-nav-bg transition-colors">
          <Bell size={20} className="text-rv-blue-dark" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rv-red rounded-full" />
        </button>

        {/* User avatar */}
        <button className="flex items-center justify-center w-9 h-9 rounded-full bg-rv-blue-dark text-white text-sm font-semibold">
          BW
        </button>
      </div>
    </header>
  );
}
