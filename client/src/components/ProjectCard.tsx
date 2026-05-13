import React from 'react';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  taskersCount: number;
  qlCount: number;
  completionPercentage: number;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  description,
  status,
  taskersCount,
  qlCount,
  completionPercentage,
  onClick,
}) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    paused: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-6 card-shadow hover:card-shadow-lg transition cursor-pointer transform hover:scale-105"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-gray-900 flex-1">{name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-gray-700">Overall Progress</span>
          <span className="text-xs font-bold text-primary-600">
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-600">Taskers</p>
          <p className="text-xl font-bold text-primary-600">{taskersCount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Quality Leaders</p>
          <p className="text-xl font-bold text-secondary-600">{qlCount}</p>
        </div>
      </div>
    </div>
  );
};
