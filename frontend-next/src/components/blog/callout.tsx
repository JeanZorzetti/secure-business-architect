'use client';

import { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutType = 'info' | 'warning' | 'success' | 'tip';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    className: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900',
    iconClassName: 'text-blue-600 dark:text-blue-400',
    titleClassName: 'text-blue-900 dark:text-blue-300',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900',
    iconClassName: 'text-yellow-600 dark:text-yellow-400',
    titleClassName: 'text-yellow-900 dark:text-yellow-300',
  },
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900',
    iconClassName: 'text-green-600 dark:text-green-400',
    titleClassName: 'text-green-900 dark:text-green-300',
  },
  tip: {
    icon: Lightbulb,
    className: 'bg-accent/5 border-accent/30',
    iconClassName: 'text-accent',
    titleClassName: 'text-accent-foreground',
  },
};

export default function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'rounded-lg border-l-4 p-5 my-6 shadow-sm hover:shadow-md transition-shadow duration-200',
        config.className
      )}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={cn('h-5 w-5', config.iconClassName)} />
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn('font-semibold mb-2', config.titleClassName)}>
              {title}
            </p>
          )}
          <div className="text-sm leading-relaxed text-foreground/90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
