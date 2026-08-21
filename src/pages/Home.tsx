import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, TerminalSquare } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { scenarios } from '../data/scenarios';
import { statusCodes } from '../data/statusCodes';
import type { StatusCategory } from '../types/status';

const categories: { id: StatusCategory; name: string; desc: string; count: number }[] = [
  { id: 'informational', name: '1xx Informational', desc: 'Request received, continuing process.', count: statusCodes.filter(c => c.category === 'informational').length },
  { id: 'success', name: '2xx Success', desc: 'The action was successfully received, understood, and accepted.', count: statusCodes.filter(c => c.category === 'success').length },
  { id: 'redirection', name: '3xx Redirection', desc: 'Further action must be taken in order to complete the request.', count: statusCodes.filter(c => c.category === 'redirection').length },
  { id: 'client-error', name: '4xx Client Error', desc: 'The request contains bad syntax or cannot be fulfilled.', count: statusCodes.filter(c => c.category === 'client-error').length },
  { id: 'server-error', name: '5xx Server Error', desc: 'The server failed to fulfill an apparently valid request.', count: statusCodes.filter(c => c.category === 'server-error').length },
];

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-6 py-12 md:py-20 bg-gradient-to-b from-muted/50 to-transparent rounded-3xl border border-border/50">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <TerminalSquare className="h-4 w-4" />
          <span>The Ultimate API Reference</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
          HTTP Status Codes, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Explained.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl px-4">
          Know exactly which status code to return, why to return it, and what your API should tell the client.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md px-4">
          <Button size="lg" className="flex-1 gap-2" onClick={() => document.dispatchEvent(new CustomEvent('open-search'))}>
            <Search className="h-4 w-4" />
            Search Codes
          </Button>
          <Button size="lg" variant="outline" className="flex-1" onClick={() => navigate('/status-codes')}>
            Browse All {statusCodes.length}
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/status-codes?category=${cat.id}`} className="block group">
              <Card className="h-full transition-colors group-hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="text-lg">{cat.name}</CardTitle>
                  <CardDescription className="mb-4 line-clamp-2">{cat.desc}</CardDescription>
                  <div className="mt-auto text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                    {cat.count} codes <ChevronRight className="h-4 w-4" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Scenarios */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Which status code do I need?</h2>
          <Link to="/playground" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            Try Simulator <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenarios.slice(0, 6).map((scenario) => (
            <Link key={scenario.id} to={`/status-codes/${scenario.answerCode}`} className="block group">
              <Card className="h-full transition-all group-hover:border-primary/50 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">{scenario.question}</div>
                </CardHeader>
                <div className="p-6 pt-0 flex items-center gap-2">
                  <span className="text-2xl font-bold bg-muted px-2 py-1 rounded text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {scenario.answerCode}
                  </span>
                  <span className="text-muted-foreground line-clamp-1">{statusCodes.find(c => c.code === scenario.answerCode)?.name}</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
