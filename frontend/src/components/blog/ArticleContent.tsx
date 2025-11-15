import { useMemo } from 'react';
import parse, { domToReact, HTMLReactParserOptions, Element, DOMNode } from 'html-react-parser';
import styles from './ArticleContent.module.css';

interface ArticleContentProps {
  htmlContent: string;
}

export function ArticleContent({ htmlContent }: ArticleContentProps) {
  // Parser options para customizar elementos HTML
  const options: HTMLReactParserOptions = useMemo(
    () => ({
      replace: (domNode) => {
        if (!(domNode instanceof Element)) return;

        const { name, attribs, children } = domNode;

        // Headings com classes customizadas e IDs para navegação
        if (name === 'h1') {
          return (
            <h1 id={attribs.id} className={styles.h1}>
              {domToReact(children as DOMNode[], options)}
            </h1>
          );
        }
        if (name === 'h2') {
          return (
            <h2 id={attribs.id} className={styles.h2}>
              {domToReact(children as DOMNode[], options)}
            </h2>
          );
        }
        if (name === 'h3') {
          return (
            <h3 id={attribs.id} className={styles.h3}>
              {domToReact(children as DOMNode[], options)}
            </h3>
          );
        }
        if (name === 'h4') {
          return (
            <h4 id={attribs.id} className={styles.h4}>
              {domToReact(children as DOMNode[], options)}
            </h4>
          );
        }

        // Parágrafos
        if (name === 'p') {
          return <p className={styles.paragraph}>{domToReact(children as DOMNode[], options)}</p>;
        }

        // Listas não-ordenadas
        if (name === 'ul') {
          return <ul className={styles.ul}>{domToReact(children as DOMNode[], options)}</ul>;
        }

        // Listas ordenadas
        if (name === 'ol') {
          return <ol className={styles.ol}>{domToReact(children as DOMNode[], options)}</ol>;
        }

        // Itens de lista
        if (name === 'li') {
          return <li className={styles.li}>{domToReact(children as DOMNode[], options)}</li>;
        }

        // Links
        if (name === 'a') {
          return (
            <a
              href={attribs.href}
              className={styles.link}
              target={attribs.target || '_self'}
              rel={attribs.target === '_blank' ? 'noopener noreferrer' : undefined}
            >
              {domToReact(children as DOMNode[], options)}
            </a>
          );
        }

        // Blockquotes
        if (name === 'blockquote') {
          return (
            <blockquote className={styles.blockquote}>
              {domToReact(children as DOMNode[], options)}
            </blockquote>
          );
        }

        // Strong/Bold
        if (name === 'strong' || name === 'b') {
          return <strong className={styles.strong}>{domToReact(children as DOMNode[], options)}</strong>;
        }

        // Emphasis/Italic
        if (name === 'em' || name === 'i') {
          return <em className={styles.em}>{domToReact(children as DOMNode[], options)}</em>;
        }

        // Code inline
        if (name === 'code') {
          return <code className={styles.code}>{domToReact(children as DOMNode[], options)}</code>;
        }

        // Pre (code blocks)
        if (name === 'pre') {
          return <pre className={styles.pre}>{domToReact(children as DOMNode[], options)}</pre>;
        }

        // Tabelas
        if (name === 'table') {
          return <table className={styles.table}>{domToReact(children as DOMNode[], options)}</table>;
        }
        if (name === 'thead') {
          return <thead className={styles.thead}>{domToReact(children as DOMNode[], options)}</thead>;
        }
        if (name === 'tbody') {
          return <tbody className={styles.tbody}>{domToReact(children as DOMNode[], options)}</tbody>;
        }
        if (name === 'tr') {
          return <tr className={styles.tr}>{domToReact(children as DOMNode[], options)}</tr>;
        }
        if (name === 'th') {
          return <th className={styles.th}>{domToReact(children as DOMNode[], options)}</th>;
        }
        if (name === 'td') {
          return <td className={styles.td}>{domToReact(children as DOMNode[], options)}</td>;
        }

        // Horizontal rule
        if (name === 'hr') {
          return <hr className={styles.hr} />;
        }

        // Imagens
        if (name === 'img') {
          return (
            <img
              src={attribs.src}
              alt={attribs.alt || ''}
              className={styles.img}
              loading="lazy"
            />
          );
        }
      },
    }),
    []
  );

  // Parse HTML para React components
  const parsedContent = useMemo(() => {
    try {
      return parse(htmlContent, options);
    } catch (error) {
      console.error('Erro ao fazer parse do HTML:', error);
      return <p>Erro ao carregar conteúdo do artigo.</p>;
    }
  }, [htmlContent, options]);

  return (
    <article className={styles.article}>
      <div className={styles.content}>{parsedContent}</div>
    </article>
  );
}
