import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-elegant border border-border group
                    transition-all duration-300
                    hover:shadow-2xl hover:-translate-y-2 hover:border-accent/50
                    cursor-pointer">
      <div className="text-accent mb-4 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link
        href="/servicos"
        className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300 font-medium group/link"
      >
        Saiba mais
        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
      </Link>
    </div>
  );
};

export default ServiceCard;
