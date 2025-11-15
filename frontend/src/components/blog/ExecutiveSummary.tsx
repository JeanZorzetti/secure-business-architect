import { Clock, Target, BookOpen, TrendingUp } from 'lucide-react';
import styles from './ExecutiveSummary.module.css';

interface ExecutiveSummaryProps {
  readingTime?: string;
  learningPoints: string[];
  result?: string;
}

export function ExecutiveSummary({
  readingTime = '8 minutos',
  learningPoints = [],
  result,
}: ExecutiveSummaryProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BookOpen className={styles.icon} size={24} />
        <h3 className={styles.title}>Resumo Executivo</h3>
      </div>

      <div className={styles.content}>
        {/* Tempo de Leitura */}
        <div className={styles.metaItem}>
          <Clock className={styles.metaIcon} size={18} />
          <div>
            <span className={styles.metaLabel}>Tempo de leitura:</span>
            <span className={styles.metaValue}>{readingTime}</span>
          </div>
        </div>

        {/* O que você vai aprender */}
        {learningPoints.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Target className={styles.sectionIcon} size={18} />
              <h4 className={styles.sectionTitle}>O que você vai aprender:</h4>
            </div>
            <ul className={styles.list}>
              {learningPoints.map((point, index) => (
                <li key={index} className={styles.listItem}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resultado */}
        {result && (
          <div className={styles.result}>
            <div className={styles.resultHeader}>
              <TrendingUp className={styles.resultIcon} size={18} />
              <span className={styles.resultLabel}>Resultado:</span>
            </div>
            <p className={styles.resultText}>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
