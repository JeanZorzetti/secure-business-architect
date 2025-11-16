import { TOCItem } from '@/components/blog/table-of-contents';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim();
}

export function extractTableOfContents(htmlContent: string): TOCItem[] {
  const items: TOCItem[] = [];

  if (typeof window === 'undefined') {
    // Server-side: use regex
    const headingRegex = /<h([23])([^>]*)>(.*?)<\/h\1>/gi;
    let match;

    while ((match = headingRegex.exec(htmlContent)) !== null) {
      const level = parseInt(match[1], 10);
      const content = match[3].replace(/<[^>]*>/g, '').trim();
      const id = slugify(content);

      items.push({ id, title: content, level });
    }

    return items;
  }

  // Client-side: use DOMParser
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const headings = doc.querySelectorAll('h2, h3');

    headings.forEach((heading) => {
      const title = heading.textContent?.trim() || '';
      const level = parseInt(heading.tagName.substring(1), 10);
      const id = slugify(title);

      items.push({ id, title, level });
    });
  } catch (error) {
    console.error('Error extracting table of contents:', error);
  }

  return items;
}

export function addIdsToHeadings(htmlContent: string): string {
  if (typeof window === 'undefined') {
    // Server-side: use regex replacement
    return htmlContent.replace(
      /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
      (match, level, attrs, content) => {
        const textContent = content.replace(/<[^>]*>/g, '').trim();
        const id = slugify(textContent);

        // Check if ID already exists in attrs
        if (attrs.includes('id=')) {
          return match;
        }

        return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
      }
    );
  }

  // Client-side: use DOMParser
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    const headings = doc.querySelectorAll('h2, h3');

    headings.forEach((heading) => {
      const title = heading.textContent?.trim() || '';
      const id = slugify(title);

      if (!heading.id) {
        heading.id = id;
      }
    });

    return doc.body.innerHTML;
  } catch (error) {
    console.error('Error adding IDs to headings:', error);
    return htmlContent;
  }
}
