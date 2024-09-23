import React from 'react';
import { Loader2 } from 'lucide-react';
import { IconType } from 'react-icons';

type ColorType = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'gray';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'text' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
  color?: ColorType;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  isLoading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  disabled,
  color = 'blue',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none';
  
  const colorStyles = {
    blue: {
      bg: 'bg-[#0096c7] hover:bg-[#00b4d8]',
      text: 'text-[#0096c7]',
      border: 'border-[#0096c7]',
      hover: 'hover:bg-[#e6f8fb]',
      outline: 'bg-[#e6f8fb]'
    },
    red: {
      bg: 'bg-[#e63946] hover:bg-[#f07470]',
      text: 'text-[#e63946]',
      border: 'border-[#e63946]',
      hover: 'hover:bg-[#fdf0f0]',
      outline: 'bg-[#fdf0f0]'
    },
    green: {
      bg: 'bg-[#2a9d8f] hover:bg-[#40b3a2]',
      text: 'text-[#2a9d8f]',
      border: 'border-[#2a9d8f]',
      hover: 'hover:bg-[#e8f6f3]',
      outline: 'bg-[#e8f6f3]'
    },
    yellow: {
      bg: 'bg-[#f4a261] hover:bg-[#f0d185]',
      text: 'text-[#f4a261]',
      border: 'border-[#f4a261]',
      hover: 'hover:bg-[#fdf8e8]',
      outline: 'bg-[#fdf8e8]'
    },
    purple: {
      bg: 'bg-[#7209b7] hover:bg-[#8f3cc4]',
      text: 'text-[#7209b7]',
      border: 'border-[#7209b7]',
      hover: 'hover:bg-[#f3e8fa]',
      outline: 'bg-[#f3e8fa]'
    },
    pink: {
      bg: 'bg-[#f72585] hover:bg-[#f9569d]',
      text: 'text-[#f72585]',
      border: 'border-[#f72585]',
      hover: 'hover:bg-[#fee8f3]',
      outline: 'bg-[#fee8f3]'
    },
    indigo: {
      bg: 'bg-[#4361ee] hover:bg-[#6780f1]',
      text: 'text-[#4361ee]',
      border: 'border-[#4361ee]',
      hover: 'hover:bg-[#e9edfd]',
      outline: 'bg-[#e9edfd]'
    },
    gray: {
      bg: 'bg-[#495057] hover:bg-[#6c757d]',
      text: 'text-[#495057]',
      border: 'border-[#495057]',
      hover: 'hover:bg-[#f1f3f5]',
      outline: 'bg-[#f1f3f5]'
    },
  };
  
  const variantStyles = {
    primary: `${colorStyles[color].bg} text-white`,
    secondary: `bg-gray-200 ${colorStyles[color].text} hover:bg-gray-300`,
    outline: `border ${colorStyles[color].border} ${colorStyles[color].text} ${colorStyles[color].hover} ${colorStyles[color].outline}`,
    ghost: `${colorStyles[color].text} ${colorStyles[color].hover}`,
    text: `bg-transparent ${colorStyles[color].text} hover:${colorStyles[color].hover}`,
    link: `bg-transparent text-[#0096c7] underline-offset-4 hover:underline`,
  };

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const iconSizeStyles = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${isLoading || disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `.trim();

  return (
    <button
      className={combinedClassName}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {!isLoading && LeftIcon && <span className="mr-2">{<LeftIcon className={iconSizeStyles[size]} />}</span>}
      {children}
      {!isLoading && RightIcon && <span className="ml-2">{<RightIcon className={iconSizeStyles[size]} />}</span>}
    </button>
  );
};

export default Button;