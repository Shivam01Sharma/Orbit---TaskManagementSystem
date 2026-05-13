import React from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Navigation />
      <div className="flex-1 ml-64">
        {children}
      </div>
    </div>
  );
};
