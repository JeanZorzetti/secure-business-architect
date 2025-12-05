import { marked } from 'marked';

/**
 * Removes metadata section from markdown content
 * Metadata includes: Slug, Categoria, Tags, Autor, Data, Tempo de leitura, Meta Description
 * These are already stored in database fields and should not be rendered in article body
 */
function removeMetadataSection(markdown: string): string {
    // Pattern matches everything from start until first ## heading (Introduction)
    // This removes: title (#), metadata lines (**Key:** value), and Meta Description section
    const metadataPattern = /^#\s+.*?\n\n(?:\*\*[^:]+:\*\*[^\n]*\n)*\n*##\s+Meta Description[^\n]*\n[^\n]*\n\n---\n\n/;

    // If pattern matches, remove it
    if (metadataPattern.test(markdown)) {
        return markdown.replace(metadataPattern, '');
    }

    // Alternative pattern: just metadata lines without Meta Description section
    const simpleMetadataPattern = /^#\s+.*?\n\n(?:\*\*[^:]+:\*\*[^\n]*\n)+\n*/;
    if (simpleMetadataPattern.test(markdown)) {
        return markdown.replace(simpleMetadataPattern, '');
    }

    return markdown;
}

export async function markdownToHtml(markdown: string): Promise<string> {
    if (!markdown) return '';

    // Remove metadata section before converting to HTML
    const cleanedMarkdown = removeMetadataSection(markdown);

    return marked.parse(cleanedMarkdown) as string;
}
