import { Link } from 'react-router-dom';
import { ArrowLeftRight, Link as LinkIcon } from 'lucide-react';
import { comparisons } from '../data/comparisons';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export function Compare() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <ArrowLeftRight className="h-8 w-8 text-primary" />
          Common Comparisons
        </h1>
        <p className="text-muted-foreground text-lg">
          Clear explanations for the most frequently confused HTTP status codes.
        </p>
      </div>

      <div className="space-y-12">
        {comparisons.map((comparison) => (
          <div key={comparison.id} className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 border-b border-border/50 pb-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {comparison.title}
              </h2>
            </div>
            
            <p className="text-muted-foreground text-lg mb-6">
              {comparison.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comparison.differences.map((diff) => (
                <Card key={diff.code} className="bg-card shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3 border-b border-border/50 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-3xl font-bold tracking-tighter">{diff.code}</CardTitle>
                      <Link to={`/status-codes/${diff.code}`} className="text-muted-foreground hover:text-primary transition-colors p-1" title="View details">
                        <LinkIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm leading-relaxed text-card-foreground/90">
                      {diff.meaning}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
