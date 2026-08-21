import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Info, Link as LinkIcon } from 'lucide-react';
import { statusCodes } from '../data/statusCodes';
import { Badge } from '../components/ui/Badge';
import { CodeBlock } from '../components/ui/CodeBlock';
import { ModeToggle } from '../components/ModeToggle';
import { useMode } from '../context/ModeContext';
import { getCategoryName, getCategoryColor } from '../utils/statusHelpers';
import { cn } from '../utils/cn';

export function StatusCodeDetail() {
  const { code } = useParams();
  const { mode } = useMode();
  
  const status = statusCodes.find(c => c.code === Number(code));

  if (!status) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center space-y-4">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">Status code not found</h2>
        <p className="text-muted-foreground max-w-md">
          The HTTP status code {code} does not exist in our reference or is not a valid HTTP standard code.
        </p>
        <Link to="/status-codes" className="text-primary hover:underline mt-4 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Status Codes
        </Link>
      </div>
    );
  }

  const categoryColorClass = getCategoryColor(status.category).split(' ')[0];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-6">
        <Link to="/status-codes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={cn("text-5xl font-bold tracking-tighter", categoryColorClass)}>
                {status.code}
              </span>
              <h1 className="text-4xl font-bold tracking-tight">{status.name}</h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge category={status.category}>{getCategoryName(status.category)}</Badge>
              {status.common && <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Common</Badge>}
              {!status.common && <Badge variant="outline" className="bg-muted text-muted-foreground border-muted-foreground/20">Rare</Badge>}
              {status.deprecated && <Badge variant="solid" className="bg-red-500/10 text-red-500 border-red-500/20">Deprecated</Badge>}
            </div>
          </div>
          
          <div className="shrink-0 flex justify-end">
             <ModeToggle />
          </div>
        </div>
      </div>

      {/* Meaning & Usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> Meaning
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {status.description}
            </p>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <section className="bg-success-500/5 border border-success-500/20 rounded-xl p-5">
              <h3 className="font-semibold text-success-500 mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Use this when
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {status.whenToUse.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-success-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-error-500/5 border border-error-500/20 rounded-xl p-5">
              <h3 className="font-semibold text-error-500 mb-3 flex items-center gap-2">
                <XCircle className="h-4 w-4" /> Don't use this when
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {status.whenNotToUse.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-error-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section>
             <h2 className="text-xl font-semibold tracking-tight mb-4">Example Scenario</h2>
             <div className="bg-muted p-4 rounded-lg border border-border text-sm">
               {status.exampleScenario}
             </div>
          </section>
        </div>

        {/* Sidebar details */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="font-semibold border-b border-border pb-2">Properties</h3>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Has Response Body</span>
              <span className="font-medium">{status.hasBody ? 'Usually Yes' : 'No'}</span>
            </div>
            
            {status.relatedCodes && (
              <div className="pt-2 border-t border-border space-y-2">
                <span className="text-sm text-muted-foreground block mb-2">Related Codes</span>
                <div className="flex flex-wrap gap-2">
                  {status.relatedCodes.map(c => (
                    <Link key={c} to={`/status-codes/${c}`}>
                      <Badge variant="outline" className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                        {c} <LinkIcon className="h-3 w-3 ml-1 opacity-50" />
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Response Example based on Mode Context */}
      <section className="space-y-4 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">API Response Example</h2>
          <Badge variant="outline" className={mode === 'development' ? 'border-primary text-primary bg-primary/5' : 'border-success-500 text-success-500 bg-success-500/5'}>
            {mode === 'development' ? 'Development Mode Active' : 'Production Mode Active'}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {mode === 'development' 
            ? 'In development, responses can contain detailed diagnostic information, stack traces, and internal hints.'
            : 'In production, error messages must be sanitized to prevent leaking sensitive infrastructure or logic details.'}
        </p>

        <div className="mt-4">
          <CodeBlock 
            language="http"
            code={`HTTP/1.1 ${status.code} ${status.name}
Content-Type: application/json

{
  "success": ${status.category === 'success' ? 'true' : 'false'},
  "message": "${mode === 'development' ? status.developerMessage : status.productionMessage}"${status.hasBody && status.responseExample && status.category === 'success' ? `,\n  "data": ${status.responseExample.split('\n').join('\n  ')}` : ''}
}`}
          />
        </div>
      </section>
    </div>
  );
}
