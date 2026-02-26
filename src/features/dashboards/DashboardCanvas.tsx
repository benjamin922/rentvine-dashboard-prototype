import { useState } from 'react';
import { Save, X, Share2, Plus, GripVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { sampleWidgets } from '../../data/dashboards';

export default function DashboardCanvas() {
  const [editMode, setEditMode] = useState(false);
  const [showWidgetPicker, setShowWidgetPicker] = useState(false);

  const widgetCategories = [
    { name: 'KPI Cards', items: ['Counter', 'Trend Card', 'Gauge'] },
    { name: 'Charts', items: ['Bar Chart', 'Line Chart', 'Pie Chart', 'Donut Chart'] },
    { name: 'Tables', items: ['Data Table', 'Ranked List'] },
    { name: 'Feeds', items: ['Activity Feed', 'Task List'] },
  ];

  const renderWidget = (widget: typeof sampleWidgets[number]) => {
    switch (widget.type) {
      case 'kpi':
        return (
          <div className="flex flex-col justify-center h-full">
            <p className="text-3xl font-bold text-slate-900 tabular-nums">{widget.value}</p>
            {widget.trend !== undefined && (
              <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${
                widget.trend > 0 ? 'text-green-600' : 'text-danger-500'
              }`}>
                {widget.trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                <span className="tabular-nums">{Math.abs(widget.trend)}%</span>
              </div>
            )}
          </div>
        );

      case 'bar-chart':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={widget.data as { name: string; value: number }[]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Bar dataKey="value" fill="#00a54f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line-chart':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={widget.data as { day: string; value: number }[]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Line type="monotone" dataKey="value" stroke="#00a54f" strokeWidth={2} dot={{ fill: '#00a54f' }} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'table': {
        const tableData = widget.data as { id: string; property: string; issue: string; priority: string; status: string; days: number }[];
        return (
          <div className="overflow-auto h-full">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-2 py-1.5">ID</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-2 py-1.5">Property</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-2 py-1.5">Issue</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-2 py-1.5">Priority</th>
                  <th className="text-left text-xs font-medium text-slate-500 uppercase px-2 py-1.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {tableData.map((row) => {
                  const priorityColor: Record<string, string> = {
                    High: 'text-danger-600',
                    Medium: 'text-amber-600',
                    Low: 'text-slate-500',
                  };
                  return (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="text-xs text-brand-700 font-medium px-2 py-1.5">{row.id}</td>
                      <td className="text-xs text-slate-700 px-2 py-1.5">{row.property}</td>
                      <td className="text-xs text-slate-700 px-2 py-1.5">{row.issue}</td>
                      <td className={`text-xs font-medium px-2 py-1.5 ${priorityColor[row.priority] || ''}`}>{row.priority}</td>
                      <td className="text-xs text-slate-500 px-2 py-1.5">{row.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }

      case 'activity': {
        const activityData = widget.data as { message: string; time: string }[];
        return (
          <div className="space-y-2.5 overflow-auto h-full">
            {activityData.map((item, i) => (
              <div key={i} className="text-xs">
                <p className="text-slate-700 leading-snug">{item.message}</p>
                <p className="text-slate-400 mt-0.5">{item.time}</p>
              </div>
            ))}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Maintenance Coordinator KPIs</h1>
          <p className="text-sm text-slate-500 mt-0.5">Dashboard template</p>
        </div>
        <div className="flex items-center gap-2">
          {editMode ? (
            <>
              <button
                onClick={() => setShowWidgetPicker(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Plus size={14} /> Add Widget
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-colors cursor-pointer shadow-sm"
              >
                <Save size={14} /> Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <X size={14} /> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditMode(true)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Edit Dashboard
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
                <Share2 size={14} /> Share
              </button>
            </>
          )}
        </div>
      </div>

      {/* Widget Grid */}
      <div className="grid grid-cols-12 gap-4 auto-rows-[80px]">
        {sampleWidgets.map((widget) => (
          <div
            key={widget.id}
            className={`bg-white rounded-xl border shadow-sm overflow-hidden relative group transition-all ${
              editMode
                ? 'border-blue-300 border-dashed ring-1 ring-blue-100'
                : 'border-slate-200/60'
            }`}
            style={{
              gridColumn: `span ${widget.w}`,
              gridRow: `span ${widget.h}`,
            }}
          >
            {editMode && (
              <div className="absolute top-1.5 left-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-move z-10">
                <GripVertical size={14} className="text-blue-400" />
              </div>
            )}
            <div className="p-3 h-full flex flex-col">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">{widget.title}</p>
              <div className="flex-1 min-h-0">
                {renderWidget(widget)}
              </div>
            </div>
            {editMode && (
              <button className="absolute top-1.5 right-1.5 p-1 rounded-md hover:bg-danger-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <X size={12} className="text-danger-500" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Widget Picker Modal */}
      {showWidgetPicker && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
              <h2 className="text-base font-semibold text-slate-900">Add Widget</h2>
              <button
                onClick={() => setShowWidgetPicker(false)}
                className="p-1 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
              >
                <X size={18} className="text-slate-400" />
              </button>
            </div>
            <div className="p-5 space-y-5 max-h-96 overflow-y-auto">
              {widgetCategories.map((cat) => (
                <div key={cat.name}>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{cat.name}</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {cat.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => setShowWidgetPicker(false)}
                        className="p-3 rounded-xl border border-slate-200 text-sm text-slate-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-colors cursor-pointer text-left"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
