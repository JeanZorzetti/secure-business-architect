import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Connection Line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-accent hidden md:block" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative flex items-start gap-6 group animate-fadeInUp"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Icon/Number Circle */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-accent">
                {item.icon || index + 1}
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content Card */}
            <div className="flex-1 pb-8">
              <div className="bg-card border border-border rounded-xl p-6 shadow-elegant transition-all duration-300 group-hover:shadow-2xl group-hover:border-accent/30 group-hover:-translate-y-1">
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
