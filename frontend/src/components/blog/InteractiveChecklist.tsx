import { useState } from 'react';
import { ClipboardCheck, CheckSquare, Square } from 'lucide-react';
import styles from './InteractiveChecklist.module.css';
import { cn } from '@/lib/utils';

interface InteractiveChecklistProps {
  title?: string;
  items: string[];
}

export function InteractiveChecklist({ title = 'Checklist Prático', items }: InteractiveChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newChecked = new Set(checked);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setChecked(newChecked);
  };

  const progress = items.length > 0 ? (checked.size / items.length) * 100 : 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <ClipboardCheck className={styles.headerIcon} size={20} />
          <h4 className={styles.title}>{title}</h4>
        </div>
        <span className={styles.counter}>
          {checked.size}/{items.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Checklist Items */}
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.listItem}>
            <button
              onClick={() => toggleItem(index)}
              className={styles.checkbox}
              aria-label={checked.has(index) ? 'Desmarcar item' : 'Marcar item'}
            >
              {checked.has(index) ? (
                <CheckSquare className={styles.checkboxIconChecked} size={20} />
              ) : (
                <Square className={styles.checkboxIconUnchecked} size={20} />
              )}
            </button>
            <span className={cn(styles.itemText, checked.has(index) && styles.itemTextChecked)}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* Completion Message */}
      {progress === 100 && items.length > 0 && (
        <div className={styles.completionMessage}>
          <CheckSquare size={16} />
          <span>Checklist completo! 🎉</span>
        </div>
      )}
    </div>
  );
}
