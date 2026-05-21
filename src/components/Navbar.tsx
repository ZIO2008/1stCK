import { Link, useLocation } from 'react-router-dom';
import { Mountain, Grid3X3, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/works', label: '作品', icon: Grid3X3 },
  { to: '/about', label: '关于', icon: User },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        scrolled
          ? 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300',
            scrolled ? 'h-14' : 'h-16'
          )}
        >
          {/* Logo — 极简 */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-summit-500 to-lens-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
              <Mountain className="w-4 h-4 text-white" />
            </div>
            <span
              className={cn(
                'font-bold text-mist-900 tracking-tight transition-all duration-300',
                scrolled ? 'text-sm' : 'text-base'
              )}
            >
              登山路
            </span>
          </Link>

          {/* Desktop Nav — 只有两个链接 */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => {
              const isActive = location.pathname === to || (to === '/works' && location.pathname.startsWith('/work/'));
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm transition-all duration-200',
                    isActive
                      ? 'text-mist-900 font-medium'
                      : 'text-mist-500 hover:text-mist-800'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-mist-600 hover:bg-mist-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 top-0 z-40 transition-all duration-300',
          mobileOpen ? 'visible' : 'invisible'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-mist-900/20 backdrop-blur-sm transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={cn(
            'absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-elevated',
            'transition-all duration-300 ease-out',
            mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          )}
        >
          <div className="p-4 flex flex-col gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to || (to === '/works' && location.pathname.startsWith('/work/'));
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? 'bg-mist-900 text-white'
                      : 'text-mist-600 hover:bg-mist-50'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
