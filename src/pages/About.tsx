import { Info, ShieldAlert, Zap, ServerCrash } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { CodeBlock } from '../components/ui/CodeBlock';
import { useSEO } from '../hooks/useSEO';

export function About() {
  useSEO({
    title: 'About HTTP Status Codes & Best Practices',
    description: 'Learn how to design robust, professional APIs by using HTTP semantics correctly. Never leak production errors.',
    canonical: '/about',
  });

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-12">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Info className="h-8 w-8 text-primary" />
          About & Best Practices
        </h1>
        <p className="text-muted-foreground text-lg">
          Learn how to design robust, professional APIs by using HTTP semantics correctly.
        </p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-error-500/10 rounded-lg">
            <ServerCrash className="h-6 w-6 text-error-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Stop using 200 OK for everything</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          A common anti-pattern in API design is returning a <code className="text-primary font-bold">200 OK</code> status code for every request, and putting the actual error state in the JSON body. <strong>Don't do this.</strong>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-error-500/30">
            <CardHeader className="bg-error-500/5 pb-4">
              <CardTitle className="text-lg text-error-500 flex items-center gap-2">
                Bad Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <p className="text-sm text-muted-foreground">The HTTP layer says success, but the application layer says error.</p>
              <CodeBlock 
                code={`HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": false,
  "error": "User not found"
}`}
              />
            </CardContent>
          </Card>
          
          <Card className="border-success-500/30">
            <CardHeader className="bg-success-500/5 pb-4">
              <CardTitle className="text-lg text-success-500 flex items-center gap-2">
                Good Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <p className="text-sm text-muted-foreground">Both HTTP and application layers agree on the outcome.</p>
              <CodeBlock 
                code={`HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "success": false,
  "message": "User not found",
  "code": "USER_NOT_FOUND"
}`}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-muted p-6 rounded-xl border border-border">
          <h3 className="font-semibold mb-3">Why does this matter?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Frontend Applications:</strong> Axios and fetch can automatically catch 4xx/5xx errors in a <code>.catch()</code> block. If you return 200, every success handler needs manual error checking.</li>
            <li><strong>Infrastructure:</strong> CDNs, proxies, and load balancers rely on status codes to know if a response can be cached.</li>
            <li><strong>Monitoring:</strong> Tools like Datadog or New Relic use HTTP status codes to calculate error rates automatically.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-warning-500/10 rounded-lg">
            <ShieldAlert className="h-6 w-6 text-warning-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Never leak this in production</h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Development errors are for you. Production errors are for your users. 
          Never expose sensitive infrastructure details in a production API response.
        </p>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="p-6 space-y-4">
               <h3 className="font-semibold text-warning-500">Do Not Expose:</h3>
               <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                 <li>Stack traces</li>
                 <li>SQL queries or syntax errors</li>
                 <li>Database connection strings</li>
                 <li>Internal IP addresses or hostnames</li>
                 <li>File system paths</li>
                 <li>Environment variables</li>
                 <li>API keys or tokens</li>
                 <li>Library/framework internals</li>
               </ul>
            </div>
            <div className="p-6 space-y-4 bg-muted/30">
               <h3 className="font-semibold text-success-500">Do Expose:</h3>
               <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                 <li>A generic, safe message (e.g. "Something went wrong")</li>
                 <li>A unique Request ID or Correlation ID</li>
                 <li>A link to documentation (if applicable)</li>
                 <li>Validation feedback (for 400/422 errors)</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">HTTP Method Reference</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
             <CardHeader className="pb-3 border-b border-border/50">
               <CardTitle className="text-xl font-mono text-info-500">GET</CardTitle>
             </CardHeader>
             <CardContent className="pt-4 space-y-2 text-sm">
               <p className="text-muted-foreground">Retrieve data. Should be safe and idempotent.</p>
               <p><strong>Common codes:</strong> 200, 304, 404</p>
             </CardContent>
          </Card>
          
          <Card>
             <CardHeader className="pb-3 border-b border-border/50">
               <CardTitle className="text-xl font-mono text-success-500">POST</CardTitle>
             </CardHeader>
             <CardContent className="pt-4 space-y-2 text-sm">
               <p className="text-muted-foreground">Create a new resource or execute an action.</p>
               <p><strong>Common codes:</strong> 201, 202, 400, 409, 422</p>
             </CardContent>
          </Card>
          
          <Card>
             <CardHeader className="pb-3 border-b border-border/50">
               <CardTitle className="text-xl font-mono text-warning-500">PUT</CardTitle>
             </CardHeader>
             <CardContent className="pt-4 space-y-2 text-sm">
               <p className="text-muted-foreground">Replace an entire resource completely.</p>
               <p><strong>Common codes:</strong> 200, 204, 400, 404</p>
             </CardContent>
          </Card>

          <Card>
             <CardHeader className="pb-3 border-b border-border/50">
               <CardTitle className="text-xl font-mono text-warning-500">PATCH</CardTitle>
             </CardHeader>
             <CardContent className="pt-4 space-y-2 text-sm">
               <p className="text-muted-foreground">Partially update an existing resource.</p>
               <p><strong>Common codes:</strong> 200, 204, 400, 404, 409, 422</p>
             </CardContent>
          </Card>

          <Card>
             <CardHeader className="pb-3 border-b border-border/50">
               <CardTitle className="text-xl font-mono text-error-500">DELETE</CardTitle>
             </CardHeader>
             <CardContent className="pt-4 space-y-2 text-sm">
               <p className="text-muted-foreground">Remove a resource.</p>
               <p><strong>Common codes:</strong> 204, 404</p>
             </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
