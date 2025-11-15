import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
  featured?: boolean;
}

export const BentoGridItem = ({
  title,
  description,
  icon,
  className,
  featured = false,
}: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card p-6",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:-translate-y-2 hover:border-accent/50",
        "cursor-pointer",
        featured && "md:col-span-2 lg:row-span-2 p-8",
        className
      )}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        {icon && (
          <div className="mb-4 text-accent transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
        )}

        {/* Title */}
        <h3
          className={cn(
            "font-bold mb-3 transition-colors duration-300 group-hover:text-accent",
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-muted-foreground transition-colors duration-300 group-hover:text-foreground",
            featured ? "text-base lg:text-lg" : "text-sm"
          )}
        >
          {description}
        </p>

        {/* Decorative Element */}
        <div className="mt-auto pt-4">
          <div className="h-1 w-0 bg-gradient-to-r from-accent to-accent/50 group-hover:w-full transition-all duration-500 rounded-full" />
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
    </div>
  );
};
