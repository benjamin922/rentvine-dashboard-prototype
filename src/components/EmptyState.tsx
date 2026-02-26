import { CheckCircle } from 'lucide-react';

interface EmptyStateProps {
  message: string;
  submessage?: string;
}

export default function EmptyState({ message, submessage }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="p-3 rounded-full bg-green-50 mb-4">
        <CheckCircle size={32} className="text-green-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">{message}</h3>
      {submessage && (
        <p className="text-sm text-slate-500">{submessage}</p>
      )}
    </div>
  );
}
