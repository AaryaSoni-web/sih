import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'bordered';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}) => {
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200',
        {
          'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700': variant === 'default',
          'bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 shadow-lg hover:shadow-xl border border-emerald-100 dark:border-emerald-800': variant === 'gradient',
          'bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-300 dark:hover:border-emerald-600': variant === 'bordered'
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};