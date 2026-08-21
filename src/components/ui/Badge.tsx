import React from 'react';
import { cn } from '../../utils/cn';
import type { StatusCategory } from '../../types/status';
import { getCategoryColor } from '../../utils/statusHelpers';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  category?: StatusCategory;
  variant?: 'outline' | 'solid';
}

export function Badge({ children, category, variant = 'solid', className, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors border",
        category && variant === 'solid' ? getCategoryColor(category) : "border-transparent bg-muted text-muted-foreground",
        variant === 'outline' && category ? cn("bg-transparent border-current", getCategoryColor(category).split(' ')[0]) : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
