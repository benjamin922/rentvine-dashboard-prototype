import { Search, Bell, ChevronRight } from 'lucide-react';
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
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm text-slate-500">
        {crumbs.map((crumb, i) => (
          <span key={crumb.path} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} className="text-slate-400" />}
            <span className={i === crumbs.length - 1 ? 'text-slate-900 font-medium' : ''}>
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent w-56"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-brand-800 text-white flex items-center justify-center text-sm font-medium">
          JR
        </div>
      </div>
    </header>
  );
}
