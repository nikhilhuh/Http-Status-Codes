import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { List, ArrowLeftRight, FlaskConical, BrainCircuit, Info, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Status Codes', href: '/status-codes', icon: List },
  { name: 'Compare', href: '/compare', icon: ArrowLeftRight },
  { name: 'Playground', href: '/playground', icon: FlaskConical },
  { name: 'Quiz', href: '/quiz', icon: BrainCircuit },
  { name: 'About', href: '/about', icon: Info },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  useEffect(() => {
    const handleResize = () => {
      if (isOpen && window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    // Run on mount and whenever isOpen changes
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background backdrop-blur-md md:hidden h-[100dvh]"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 border-r border-border bg-background transition-transform duration-300 ease-in-out h-[100dvh] md:sticky md:top-14 md:z-30 md:h-[calc(100vh-3.5rem)] md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col px-4 py-6 overflow-y-auto">
          <div className="flex items-center justify-between md:hidden mb-6">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={onClose} className="p-2 -mr-2 rounded-md hover:bg-muted text-muted-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => {
                  if (window.innerWidth < 768) onClose();
                }}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-primary"
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
