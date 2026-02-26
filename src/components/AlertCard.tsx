import {
  CalendarClock, ClipboardCheck, Home, Landmark, FileStack, Mail,
  UserX, Clock, AlertTriangle,
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
  const hasErrors = items.some(i => i.severity === 'error');
  const borderColor = hasErrors ? 'border-red-200' : 'border-amber-200';
  const bgColor = hasErrors ? 'bg-red-50/50' : 'bg-amber-50/50';

  return (
    <div className={`rounded-lg border ${borderColor} ${bgColor} shadow-sm overflow-hidden`}>
      <div className={`px-4 py-3 border-b ${borderColor} flex items-center gap-2`}>
        <AlertTriangle size={16} className={hasErrors ? 'text-red-500' : 'text-amber-500'} />
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || AlertTriangle;
          return (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/60 transition-colors">
              <div className={`p-1.5 rounded-md ${
                item.severity === 'error' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
              }`}>
                <Icon size={14} />
              </div>
              <p className="flex-1 text-sm text-slate-700">{item.message}</p>
              {item.count && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  item.severity === 'error' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {item.count}
                </span>
              )}
              <button className="text-xs font-medium text-brand-700 hover:text-brand-900 whitespace-nowrap cursor-pointer">
                {item.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
