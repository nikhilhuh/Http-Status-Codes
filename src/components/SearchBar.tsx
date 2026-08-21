import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Terminal } from 'lucide-react';
import { statusCodes } from '../data/statusCodes';
import { getCategoryColor } from '../utils/statusHelpers';
import { cn } from '../utils/cn';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? onClose() : document.dispatchEvent(new CustomEvent('open-search'));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim() === '' ? [] : statusCodes.filter(status => {
    const searchStr = query.toLowerCase();
    return (
      status.code.toString().includes(searchStr) ||
      status.name.toLowerCase().includes(searchStr) ||
      status.description.toLowerCase().includes(searchStr)
    );
  }).slice(0, 10);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-background/90 backdrop-blur-md" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden m-4 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground mr-3" />
          <input
            ref={inputRef}
            id="search-status-codes"
            name="search-status-codes"
            autoComplete="off"
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            placeholder="Search by code, name, or description..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-1 rounded-md hover:bg-muted text-muted-foreground ml-2">
            <X className="h-4 w-4" />
          </button>
        </div>

        {query.trim() !== '' && (
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.length > 0 ? (
              <div className="space-y-1">
                {results.map(status => (
                  <button
                    key={status.code}
                    onClick={() => {
                      navigate(`/status-codes/${status.code}`);
                      onClose();
                    }}
                    className="w-full text-left flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className={cn("px-2 py-1 rounded text-xs font-bold shrink-0 mt-0.5", getCategoryColor(status.category).split(' ')[0], "bg-opacity-20 bg-current border border-current")}>
                      {status.code}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{status.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{status.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Terminal className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-1">Try searching for another HTTP status code.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
