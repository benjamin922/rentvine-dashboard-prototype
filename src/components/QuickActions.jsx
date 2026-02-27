export default function QuickActions({ actions }) {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action, i) => {
        const Icon = action.icon;
        return (
          <button
            key={i}
            onClick={action.onClick}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium bg-white border border-border rounded-lg hover:border-brand hover:text-brand transition-colors text-text-primary"
          >
            {Icon && <Icon size={15} />}
            {action.label}
          </button>
        );
      })}
    </div>
  );
}
