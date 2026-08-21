import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { SearchBar } from '../SearchBar';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => setIsSearchOpen(true);
    document.addEventListener('open-search', handleOpenSearch);
    return () => document.removeEventListener('open-search', handleOpenSearch);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)} 
        onSearchClick={() => setIsSearchOpen(true)}
      />
      
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 sm:px-8 max-w-5xl">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
      
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
