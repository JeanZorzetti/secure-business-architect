/**
 * Skip Links - Permite usuários de teclado/screen reader pularem para conteúdo principal
 * Visível apenas quando tem foco (Tab)
 */
export function SkipLinks() {
  return (
    <div className="skip-links">
      <a
        href="#main-content"
        className="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Pular para conteúdo principal
      </a>
      <a
        href="#sidebar-navigation"
        className="skip-link focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Pular para navegação
      </a>
    </div>
  );
}
