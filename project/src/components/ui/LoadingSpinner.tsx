import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-emerald-200 dark:border-emerald-800 rounded-full"></div>
        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-emerald-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    </div>
  );
};