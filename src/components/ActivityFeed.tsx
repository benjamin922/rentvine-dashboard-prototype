import {
  FileText, PenTool, LogOut, Clipboard, DollarSign,
  Receipt, CheckCircle, Droplets, UserPlus, ThumbsUp,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'file-text': FileText,
  'pen-tool': PenTool,
  'log-out': LogOut,
  'clipboard': Clipboard,
  'dollar-sign': DollarSign,
  'receipt': Receipt,
  'check-circle': CheckCircle,
  'droplets': Droplets,
  'user-plus': UserPlus,
  'thumbs-up': ThumbsUp,
};

interface ActivityItem {
  id: number;
  message: string;
  time: string;
  icon: string;
}

interface ActivityFeedProps {
  title: string;
  items: ActivityItem[];
}

export default function ActivityFeed({ title, items }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="divide-y divide-slate-50">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || FileText;
          return (
            <div key={item.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
              <div className="p-1.5 rounded-md bg-slate-100 text-slate-500 mt-0.5">
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 leading-snug">{item.message}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
