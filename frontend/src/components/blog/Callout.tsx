import { type ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import styles from './Callout.module.css';
import { cn } from '@/lib/utils';

export type CalloutType = 'info' | 'warning' | 'success' | 'tip';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutConfig = {
  info: {
    icon: Info,
    className: styles.info,
  },
  warning: {
    icon: AlertTriangle,
    className: styles.warning,
  },
  success: {
    icon: CheckCircle,
    className: styles.success,
  },
  tip: {
    icon: Lightbulb,
    className: styles.tip,
  },
} as const;

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn(styles.callout, config.className)}>
      <div className={styles.header}>
        <Icon className={styles.icon} size={20} />
        {title && <h4 className={styles.title}>{title}</h4>}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
