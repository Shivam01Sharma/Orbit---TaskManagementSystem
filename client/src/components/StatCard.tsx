import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  trend,
  color,
}) => {
  const colorClasses = {
    primary: 'from-primary-50 to-primary-100 text-primary-600',
    secondary: 'from-secondary-50 to-secondary-100 text-secondary-600',
    accent: 'from-accent-50 to-accent-100 text-accent-600',
    success: 'from-green-50 to-green-100 text-green-600',
    warning: 'from-yellow-50 to-yellow-100 text-yellow-600',
  };

  return (
    <div className="bg-white rounded-lg p-6 card-shadow hover:card-shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p className="text-xs text-green-600 font-medium mt-2">{trend}</p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
