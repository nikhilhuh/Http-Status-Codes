import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SortAsc } from 'lucide-react';
import { statusCodes } from '../data/statusCodes';
import { StatusCard } from '../components/StatusCard';
import { useSEO } from '../hooks/useSEO';
import type { StatusCategory } from '../types/status';

type SortOption = 'code-asc' | 'code-desc' | 'category';

export function StatusCodes() {
  useSEO({
    title: 'HTTP Status Codes List — 1xx, 2xx, 3xx, 4xx & 5xx',
    description: 'Browse HTTP status codes from 100 to 599 with meanings, API use cases, examples, and guidance on when to use each response code.',
    canonical: '/status-codes',
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = (searchParams.get('category') as StatusCategory | 'all') || 'all';
  const tagFilter = searchParams.get('tag') || 'all';
  const sort = (searchParams.get('sort') as SortOption) || 'code-asc';

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const filteredAndSortedCodes = useMemo(() => {
    let result = statusCodes;

    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter(c => c.category === categoryFilter);
    }

    // Filter by tag
    if (tagFilter === 'common') result = result.filter(c => c.common);
    if (tagFilter === 'rare') result = result.filter(c => !c.common);
    if (tagFilter === 'deprecated') result = result.filter(c => c.deprecated);

    // Sort
    result.sort((a, b) => {
      if (sort === 'code-asc') return a.code - b.code;
      if (sort === 'code-desc') return b.code - a.code;
      if (sort === 'category') {
        const catOrder = { 'informational': 1, 'success': 2, 'redirection': 3, 'client-error': 4, 'server-error': 5 };
        if (catOrder[a.category] !== catOrder[b.category]) {
          return catOrder[a.category] - catOrder[b.category];
        }
        return a.code - b.code;
      }
      return 0;
    });

    return result;
  }, [categoryFilter, tagFilter, sort]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Status Codes</h1>
          <p className="text-muted-foreground">Explore all {statusCodes.length} HTTP status codes.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-sm">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-muted border-none rounded-md px-2 py-1.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm cursor-pointer"
              value={categoryFilter}
              onChange={e => updateParam('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="informational">1xx Informational</option>
              <option value="success">2xx Success</option>
              <option value="redirection">3xx Redirection</option>
              <option value="client-error">4xx Client Error</option>
              <option value="server-error">5xx Server Error</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <select
              className="bg-muted border-none rounded-md px-2 py-1.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm cursor-pointer"
              value={tagFilter}
              onChange={e => updateParam('tag', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="common">Commonly Used</option>
              <option value="rare">Rare / Edge Cases</option>
              <option value="deprecated">Deprecated</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <SortAsc className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-muted border-none rounded-md px-2 py-1.5 outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm cursor-pointer"
              value={sort}
              onChange={e => updateParam('sort', e.target.value)}
            >
              <option value="code-asc">Code (Ascending)</option>
              <option value="code-desc">Code (Descending)</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAndSortedCodes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAndSortedCodes.map(status => (
            <StatusCard key={status.code} status={status} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p>No status codes match the selected filters.</p>
          <button 
            onClick={() => setSearchParams({})}
            className="mt-4 text-primary hover:underline text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
