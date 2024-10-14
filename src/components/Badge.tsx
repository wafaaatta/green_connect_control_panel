import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  className?: string;
}

const colorClasses = {
  primary: 'bg-blue-100 text-blue-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-indigo-100 text-indigo-800',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base',
};

export default function Badge({ children, color = 'primary', size = 'md', pill = false, className }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium ${colorClasses[color]} ${sizeClasses[size]} ${className} ${
        pill ? 'rounded-full' : 'rounded'
      }`}
    >
      {children}
    </span>
  );
}