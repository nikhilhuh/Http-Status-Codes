import { useMode } from '../context/ModeContext';
import { cn } from '../utils/cn';
import { Terminal, ShieldCheck } from 'lucide-react';

export function ModeToggle({ className }: { className?: string }) {
  const { mode, toggleMode } = useMode();

  return (
    <button
      onClick={toggleMode}
      className={cn(
        "relative flex h-10 w-64 items-center rounded-lg bg-muted p-1 transition-colors",
        className
      )}
      aria-label="Toggle Development and Production Mode"
    >
      <div
        className={cn(
          "absolute left-1 top-1 h-8 w-[calc(50%-0.25rem)] rounded-md bg-card shadow transition-transform duration-300 ease-in-out",
          mode === 'production' ? "translate-x-full" : "translate-x-0"
        )}
      />
      <div
        className={cn(
          "relative z-10 flex flex-1 items-center justify-center gap-2 text-xs font-semibold transition-colors duration-300",
          mode === 'development' ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <Terminal className="h-3.5 w-3.5" />
        DEVELOPMENT
      </div>
      <div
        className={cn(
          "relative z-10 flex flex-1 items-center justify-center gap-2 text-xs font-semibold transition-colors duration-300",
          mode === 'production' ? "text-foreground" : "text-muted-foreground"
        )}
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        PRODUCTION
      </div>
    </button>
  );
}
