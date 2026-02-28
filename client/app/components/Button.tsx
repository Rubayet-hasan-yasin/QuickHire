import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
};

function cn(...inputs: Parameters<typeof clsx>) {
    return twMerge(clsx(...inputs));
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-sans font-bold transition-all duration-200 rounded-md';

    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-hover shadow-[0_4px_10px_rgba(70,64,222,0.25)] hover:shadow-[0_6px_15px_rgba(70,64,222,0.35)]',
        outline: 'border-2 border-primary text-primary hover:bg-primary/5',
        ghost: 'text-primary hover:bg-primary/5',
    };

    const sizes = {
        sm: 'py-2 px-4 text-sm',
        md: 'py-3 px-6 text-base',
        lg: 'py-4 px-8 text-lg',
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
            {...props}
        >
            {children}
        </button>
    );
};
