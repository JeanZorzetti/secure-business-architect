import { Link } from 'react-router-dom';
import { Scale, MessageSquare } from 'lucide-react';
import styles from './InlineCTA.module.css';

/**
 * InlineCTA - Call-to-Action inline no meio do artigo
 *
 * Design: Card destacado com gradiente Gold/Black
 * Objetivo: Converter leitores em leads qualificados
 * Posição: Após 40% do conteúdo do artigo
 *
 * Features:
 * - Icon Scale (balança da justiça) para identidade jurídica
 * - Gradiente sutil gold para destaque premium
 * - Hover effect com box-shadow gold
 * - Responsivo com padding/font-sizes ajustados
 * - Button com icon MessageSquare para conversação
 *
 * @example
 * <InlineCTA />
 */
export function InlineCTA() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Icon */}
        <div className={styles.iconWrapper}>
          <Scale className={styles.icon} size={48} />
        </div>

        {/* Content */}
        <h3 className={styles.title}>
          Precisa de Consultoria Jurídica Estratégica?
        </h3>

        <p className={styles.description}>
          Com 12 anos de experiência em direito empresarial, ajudo empresários a transformar
          complexidade jurídica em decisões claras e lucrativas.
        </p>

        {/* CTA Button */}
        <Link to="/contato" className={styles.button}>
          <MessageSquare className={styles.buttonIcon} size={20} />
          Agendar Diagnóstico Estratégico
        </Link>

        {/* Subtext */}
        <p className={styles.subtext}>
          Primeira consulta: análise completa do seu cenário jurídico
        </p>
      </div>
    </div>
  );
}
