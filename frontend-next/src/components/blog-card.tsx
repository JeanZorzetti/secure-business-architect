import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const BlogCard = ({ title, excerpt, date, slug }: BlogCardProps) => {
  return (
    <article className="bg-card p-6 rounded-lg shadow-elegant hover:shadow-accent transition-smooth border border-border group">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Calendar className="h-4 w-4" />
        <time>{date}</time>
      </div>
      <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-smooth">
        {title}
      </h3>
      <p className="text-muted-foreground mb-4">{excerpt}</p>
      <Link
        href={`/conteudo/${slug}`}
        className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-smooth font-medium"
      >
        Ler mais
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
};

export default BlogCard;
