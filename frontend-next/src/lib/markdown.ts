import { marked } from 'marked';

export async function markdownToHtml(markdown: string): Promise<string> {
    if (!markdown) return '';
    return marked.parse(markdown) as string;
}
