import { Building2, DollarSign, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';

const sections = [
  {
    icon: Building2,
    title: 'Properties',
    alerts: [
      '7 leases expiring with no renewal started',
      '4 units vacant 30+ days, no applications',
      '3 move-out inspections unscheduled',
    ],
    stats: { occupied: 231, vacant: 16, rate: '93.5%' },
    color: 'bg-blue-50 text-blue-600',
    nav: 'properties',
  },
  {
    icon: DollarSign,
    title: 'Accounting',
    alerts: [
      'Bank reconciliation 5 days overdue',
      '12 owner payouts pending review',
      '18 tenants overdue 15+ days ($34,200)',
    ],
    stats: { collected: '$298,750', overdue: '$34,200', unreconciled: 23 },
    color: 'bg-green-50 text-green-600',
    nav: 'accounting',
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    alerts: [
      '5 work orders unassigned 48+ hours',
      '2 emergency work orders open',
      '6 work orders past due date',
    ],
    stats: { open: 34, unassigned: 8, avgDays: '3.2d' },
    color: 'bg-orange-50 text-orange-600',
    nav: 'maintenance',
  },
];

export default function HomeLanding({ onNavigate }) {
  const totalAlerts = sections.reduce((s, sec) => s + sec.alerts.length, 0);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-text-primary">Good morning, Jane</h1>
          <p className="text-sm text-text-secondary mt-1">
            {totalAlerts > 0
              ? `You have ${totalAlerts} items that need attention across your portfolio.`
              : 'All caught up! No items need attention right now.'}
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.nav} className="bg-white rounded-lg border border-border overflow-hidden">
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => onNavigate(section.nav)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${section.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-text-primary">{section.title}</h2>
                      <div className="flex items-center gap-3 mt-0.5">
                        {Object.entries(section.stats).map(([key, val]) => (
                          <span key={key} className="text-xs text-text-secondary">
                            <span className="font-medium text-text-primary">{val}</span> {key}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-text-secondary" />
                </div>

                {section.alerts.length > 0 && (
                  <div className="border-t border-border px-5 py-3 bg-amber-50/30">
                    <div className="space-y-1.5">
                      {section.alerts.map((alert, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                          <span className="text-text-primary">{alert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {section.alerts.length === 0 && (
                  <div className="border-t border-border px-5 py-3 bg-green-50/30 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span className="text-xs text-green-700 font-medium">All caught up!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
