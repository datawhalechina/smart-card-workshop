import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500',
        outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-gray-500',
        ghost: 'text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-500',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-4 py-2 text-sm rounded-md',
        lg: 'px-6 py-3 text-base rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ElementType;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, icon: Icon, children, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {Icon && !loading && <Icon className="mr-2 h-4 w-4" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
