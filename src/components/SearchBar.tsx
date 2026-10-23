import { useState, type KeyboardEvent } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [touched, setTouched] = useState(false);

  const isEmpty = touched && query.trim() === '';

  const handleSubmit = () => {
    setTouched(true);
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="search-container">
      <div className={`search-wrapper${isEmpty ? ' search-error' : ''}`}>
        <span className="search-icon" aria-hidden="true">
          <MapPin size={18} />
        </span>
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={e => { setQuery(e.target.value); setTouched(false); }}
          onKeyDown={handleKeyDown}
          placeholder="Search a city, e.g. Lagos or Abuja"
          aria-label="City search"
          disabled={isLoading}
          autoComplete="off"
          spellCheck="false"
        />
        <button
          className="search-button"
          onClick={handleSubmit}
          disabled={isLoading}
          aria-label="Search"
        >
          {isLoading ? (
            <Loader2 size={18} className="spin" />
          ) : (
            <>
              <Search size={16} />
              <span>Search</span>
            </>
          )}
        </button>
      </div>
      {isEmpty && (
        <p className="search-validation" role="alert">
          Please enter a city name.
        </p>
      )}
    </div>
  );
}
