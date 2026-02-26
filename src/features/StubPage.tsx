import { Construction } from 'lucide-react';

interface StubPageProps {
  title: string;
}

export default function StubPage({ title }: StubPageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="p-4 rounded-full bg-slate-100 mb-4">
        <Construction size={32} className="text-slate-400" />
      </div>
      <h1 className="text-xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-sm text-slate-500 max-w-md">
        This section is a placeholder in the prototype. The landing page pattern demonstrated in Properties, Accounting, and Maintenance would be replicated here.
      </p>
    </div>
  );
}
