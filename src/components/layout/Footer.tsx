import { NavLink } from 'react-router-dom';
import { TerminalSquare } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 md:py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-lg text-primary">
            <TerminalSquare className="h-5 w-5" />
            <span>HTTP Status Codes Reference</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Built for developers. A quick reference for understanding and choosing the right HTTP status code.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <NavLink to="/status-codes" className="hover:text-primary transition-colors">Status Codes</NavLink>
          <NavLink to="/compare" className="hover:text-primary transition-colors">Compare</NavLink>
          <NavLink to="/playground" className="hover:text-primary transition-colors">Playground</NavLink>
          <NavLink to="/quiz" className="hover:text-primary transition-colors">Quiz</NavLink>
          <NavLink to="/about" className="hover:text-primary transition-colors">About</NavLink>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-8 mt-8 pt-8 border-t border-border/50 text-xs text-muted-foreground/70">
        <p>Disclaimer: HTTP semantics are based on the HTTP specifications. Application-specific API conventions may vary.</p>
      </div>
    </footer>
  );
}
