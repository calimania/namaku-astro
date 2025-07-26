import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={[
      'bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow',
      paddingClasses[padding],
      className
    ].join(' ')}>
      {children}
    </div>
  );
};
