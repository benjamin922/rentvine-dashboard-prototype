const styles = {
  new: 'bg-blue-100 text-blue-700',
  pending: 'bg-gray-100 text-gray-700',
  scheduled: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-600',
  incomplete: 'bg-orange-100 text-orange-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-500',
  overdue: 'bg-red-100 text-red-700',
  emergency: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  normal: 'bg-blue-100 text-blue-700',
  low: 'bg-gray-100 text-gray-600',
  'not started': 'bg-gray-100 text-gray-600',
  'offer sent': 'bg-blue-100 text-blue-700',
};

export default function StatusBadge({ status }) {
  const key = status?.toLowerCase().replace(/ /g, '_');
  const style = styles[key] || styles[status?.toLowerCase()] || 'bg-gray-100 text-gray-600';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}
