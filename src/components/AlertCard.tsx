import {
  CalendarClock, ClipboardCheck, Home, Landmark, FileStack, Mail,
  UserX, Clock, AlertTriangle, AlertCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'calendar-clock': CalendarClock,
  'clipboard-check': ClipboardCheck,
  'home': Home,
  'landmark': Landmark,
  'file-stack': FileStack,
  'mail': Mail,
  'user-x': UserX,
  'clock': Clock,
  'alert-triangle': AlertTriangle,
};

interface AlertItem {
  id: number;
  icon: string;
  message: string;
  count?: number;
  severity: 'warning' | 'error';
  cta: string;
}

interface AlertCardProps {
  title: string;
  items: AlertItem[];
}

export default function AlertCard({ title, items }: AlertCardProps) {
  const hasErrors = items.some((i) => i.severity === 'error');
  const borderLeftColor = hasErrors ? 'border-l-danger-500' : 'border-l-gold-400';
  const HeaderIcon = hasErrors ? AlertCircle : AlertTriangle;
  const headerIconColor = hasErrors ? 'text-danger-500' : 'text-gold-500';

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/60 ${borderLeftColor} border-l-4 shadow-sm overflow-hidden`}
    >
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2.5">
        <HeaderIcon size={16} className={headerIconColor} />
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>

      {/* Items */}
      <div className="divide-y divide-slate-50">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || AlertTriangle;
          const isError = item.severity === 'error';

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/50 transition-colors"
            >
              {/* Icon circle */}
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  isError
                    ? 'bg-danger-50 text-danger-600'
                    : 'bg-gold-50 text-gold-600'
                }`}
              >
                <Icon size={14} />
              </div>

              {/* Message */}
              <p className="flex-1 text-[13px] text-slate-700 min-w-0">
                {item.message}
              </p>

              {/* Count badge */}
              {item.count !== undefined && item.count > 0 && (
                <span className="min-w-[24px] h-[24px] rounded-full bg-gold-100 text-gold-700 flex items-center justify-center text-[11px] font-bold shrink-0">
                  {item.count}
                </span>
              )}

              {/* CTA button */}
              <button className="text-xs font-medium px-3 py-1 rounded-lg bg-brand-50 text-brand-700 hover:bg-brand-100 whitespace-nowrap transition-colors cursor-pointer shrink-0">
                {item.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
