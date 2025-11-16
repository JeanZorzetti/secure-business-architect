'use client';

import parse, { HTMLReactParserOptions, Element, domToReact, DOMNode } from 'html-react-parser';
import { cn } from '@/lib/utils';

interface EnhancedArticleContentProps {
  content: string;
  className?: string;
}

export default function EnhancedArticleContent({
  content,
  className
}: EnhancedArticleContentProps) {

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (!(domNode instanceof Element)) return;

      const { name, attribs, children } = domNode as Element & { children: DOMNode[] };

      // Headings
      if (name === 'h1') {
        return (
          <h1 className="font-serif text-4xl md:text-5xl font-bold mt-8 mb-6 text-foreground leading-tight">
            {domToReact(children, options)}
          </h1>
        );
      }

      if (name === 'h2') {
        return (
          <h2 className="font-serif text-3xl md:text-4xl font-bold mt-12 mb-6 text-foreground border-b-2 border-accent pb-3 leading-tight">
            {domToReact(children, options)}
          </h2>
        );
      }

      if (name === 'h3') {
        return (
          <h3 className="font-serif text-2xl md:text-3xl font-semibold mt-8 mb-4 text-foreground leading-tight">
            {domToReact(children, options)}
          </h3>
        );
      }

      if (name === 'h4') {
        return (
          <h4 className="font-serif text-xl md:text-2xl font-semibold mt-6 mb-3 text-foreground leading-tight">
            {domToReact(children, options)}
          </h4>
        );
      }

      // Paragraphs
      if (name === 'p') {
        return (
          <p className="text-base md:text-lg leading-relaxed mb-6 text-muted-foreground max-w-[65ch]">
            {domToReact(children, options)}
          </p>
        );
      }

      // Links
      if (name === 'a') {
        return (
          <a
            href={attribs.href}
            className="text-accent underline underline-offset-4 hover:text-accent/80 transition-colors font-medium"
            target={attribs.target}
            rel={attribs.rel}
          >
            {domToReact(children, options)}
          </a>
        );
      }

      // Strong/Bold
      if (name === 'strong' || name === 'b') {
        return (
          <strong className="font-bold text-foreground">
            {domToReact(children, options)}
          </strong>
        );
      }

      // Emphasis/Italic
      if (name === 'em' || name === 'i') {
        return (
          <em className="italic text-foreground/90">
            {domToReact(children, options)}
          </em>
        );
      }

      // Blockquote
      if (name === 'blockquote') {
        return (
          <blockquote className="border-l-4 border-accent bg-accent/5 pl-6 pr-4 py-4 my-8 italic text-lg">
            {domToReact(children, options)}
          </blockquote>
        );
      }

      // Unordered List
      if (name === 'ul') {
        return (
          <ul className="my-6 ml-6 space-y-3 list-none">
            {domToReact(children, options)}
          </ul>
        );
      }

      // Ordered List
      if (name === 'ol') {
        return (
          <ol className="my-6 ml-6 space-y-3 list-decimal list-outside marker:text-accent marker:font-bold">
            {domToReact(children, options)}
          </ol>
        );
      }

      // List Item
      if (name === 'li') {
        const isUl = domNode.parent && (domNode.parent as Element).name === 'ul';
        return (
          <li className={cn(
            "text-base md:text-lg leading-relaxed text-muted-foreground",
            isUl && "before:content-['●'] before:text-accent before:font-bold before:mr-3 before:inline-block"
          )}>
            {domToReact(children, options)}
          </li>
        );
      }

      // Code inline
      if (name === 'code' && (!domNode.parent || (domNode.parent as Element).name !== 'pre')) {
        return (
          <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-accent border border-border">
            {domToReact(children, options)}
          </code>
        );
      }

      // Code block
      if (name === 'pre') {
        return (
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 border border-border">
            {domToReact(children, options)}
          </pre>
        );
      }

      // Horizontal Rule
      if (name === 'hr') {
        return <hr className="my-12 border-t-2 border-border" />;
      }

      // Images
      if (name === 'img') {
        return (
          <img
            src={attribs.src}
            alt={attribs.alt || ''}
            className="w-full h-auto rounded-lg my-8 border border-border shadow-md"
            loading="lazy"
          />
        );
      }

      // Tables
      if (name === 'table') {
        return (
          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse border border-border">
              {domToReact(children, options)}
            </table>
          </div>
        );
      }

      if (name === 'thead') {
        return (
          <thead className="bg-accent/10">
            {domToReact(children, options)}
          </thead>
        );
      }

      if (name === 'tbody') {
        return (
          <tbody className="divide-y divide-border">
            {domToReact(children, options)}
          </tbody>
        );
      }

      if (name === 'tr') {
        return (
          <tr className="hover:bg-accent/5 transition-colors">
            {domToReact(children, options)}
          </tr>
        );
      }

      if (name === 'th') {
        return (
          <th className="px-4 py-3 text-left font-bold text-foreground border border-border">
            {domToReact(children, options)}
          </th>
        );
      }

      if (name === 'td') {
        return (
          <td className="px-4 py-3 text-muted-foreground border border-border">
            {domToReact(children, options)}
          </td>
        );
      }
    },
  };

  return (
    <div className={cn("article-content", className)}>
      {parse(content, options)}
    </div>
  );
}
