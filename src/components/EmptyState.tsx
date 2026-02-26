import { CheckCircle } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  submessage?: string;
}

export default function EmptyState({ message, submessage }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Gradient circle with icon */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center mb-5 shadow-sm">
        <CheckCircle size={28} className="text-brand-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">
        {message}
      </h3>
      {submessage && (
        <p className="text-sm text-slate-500 max-w-sm">{submessage}</p>
      )}
    </div>
  );
}
