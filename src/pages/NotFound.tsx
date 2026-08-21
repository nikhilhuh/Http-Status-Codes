import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export function NotFound() {
  useSEO({
    title: 'Page Not Found',
    noindex: true,
  });

  return (
    <div className="flex flex-col items-center justify-center py-32 text-center space-y-4 max-w-lg mx-auto">
      <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
      <h2 className="text-2xl font-semibold">Page not found</h2>
      <p className="text-muted-foreground text-lg mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/status-codes" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to Status Codes
      </Link>
    </div>
  );
}
