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
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-primary-100 text-primary-800',
    review: 'bg-accent-100 text-accent-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg p-4 card-shadow hover:card-shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 flex-1">{title}</h3>
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3">Assigned to: {assignedTo}</p>

      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-600">Progress</span>
          <span className="text-xs font-medium text-gray-900">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[status]}`}>
          {status}
        </span>
        <span className="text-xs text-gray-500">Due: {dueDate}</span>
      </div>
    </div>
  );
};
