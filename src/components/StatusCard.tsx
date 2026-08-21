import { Link } from 'react-router-dom';
import type { StatusCode } from '../types/status';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Badge } from './ui/Badge';
import { getCategoryName } from '../utils/statusHelpers';

interface StatusCardProps {
  status: StatusCode;
}

export function StatusCard({ status }: StatusCardProps) {
  return (
    <Link to={`/status-codes/${status.code}`} className="block h-full group">
      <Card className="h-full group-hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-start justify-between">
            <Badge category={status.category} variant="outline" className="mb-2">
              {status.code}
            </Badge>
            {status.deprecated && (
              <Badge variant="solid" className="bg-red-500/10 text-red-500 border-red-500/20">
                Deprecated
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl mb-1">{status.name}</CardTitle>
          <div className="text-xs text-muted-foreground mb-3 font-medium">
            {getCategoryName(status.category)}
          </div>
          <CardDescription className="line-clamp-2">
            {status.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
