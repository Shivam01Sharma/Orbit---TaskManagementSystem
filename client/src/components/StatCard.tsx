import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  trend,
  color = 'primary',
  subtext,
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      icon: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700',
    },
    secondary: {
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      icon: 'text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-700',
    },
    accent: {
      bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
      icon: 'text-purple-600',
      badge: 'bg-purple-100 text-purple-700',
    },
    success: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      icon: 'text-green-600',
      badge: 'bg-green-100 text-green-700',
    },
    warning: {
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
      icon: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700',
    },
  };

  const styles = colorClasses[color];

  return (
    <div className={`${styles.bg} rounded-xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-slate-900">{value}</p>
            {subtext && (
              <p className="text-xs text-slate-500">{subtext}</p>
            )}
          </div>
          {trend && (
            <p className={`text-xs font-medium mt-3 px-2 py-1 rounded-full w-fit ${styles.badge}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-lg bg-white flex items-center justify-center text-2xl shadow-sm border border-slate-200`}>
          {icon}
        </div>
      </div>
    </div>
  );
};
