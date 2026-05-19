import React from 'react';
import AnimatedLogo from './AnimatedLogo';

const LoadingSplash: React.FC<{ message?: string }> = ({ message = 'Launching' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <AnimatedLogo size={72} />
        <div className="text-slate-700 font-medium">{message}…</div>
      </div>
    </div>
  );
};

export default LoadingSplash;
