import type { StatusCategory } from '../types/status';

export function getCategoryColor(category: StatusCategory): string {
  switch (category) {
    case 'informational':
      return 'text-info-500 bg-info-500/10 border-info-500/20';
    case 'success':
      return 'text-success-500 bg-success-500/10 border-success-500/20';
    case 'redirection':
      return 'text-warning-500 bg-warning-500/10 border-warning-500/20';
    case 'client-error':
      return 'text-error-500 bg-error-500/10 border-error-500/20';
    case 'server-error':
      return 'text-server-500 bg-server-500/10 border-server-500/20';
    default:
      return 'text-muted-foreground bg-muted border-muted';
  }
}

export function getCategoryBorderColor(category: StatusCategory): string {
  switch (category) {
    case 'informational': return 'border-info-500/50';
    case 'success': return 'border-success-500/50';
    case 'redirection': return 'border-warning-500/50';
    case 'client-error': return 'border-error-500/50';
    case 'server-error': return 'border-server-500/50';
    default: return 'border-border';
  }
}

export function getCategoryName(category: StatusCategory): string {
  switch (category) {
    case 'informational': return '1xx Informational';
    case 'success': return '2xx Success';
    case 'redirection': return '3xx Redirection';
    case 'client-error': return '4xx Client Error';
    case 'server-error': return '5xx Server Error';
    default: return 'Unknown';
  }
}
