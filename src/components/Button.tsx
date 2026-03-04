import { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'danger' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: 'bg-gradient-to-r from-primary hover:from-primary/90 to-purple-600 hover:to-purple-700 shadow-lg shadow-primary/50 hover:shadow-primary/70 text-white font-bold hover:scale-[1.02] disabled:hover:scale-100',
  danger: 'bg-gradient-to-r from-red-500/20 hover:from-red-500/30 to-pink-500/20 hover:to-pink-500/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 font-semibold hover:shadow-glow-pink',
  secondary: 'bg-gradient-to-r from-accent/20 hover:from-accent/30 to-cyan-bright/20 hover:to-cyan-bright/30 border border-accent/30 hover:border-accent/50 text-accent font-semibold hover:shadow-glow-cyan',
  ghost: 'hover:bg-primary/20 hover:shadow-glow-purple text-white transition-all',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        flex items-center justify-center gap-2 rounded-lg transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
};
