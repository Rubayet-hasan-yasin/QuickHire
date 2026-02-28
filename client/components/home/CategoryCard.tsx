import React from 'react';

interface CategoryCardProps {
    title: string;
    count: number;
    icon: React.ReactNode;
    isActive?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ title, count, icon, isActive = false }) => {
    return (
        <div
            className={`group flex items-start gap-4 p-8 rounded-lg border-2 transition-all cursor-pointer ${
                isActive 
                    ? 'bg-primary text-white border-primary shadow-[0_8px_20px_rgba(70,64,222,0.25)]' 
                    : 'bg-white text-foreground border-border hover:border-primary/50 hover:shadow-md'
            }`}
        >
            {/* Icon wrapper */}
            <div className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-lg ${
                isActive ? 'bg-white/20' : 'bg-light-bg group-hover:bg-primary/10'
            }`}>
                <div className={isActive ? 'text-white' : 'text-primary'}>
                    {icon}
                </div>
            </div>

            <div className="flex-1">
                <h4 className={`font-heading font-semibold text-2xl mb-2 ${
                    isActive ? 'text-white' : 'text-foreground group-hover:text-primary transition-colors'
                }`}>
                    {title}
                </h4>
                <div className="flex items-center gap-2">
                    <span className={`font-sans text-base ${isActive ? 'text-white/90' : 'text-muted'}`}>
                        {count} jobs available
                    </span>
                    <svg 
                        className={`w-5 h-5 ${isActive ? 'text-white/90' : 'text-muted group-hover:text-primary'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};
