import { CopyButton } from './CopyButton';
import { cn } from '../../utils/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <div className={cn("relative rounded-lg bg-black border border-border group", className)}>
      <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyButton value={code} className="bg-black/50 hover:bg-black" />
      </div>
      <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}
