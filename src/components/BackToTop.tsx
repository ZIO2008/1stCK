import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="回到顶部"
      className={cn(
        'fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full',
        'bg-white/90 backdrop-blur-md shadow-card hover:shadow-card-hover',
        'flex items-center justify-center',
        'transition-all duration-300 ease-out',
        'hover:bg-white hover:scale-110',
        'active:scale-95',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ArrowUp
        className={cn(
          'w-5 h-5 transition-all duration-300',
          hovered ? 'text-lens-600 -translate-y-0.5' : 'text-mist-500'
        )}
      />
    </button>
  );
}
