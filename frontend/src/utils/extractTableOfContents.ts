/**
 * Extrai table of contents do HTML do artigo
 */

export interface TOCItem {
  id: string;
  title: string;
  level: number; // 2 para h2, 3 para h3
}

/**
 * Gera um ID único e amigável para URL a partir do texto do heading
 */
function generateId(text: string, index: number): string {
  // Remove HTML tags se houver
  const cleanText = text.replace(/<[^>]*>/g, '');

  // Converte para slug: lowercase, remove acentos, substitui espaços por hífens
  const slug = cleanText
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .substring(0, 50); // Limita tamanho

  return `${slug}-${index}`;
}

/**
 * Extrai todos os H2 e H3 do HTML para criar o TOC
 */
export function extractTableOfContents(htmlContent: string): TOCItem[] {
  const items: TOCItem[] = [];

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Buscar todos os H2 e H3
    const headings = doc.querySelectorAll('h2, h3');

    headings.forEach((heading, index) => {
      const title = heading.textContent?.trim() || '';
      const level = parseInt(heading.tagName.substring(1)); // h2 -> 2, h3 -> 3
      const id = generateId(title, index);

      if (title) {
        items.push({ id, title, level });
      }
    });

    return items;
  } catch (error) {
    console.error('Erro ao extrair table of contents:', error);
    return [];
  }
}

/**
 * Adiciona IDs aos headings do HTML para permitir navegação
 */
export function addIdsToHeadings(htmlContent: string, tocItems: TOCItem[]): string {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const headings = doc.querySelectorAll('h2, h3');

    headings.forEach((heading, index) => {
      if (tocItems[index]) {
        heading.id = tocItems[index].id;
      }
    });

    return doc.body.innerHTML;
  } catch (error) {
    console.error('Erro ao adicionar IDs aos headings:', error);
    return htmlContent;
  }
}
