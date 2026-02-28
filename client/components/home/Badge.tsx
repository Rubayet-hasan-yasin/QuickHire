import React from 'react';

type BadgeColor = 'primary' | 'yellow' | 'green' | 'blue' | 'red';

interface BadgeProps {
    children: React.ReactNode;
    color?: BadgeColor;
}

export const Badge: React.FC<BadgeProps> = ({ children, color = 'primary' }) => {
    const colorMap = {
        primary: 'text-primary border-primary',
        yellow: 'text-accent-yellow border-accent-yellow',
        green: 'text-accent-green border-accent-green',
        blue: 'text-accent-blue border-accent-blue',
        red: 'text-accent-red border-accent-red',
    };

    return (
        <span
            className={`font-sans font-semibold text-xs py-1 px-3 rounded-full border bg-transparent ${colorMap[color]}`}
        >
            {children}
        </span>
    );
};
