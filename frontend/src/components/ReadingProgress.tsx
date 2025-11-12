import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ReadingProgress = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Show reading progress only after scrolling past hero section (e.g., 300px)
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-20 left-0 right-0 h-1 bg-accent origin-left z-40"
      style={{
        scaleX,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
      aria-label="Progresso de leitura"
      role="progressbar"
      aria-valuenow={Math.round(scrollYProgress.get() * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

// Reading time estimator
export const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

// Reading Time Badge component
interface ReadingTimeBadgeProps {
  text: string;
  className?: string;
}

export const ReadingTimeBadge = ({ text, className = "" }: ReadingTimeBadgeProps) => {
  const readingTime = calculateReadingTime(text);

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm text-muted-foreground ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span aria-label={`Tempo de leitura: ${readingTime} minuto${readingTime > 1 ? 's' : ''}`}>
        {readingTime} min de leitura
      </span>
    </span>
  );
};
