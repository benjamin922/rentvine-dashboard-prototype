import { Link } from 'react-router-dom';
import { Plus, Share2, Wrench, Calculator, Key, BarChart3 } from 'lucide-react';
import { userDashboards, dashboardTemplates } from '../../data/dashboards';

const templateIcons: Record<string, typeof Wrench> = {
  wrench: Wrench,
  calculator: Calculator,
  key: Key,
  'bar-chart-3': BarChart3,
};

export default function DashboardManager() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboards</h1>
          <p className="text-sm text-slate-500 mt-1">Custom dashboards and KPI views</p>
        </div>
        <Link
          to="/manager/dashboards/canvas"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          Create New Dashboard
        </Link>
      </div>

      {/* My Dashboards */}
      <section>
        <h2 className="text-sm font-semibold text-slate-900 mb-3">My Dashboards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userDashboards.map((d) => (
            <Link
              key={d.id}
              to="/manager/dashboards/canvas"
              className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-4 hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">
                  {d.name}
                </h3>
                {d.shared && (
                  <Share2 size={14} className="text-slate-400 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-400">
                Last modified: {d.lastModified}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section>
        <h2 className="text-sm font-semibold text-slate-900 mb-3">Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardTemplates.map((t) => {
            const Icon = templateIcons[t.icon] || BarChart3;
            return (
              <Link
                key={t.id}
                to="/manager/dashboards/canvas"
                className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-4 hover:border-brand-300 hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="p-2 rounded-lg bg-brand-50 text-brand-700 w-fit mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-brand-700 transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{t.description}</p>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-brand-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-lg bg-brand-600 text-white text-xs font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Use Template
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
