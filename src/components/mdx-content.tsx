"use client";

import ReactMarkdown from "react-markdown";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-headings:font-medium prose-h2:text-base prose-h2:mt-8 prose-h2:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:font-medium prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-muted-foreground/50 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-foreground prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none prose-pre:bg-secondary prose-pre:text-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
