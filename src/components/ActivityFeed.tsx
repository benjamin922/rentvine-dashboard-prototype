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

/** Heuristic: if time string contains "min" or "hour" or "just now", treat as recent */
function isRecent(time: string): boolean {
  const lower = time.toLowerCase();
  return (
    lower.includes('min') ||
    lower.includes('hour') ||
    lower.includes('just now') ||
    lower.includes('seconds')
  );
}

export default function ActivityFeed({ title, items }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>

      {/* Items */}
      <div className="relative">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon] || FileText;
          const recent = isRecent(item.time);

          return (
            <div
              key={item.id}
              className="relative flex items-start gap-3 px-5 py-3 hover:bg-slate-50/50 transition-colors"
            >
              {/* Timeline line */}
              {index < items.length - 1 && (
                <span className="absolute left-[33px] top-[42px] bottom-0 w-px bg-slate-100" />
              )}

              {/* Icon circle */}
              <div className="relative w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 z-[1]">
                <Icon size={14} className="text-slate-500" />
                {/* Green dot for recent */}
                {recent && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-brand-500 rounded-full ring-2 ring-white pulse-dot" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-[13px] text-slate-700 leading-snug">
                  {item.message}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
