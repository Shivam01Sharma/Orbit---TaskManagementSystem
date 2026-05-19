import React from 'react';

interface TaskProps {
  id: string;
  title: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'review' | 'completed';
  dueDate: string;
  completionPercentage: number;
  onUpdate?: () => void;
}

export const TaskCard: React.FC<TaskProps> = ({
  title,
  assignedTo,
  priority,
  status,
  dueDate,
  completionPercentage,
}) => {
  const priorityColors = {
    low: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100' },
    medium: { bg: 'bg-amber-50', text: 'text-amber-700', badge: 'bg-amber-100' },
    high: { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100' },
    critical: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100' },
  };

  const statusColors = {
    pending: { icon: '⏱️', label: 'Pending', bg: 'bg-slate-50' },
    'in-progress': { icon: '🔄', label: 'In Progress', bg: 'bg-blue-50' },
    review: { icon: '👁️', label: 'In Review', bg: 'bg-purple-50' },
    completed: { icon: '✓', label: 'Completed', bg: 'bg-emerald-50' },
  };

  const priorityStyle = priorityColors[priority];
  const statusStyle = statusColors[status];

  const progressColors = {
    low: 'from-blue-400 to-blue-600',
    medium: 'from-amber-400 to-amber-600',
    high: 'from-orange-400 to-orange-600',
    critical: 'from-red-400 to-red-600',
  };

  return (
    <div className={`${statusStyle.bg} rounded-lg p-5 border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-md`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-sm truncate hover:text-clip">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">Assigned to: {assignedTo}</p>
        </div>
        <div className="flex-shrink-0">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${priorityStyle.badge} ${priorityStyle.text}`}>
            {priority === 'critical' ? '🔴' : priority === 'high' ? '🟠' : priority === 'medium' ? '🟡' : '🔵'} {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-slate-600">Progress</span>
          <span className="text-xs font-bold text-slate-900">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${progressColors[priority]} rounded-full transition-all duration-500`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-lg">{statusStyle.icon}</span>
          <span className="text-xs font-medium text-slate-600">{statusStyle.label}</span>
        </div>
        <span className="text-xs text-slate-500">Due {new Date(dueDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
