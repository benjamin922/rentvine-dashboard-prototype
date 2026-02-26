import {
  Plus, FileText, BarChart3, Send, CreditCard, Receipt, FileSpreadsheet, Zap,
  Wrench, UserPlus, Clock, FileBarChart,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'plus': Plus,
  'file-text': FileText,
  'bar-chart-3': BarChart3,
  'send': Send,
  'credit-card': CreditCard,
  'receipt': Receipt,
  'file-spreadsheet': FileSpreadsheet,
  'zap': Zap,
  'wrench': Wrench,
  'user-plus': UserPlus,
  'clock': Clock,
  'file-bar-chart': FileBarChart,
};

interface QuickAction {
  label: string;
  icon: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => {
        const Icon = iconMap[action.icon] || Zap;
        return (
          <button
            key={action.label}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200/60 bg-white px-4 py-2.5 shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer group"
          >
            <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 group-hover:bg-brand-100 transition-colors">
              <Icon size={14} />
            </span>
            <span className="text-[13px] font-medium text-slate-700">
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
