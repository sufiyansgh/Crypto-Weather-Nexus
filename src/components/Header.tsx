
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/userPreferencesSlice';
import { Button } from './ui/button';
import { Sun, Moon } from 'lucide-react';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.userPreferences);
  
  // Initialize theme on component mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  
  return (
    <header className="bg-card border-b border-border py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">
        CryptoWeather Nexus
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/weather" className="hover:text-primary transition-colors">
            Weather
          </Link>
          <Link to="/crypto" className="hover:text-primary transition-colors">
            Crypto
          </Link>
          <Link to="/news" className="hover:text-primary transition-colors">
            News
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost" 
            size="icon"
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            className="text-foreground"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
