import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default';

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
  danger: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
  default: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
};

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn(variantStyles[variant], className)}>
      {children}
    </Badge>
  );
}
