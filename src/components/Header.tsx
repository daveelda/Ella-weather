import { Moon, Sun, Cloud } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo" aria-hidden="true">
          <Cloud size={28} strokeWidth={1.8} />
        </div>
        <div className="header-text">
          <span className="header-name">ELLA'a Weather</span>
          <span className="header-tagline">Weather, wherever life takes you.</span>
        </div>
      </div>
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
