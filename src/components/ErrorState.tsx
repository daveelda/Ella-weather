import { CloudOff, RefreshCw, SearchX } from 'lucide-react';
import './ErrorState.css';

interface ErrorStateProps {
  message: string;
  retryQuery?: string;
  onRetry: (query: string) => void;
}

export default function ErrorState({ message, retryQuery, onRetry }: ErrorStateProps) {
  const isNotFound = message.toLowerCase().includes('not found');

  return (
    <div className="error-state" role="alert">
      <div className="error-icon">
        {isNotFound ? <SearchX size={48} strokeWidth={1.4} /> : <CloudOff size={48} strokeWidth={1.4} />}
      </div>
      <div className="error-content">
        <h3 className="error-title">{isNotFound ? 'City not found' : 'Something went wrong'}</h3>
        <p className="error-message">{message}</p>
      </div>
      {retryQuery && !isNotFound && (
        <button className="error-retry" onClick={() => onRetry(retryQuery)} aria-label="Retry search">
          <RefreshCw size={16} />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
}
