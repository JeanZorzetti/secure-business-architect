import { ReactNode } from "react";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceDetailProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  results: string;
  reverse?: boolean;
  className?: string;
}

const ServiceDetail = ({
  icon,
  title,
  subtitle,
  description,
  benefits,
  results,
  reverse = false,
  className,
}: ServiceDetailProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-fadeInUp",
        className
      )}
    >
      {/* Main Info Card */}
      <div className={cn("order-1", reverse && "lg:order-2")}>
        <div className="group relative bg-card p-8 rounded-2xl shadow-elegant border border-border h-full transition-all duration-500 hover:shadow-2xl hover:border-accent/30 hover:-translate-y-2">
          {/* Gradient Background on Hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            {/* Icon */}
            <div className="text-accent mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              {icon}
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
              {title}
            </h2>
            <p className="text-lg text-accent font-semibold mb-4">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {description}
            </p>

            {/* Results Badge */}
            <div className="bg-accent/10 p-4 rounded-xl border border-accent/30 backdrop-blur-sm">
              <p className="font-semibold text-accent text-sm">{results}</p>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
        </div>
      </div>

      {/* Benefits Card */}
      <div className={cn("order-2", reverse && "lg:order-1")}>
        <div className="group relative bg-gradient-to-br from-primary to-primary/90 text-primary-foreground p-8 rounded-2xl shadow-elegant transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
          {/* Shine Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              O Que Está Incluído:
              <span className="inline-block transition-transform group-hover:rotate-12">
                ✨
              </span>
            </h3>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 group/item animate-slideInLeft"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5 transition-transform group-hover/item:scale-110 group-hover/item:rotate-12" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
