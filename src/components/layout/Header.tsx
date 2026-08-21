import { NavLink } from 'react-router-dom';
import { TerminalSquare, Search, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
}

export function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </button>
          
          <NavLink to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:text-primary/90 transition-colors">
            <TerminalSquare className="h-6 w-6 text-primary" />
            <span className="hidden sm:inline-block">HTTP STATUS</span>
          </NavLink>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={onSearchClick}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-border bg-muted/50 shadow-sm hover:bg-muted hover:text-foreground h-9 px-4 py-2 w-full sm:w-64 justify-between text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search codes...
            </span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
}
