import { Construction } from 'lucide-react';

interface StubPageProps {
  title: string;
}

const sectionDescriptions: Record<string, string> = {
  Leasing: 'Manage your leasing pipeline, applications, and tenant onboarding from start to finish.',
  Screening: 'Run background checks, review credit reports, and manage applicant screening workflows.',
  Contacts: 'Your centralized directory for tenants, owners, vendors, and other business contacts.',
  Reports: 'Generate financial reports, occupancy analytics, and custom data exports.',
  CRM: 'Track leads, manage communication workflows, and nurture prospect relationships.',
  Settings: 'Configure your account preferences, integrations, team permissions, and company settings.',
};

export default function StubPage({ title }: StubPageProps) {
  const description = sectionDescriptions[title] ||
    'This section is a placeholder in the prototype. The landing page pattern demonstrated in Properties, Accounting, and Maintenance would be replicated here.';

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="p-4 rounded-2xl bg-slate-100 mb-5">
        <Construction size={32} className="text-slate-400" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-sm text-slate-500 max-w-md leading-relaxed">
        {description}
      </p>
      <div className="mt-6 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-400 font-medium">
        Coming soon in the prototype
      </div>
    </div>
  );
}
