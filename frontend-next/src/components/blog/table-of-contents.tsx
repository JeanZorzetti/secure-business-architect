'use client';

import { useEffect, useState } from 'react';
import { List, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Intersection Observer to detect which section is visible
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

    // Observe all headings with IDs
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
      setIsOpen(false); // Close mobile drawer after click
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop: Sticky Sidebar */}
      <nav className="hidden lg:block sticky top-24 self-start">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <List className="h-5 w-5 text-accent" />
            <h4 className="font-bold">Neste Artigo</h4>
          </div>
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className={cn(item.level === 3 && 'ml-4')}
              >
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'text-sm text-left w-full py-1.5 px-3 rounded-md transition-colors',
                    'hover:bg-accent/10 hover:text-accent',
                    activeId === item.id
                      ? 'bg-accent/10 text-accent font-medium border-l-2 border-accent'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile: Floating Button + Drawer */}
      <div className="lg:hidden">
        {/* Floating Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-accent text-accent-foreground p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Abrir índice"
        >
          <List className="h-6 w-6" />
        </button>

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Drawer */}
        <div
          className={cn(
            'fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl transition-transform duration-300',
            isOpen ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-accent" />
                <h4 className="font-bold">Neste Artigo</h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* List */}
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.id}
                  className={cn(item.level === 3 && 'ml-4')}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'text-sm text-left w-full py-2 px-3 rounded-md transition-colors',
                      'hover:bg-accent/10 hover:text-accent',
                      activeId === item.id
                        ? 'bg-accent/10 text-accent font-medium'
                        : 'text-muted-foreground'
                    )}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
