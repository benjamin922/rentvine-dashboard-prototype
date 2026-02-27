import { useState } from 'react';
import { Plus, LayoutGrid, Clock, Share2, MoreHorizontal, ArrowRight, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { dashboardTemplates, userDashboards } from '../data/dashboards';

function DashboardCard({ dashboard, onOpen }) {
  return (
    <div
      className="bg-white rounded-lg border border-border p-4 hover:border-brand/40 hover:shadow-sm transition-all cursor-pointer group"
      onClick={() => onOpen(dashboard.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center">
          <LayoutGrid size={18} className="text-brand" />
        </div>
        <button className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all">
          <MoreHorizontal size={14} className="text-text-secondary" />
        </button>
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">{dashboard.name}</h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-3">{dashboard.description}</p>
      <div className="flex items-center gap-3 text-xs text-text-secondary">
        {dashboard.lastModified && (
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {dashboard.lastModified}
          </span>
        )}
        {dashboard.shared && (
          <span className="flex items-center gap-1 text-brand">
            <Share2 size={11} />
            Shared
          </span>
        )}
        {dashboard.widgets && (
          <span>{typeof dashboard.widgets === 'number' ? dashboard.widgets : dashboard.widgets.length} widgets</span>
        )}
      </div>
    </div>
  );
}

function TemplateCard({ template, onUse }) {
  return (
    <div className="bg-white rounded-lg border border-dashed border-gray-300 p-4 hover:border-brand/40 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
          <Sparkles size={18} className="text-purple-500" />
        </div>
        <span className="text-[10px] font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase">
          {template.category}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-text-primary mb-1">{template.name}</h3>
      <p className="text-xs text-text-secondary leading-relaxed mb-3">{template.description}</p>
      <button
        onClick={() => onUse(template.id)}
        className="inline-flex items-center gap-1 text-xs font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Use Template <ArrowRight size={12} />
      </button>
    </div>
  );
}

function WidgetPreview({ widget }) {
  if (widget.type === 'metric') {
    return (
      <div className="bg-white rounded-lg border border-border p-3 h-full flex flex-col justify-center">
        <p className="text-[10px] font-medium text-text-secondary uppercase mb-1">{widget.title}</p>
        <p className="text-lg font-bold text-text-primary">{widget.value}</p>
      </div>
    );
  }
  if (widget.type === 'chart') {
    const isLine = widget.chartType === 'line';
    return (
      <div className="bg-white rounded-lg border border-border p-4 h-full flex flex-col">
        <p className="text-[10px] font-medium text-text-secondary uppercase mb-3">{widget.title}</p>
        <div className="flex-1 flex items-end gap-1 relative" style={{ minHeight: '120px' }}>
          {isLine && Array.isArray(widget.data) ? (
            widget.data.map((val, i) => {
              const max = Math.max(...widget.data);
              const min = Math.min(...widget.data);
              const range = max - min || 1;
              const pct = ((val - min) / range) * 80 + 20;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end h-full">
                  <div className="bg-brand/15 rounded-t transition-all" style={{ height: `${pct}%` }}>
                    <div className="w-full h-1 bg-brand rounded-t" />
                  </div>
                </div>
              );
            })
          ) : (
            Object.entries(widget.data || {}).map(([label, val], i) => {
              const max = Math.max(...Object.values(widget.data || {}));
              const pct = (val / max) * 85 + 10;
              const colors = ['bg-blue-400', 'bg-brand', 'bg-yellow-400', 'bg-gray-300'];
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full">
                  <span className="text-[9px] font-medium text-text-primary">{val}</span>
                  <div className={`w-full ${colors[i % colors.length]} rounded-t transition-all`} style={{ height: `${pct}%` }} />
                  <span className="text-[9px] text-text-secondary truncate w-full text-center">{label}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
  if (widget.type === 'list') {
    return (
      <div className="bg-white rounded-lg border border-border p-3 h-full flex flex-col">
        <p className="text-[10px] font-medium text-text-secondary uppercase mb-2">{widget.title}</p>
        <div className="flex-1 space-y-1.5 overflow-hidden">
          {(widget.items || []).slice(0, 5).map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-text-primary">
              <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

function DashboardView({ dashboard, onBack }) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-md hover:bg-gray-100 text-text-secondary transition-colors"
            >
              <ArrowRight size={18} className="rotate-180" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-text-primary">{dashboard.name}</h1>
              <p className="text-xs text-text-secondary">{dashboard.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-border rounded-md hover:bg-gray-50">
              Edit Layout
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-border rounded-md hover:bg-gray-50 flex items-center gap-1">
              <Plus size={12} /> Add Widget
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-border rounded-md hover:bg-gray-50 flex items-center gap-1">
              <Share2 size={12} /> Share
            </button>
          </div>
        </div>

        {/* Widget Grid */}
        <div className="grid grid-cols-12 gap-3 auto-rows-[60px]">
          {dashboard.widgets.map((widget) => (
            <div
              key={widget.id}
              className="cursor-move"
              style={{
                gridColumn: `span ${widget.w}`,
                gridRow: `span ${widget.h}`,
              }}
            >
              <div className="h-full">
                <WidgetPreview widget={widget} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardManager() {
  const [activeDashboard, setActiveDashboard] = useState(null);

  const selectedDashboard = userDashboards.find(d => d.id === activeDashboard);

  if (selectedDashboard) {
    return <DashboardView dashboard={selectedDashboard} onBack={() => setActiveDashboard(null)} />;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-6">
        <PageHeader
          title="Dashboards"
          subtitle="Build custom views tailored to your workflow"
          actions={
            <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">
              <Plus size={15} />
              New Dashboard
            </button>
          }
        />

        {/* My Dashboards */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-text-primary mb-3">My Dashboards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userDashboards.map((dashboard) => (
              <DashboardCard
                key={dashboard.id}
                dashboard={dashboard}
                onOpen={setActiveDashboard}
              />
            ))}
            <div
              className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center text-text-secondary hover:border-brand/30 hover:text-brand cursor-pointer transition-colors min-h-[160px]"
            >
              <Plus size={24} className="mb-2 opacity-50" />
              <span className="text-sm font-medium">Create Dashboard</span>
              <span className="text-xs mt-0.5">Start from scratch</span>
            </div>
          </div>
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-1">Start from a Template</h2>
          <p className="text-xs text-text-secondary mb-3">Pre-built dashboards designed for common roles and workflows.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} onUse={() => {}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
