import React from 'react';
import { Github } from 'lucide-react'
import { Switch } from './ui/switch';
import { useTheme } from '@/providers/theme-provider';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="container mx-auto max-w-4xl flex h-14 items-center justify-between px-4">

        <div className="flex items-center space-x-2">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
          >
            <circle
              cx="16"
              cy="16"
              r="15"
              className="stroke-primary"
              strokeWidth="2"
            />
            <path
              d="M8 12 H24 M8 16 H24 M8 20 H24"
              className="stroke-primary/50"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="2 2"
            />
            <path
              d="M10 18.5C10 18.5 12 21 16 21C20 21 22 18.5 22 18.5"
              className="stroke-primary"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            LOLgorithm
          </span>
        </div>


        <div className="flex items-center gap-5">
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            aria-label='Toggle theme'
          />
          <a
            href="https://github.com/f0rsakeN-afk/LOLgorithm"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-muted-foreground"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;