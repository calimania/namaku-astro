import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={[
          'rounded-full object-cover',
          sizeClasses[size],
          className
        ].join(' ')}
      />
    );
  }

  return (
    <div className={[
      'rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-semibold',
      sizeClasses[size],
      className
    ].join(' ')}>
      {initials}
    </div>
  );
};