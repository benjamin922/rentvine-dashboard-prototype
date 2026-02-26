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
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => {
        const Icon = iconMap[action.icon] || Zap;
        return (
          <button
            key={action.label}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm cursor-pointer"
          >
            <Icon size={16} className="text-brand-700" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
