import React from 'react';

const AnimatedLogo: React.FC<{ size?: number }> = ({ size = 40 }) => {
  const s = size;
  return (
    <div className="flex items-center gap-3">
      <svg
        width={s}
        height={s}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="logo-spin"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        <g transform="translate(24,24)">
          {/* Fixed planet (inner) */}
          <circle r="10" fill="#064E3B" opacity="0.95" />
          <circle r="6" fill="#10B981" />

          {/* Orbit track (subtle) */}
          <ellipse rx="18" ry="10" fill="none" stroke="rgba(6,78,59,0.06)" strokeWidth="2" />

          {/* Orbiting planets: one fixed small marker and one animated marker that follows a figure-8 */}
          <g aria-hidden>
            <circle cx="10" cy="-6" r="2.6" fill="#A7F3D0" className="logo-planet-fixed" />
            <circle cx="18" cy="0" r="2.6" fill="#CFFFE9" className="logo-planet-orbit" />
          </g>
        </g>
      </svg>
      <div>
        <div className="text-slate-900 font-semibold text-lg">Orbit</div>
        <div className="text-xs text-slate-500">Team Ops</div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
