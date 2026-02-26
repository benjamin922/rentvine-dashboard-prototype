import { Search, Bell, ChevronRight, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const breadcrumbMap: Record<string, string> = {
  '/manager': 'Home',
  '/manager/properties': 'Properties',
  '/manager/properties/list': 'All Properties',
  '/manager/accounting': 'Accounting',
  '/manager/maintenance': 'Maintenance',
  '/manager/dashboards': 'Dashboards',
  '/manager/dashboards/canvas': 'Dashboard Canvas',
  '/manager/leasing': 'Leasing',
  '/manager/screening': 'Screening',
  '/manager/contacts': 'Contacts',
  '/manager/reports': 'Reports',
  '/manager/crm': 'CRM',
  '/manager/settings': 'Settings',
};

export default function TopBar() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const crumbs: { label: string; path: string }[] = [];

  let currentPath = '';
  for (const segment of pathSegments) {
    currentPath += `/${segment}`;
    const label = breadcrumbMap[currentPath];
    if (label) {
      crumbs.push({ label, path: currentPath });
    }
  }

  return (
    <header className="h-[56px] bg-white border-b border-slate-200/80 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm text-slate-500">
        {crumbs.map((crumb, i) => (
          <span key={crumb.path} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight size={14} className="text-slate-300" />
            )}
            <span
              className={
                i === crumbs.length - 1
                  ? 'text-slate-900 font-semibold'
                  : 'text-slate-400'
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500/40 placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* AI Sparkles Button */}
        <button className="p-2 rounded-lg bg-brand-500 text-white hover:bg-brand-600 transition-colors cursor-pointer shadow-sm">
          <Sparkles size={16} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
          <Bell size={18} className="text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center text-[11px] font-bold cursor-pointer">
          JR
        </div>
      </div>
    </header>
  );
}
