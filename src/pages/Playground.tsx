import { useState, useEffect } from 'react';
import { FlaskConical } from 'lucide-react';
import { CodeBlock } from '../components/ui/CodeBlock';
import { ModeToggle } from '../components/ModeToggle';
import { useMode } from '../context/ModeContext';
import { statusCodes } from '../data/statusCodes';
import { getCategoryColor } from '../utils/statusHelpers';
import { useSEO } from '../hooks/useSEO';

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

export function Playground() {
  useSEO({
    title: 'HTTP Status Code Simulator & API Playground',
    description: 'Experiment with HTTP status codes and see how your API should respond in development versus production.',
    canonical: '/playground',
  });

  const { mode } = useMode();
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('/api/users/123');
  const [selectedCode, setSelectedCode] = useState(200);
  const [includeBody, setIncludeBody] = useState(true);

  const status = statusCodes.find(c => c.code === selectedCode) || statusCodes[0];

  // Auto-disable body for 204
  useEffect(() => {
    if (selectedCode === 204 || selectedCode === 301 || selectedCode === 302 || selectedCode === 304) {
      setIncludeBody(false);
    } else {
      setIncludeBody(true);
    }
  }, [selectedCode]);

  const generateResponse = () => {
    const lines = [];
    lines.push(`HTTP/1.1 ${status.code} ${status.name}`);
    
    if (selectedCode === 301 || selectedCode === 302 || selectedCode === 307 || selectedCode === 308) {
      lines.push('Location: https://api.example.com/new-location');
    }
    
    if (includeBody && status.hasBody) {
      lines.push('Content-Type: application/json');
      lines.push('');
      
      const bodyObj: any = {
        success: status.category === 'success',
      };
      
      if (status.category !== 'success') {
        bodyObj.error = {
          code: status.name.toUpperCase().replace(/\s+/g, '_'),
          message: mode === 'development' ? status.developerMessage : status.productionMessage,
        };
        if (mode === 'development' && status.code >= 500) {
           bodyObj.error.stack = "Error: Database connection failed\\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\\n    at async fetchUser (src/db/users.ts:42:12)";
        }
      } else {
        bodyObj.message = mode === 'development' ? status.developerMessage : status.productionMessage;
        if (status.responseExample) {
           try {
             // Try to parse the string example to object for clean stringification
             const parsed = JSON.parse(status.responseExample);
             bodyObj.data = parsed;
           } catch {
             // Fallback
             bodyObj.data = status.responseExample;
           }
        } else {
           bodyObj.data = { id: "123" };
        }
      }
      
      lines.push(JSON.stringify(bodyObj, null, 2));
    } else {
      lines.push('');
    }
    
    return lines.join('\n');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="border-b border-border pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            <FlaskConical className="h-8 w-8 text-primary" />
            Build an HTTP Response
          </h1>
          <p className="text-muted-foreground text-lg">
            Experiment with different scenarios and see how your API should respond.
          </p>
        </div>
        <ModeToggle />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6 bg-card border border-border rounded-xl p-6 shadow-sm h-fit">
          <div className="space-y-3">
            <label htmlFor="method-select" className="text-sm font-medium">HTTP Method</label>
            <select 
              id="method-select"
              name="http-method"
              autoComplete="off"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-muted border-none rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
            >
              {HTTP_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="space-y-3">
            <label htmlFor="endpoint-input" className="text-sm font-medium">Endpoint URL</label>
            <input 
              id="endpoint-input"
              name="endpoint-url"
              autoComplete="off"
              type="text" 
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full bg-muted border-none rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm font-mono"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="status-select" className="text-sm font-medium flex justify-between items-center">
              Status Code
              <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(status.category).split(' ')[0]} bg-current/10 bg-opacity-20`}>
                {status.name}
              </span>
            </label>
            <select 
              id="status-select"
              name="status-code"
              autoComplete="off"
              value={selectedCode}
              onChange={(e) => setSelectedCode(Number(e.target.value))}
              className="w-full bg-muted border-none rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm font-mono"
            >
              <optgroup label="2xx Success">
                {statusCodes.filter(c => c.category === 'success').map(c => <option key={c.code} value={c.code}>{c.code} {c.name}</option>)}
              </optgroup>
              <optgroup label="3xx Redirection">
                {statusCodes.filter(c => c.category === 'redirection').map(c => <option key={c.code} value={c.code}>{c.code} {c.name}</option>)}
              </optgroup>
              <optgroup label="4xx Client Error">
                {statusCodes.filter(c => c.category === 'client-error').map(c => <option key={c.code} value={c.code}>{c.code} {c.name}</option>)}
              </optgroup>
              <optgroup label="5xx Server Error">
                {statusCodes.filter(c => c.category === 'server-error').map(c => <option key={c.code} value={c.code}>{c.code} {c.name}</option>)}
              </optgroup>
            </select>
          </div>
          
          <div className="pt-4 border-t border-border flex items-center justify-between">
             <label className="text-sm font-medium cursor-pointer" htmlFor="toggle-body">
               Include Response Body
             </label>
             <input 
               id="toggle-body"
               type="checkbox" 
               checked={includeBody}
               onChange={(e) => setIncludeBody(e.target.checked)}
               disabled={!status.hasBody}
               className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
             />
          </div>
          {!status.hasBody && (
            <p className="text-xs text-warning-500 mt-1">This status code typically does not have a body.</p>
          )}
        </div>

        {/* Output */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3 bg-muted p-3 rounded-lg border border-border font-mono text-sm overflow-x-auto">
             <span className="text-primary font-bold">{method}</span>
             <span className="text-muted-foreground">https://api.example.com</span>
             <span className="text-foreground">{endpoint}</span>
          </div>
          
          <div className="relative">
            <div className={`absolute top-0 left-0 w-full h-1 rounded-t-lg ${getCategoryColor(status.category).split(' ')[0]} bg-current`} />
            <CodeBlock 
              code={generateResponse()} 
              className="h-[500px] rounded-t-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
