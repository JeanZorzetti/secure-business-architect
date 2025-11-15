import { useEffect, useState } from 'react';
import { List, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TOCItem } from '@/utils/extractTableOfContents';
import styles from './TableOfContents.module.css';

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Intersection Observer para detectar qual seção está visível
    const observerOptions = {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todos os headings com IDs
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
      setIsOpen(false); // Fechar drawer mobile após clicar
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop: Sticky Sidebar */}
      <nav className={styles.desktopNav}>
        <div className={styles.header}>
          <List className={styles.headerIcon} size={18} />
          <h4 className={styles.title}>Neste Artigo</h4>
        </div>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={cn(styles.listItem, item.level === 3 && styles.listItemIndented)}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  styles.link,
                  activeId === item.id && styles.linkActive
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: Floating Button + Drawer */}
      <div className={styles.mobileContainer}>
        {/* Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.floatingButton}
          aria-label="Abrir índice"
        >
          <List size={20} />
          <span className={styles.floatingButtonText}>Índice</span>
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Drawer */}
        <div className={cn(styles.drawer, isOpen && styles.drawerOpen)}>
          <div className={styles.drawerHeader}>
            <div className={styles.drawerTitle}>
              <List size={18} />
              <h4>Neste Artigo</h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="Fechar índice"
            >
              <X size={20} />
            </button>
          </div>

          <ul className={styles.drawerList}>
            {items.map((item) => (
              <li key={item.id} className={cn(item.level === 3 && styles.listItemIndented)}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    styles.drawerLink,
                    activeId === item.id && styles.drawerLinkActive
                  )}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
