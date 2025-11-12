import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  name: string;
  role: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
  className?: string;
}

const TestimonialCard = ({
  name,
  role,
  company,
  content,
  rating = 5,
  image,
  className,
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "relative w-[350px] shrink-0 rounded-2xl border border-border bg-card p-6",
        "transition-all duration-300 hover:shadow-xl hover:border-accent/30",
        "cursor-pointer group",
        className
      )}
    >
      {/* Gradient Background on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {/* Stars Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4 transition-colors duration-300",
                i < rating
                  ? "text-accent fill-accent"
                  : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-sm text-muted-foreground mb-6 leading-relaxed italic">
          "{content}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-accent transition-colors duration-300"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center border-2 border-border group-hover:border-accent transition-colors duration-300">
              <span className="text-lg font-bold text-accent">
                {name.charAt(0)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <p className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
              {name}
            </p>
            <p className="text-xs text-muted-foreground">
              {role}
              {company && (
                <>
                  <span className="mx-1">•</span>
                  {company}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-accent/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
    </div>
  );
};

export default TestimonialCard;
