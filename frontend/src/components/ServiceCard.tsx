import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-elegant hover:shadow-accent transition-smooth border border-border group">
      <div className="text-accent mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link
        to="/servicos"
        className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-smooth font-medium"
      >
        Saiba mais
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
};

export default ServiceCard;
