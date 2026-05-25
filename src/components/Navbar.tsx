import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mountain, Grid3X3, User, Menu, X, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { setAdminAuth, isAdminAuthed } from '@/pages/AdminLogin';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'dsl2024';

const navLinks = [
  { to: '/works', label: '作品', icon: Grid3X3 },
  { to: '/about', label: '关于', icon: User },
];

// ── 登录 Modal ─────────────────────────────────────────────
function LoginModal({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // 点击 backdrop 关闭
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
        setAdminAuth();
        onClose();
        navigate('/admin');
      } else {
        setError('账号或密码错误');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-mist-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-mist-100 p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-mist-400 hover:text-mist-700 hover:bg-mist-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-summit-500 to-lens-600 flex items-center justify-center shadow-sm">
            <Mountain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-mist-900 text-sm">后台管理</h2>
            <p className="text-xs text-mist-400">请先登录以继续</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-mist-600 mb-1">账号</label>
            <input
              ref={inputRef}
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              className="w-full px-3.5 py-2.5 border border-mist-200 rounded-xl text-sm focus:outline-none focus:border-mist-400 transition-colors"
              placeholder="请输入账号"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-mist-600 mb-1">密码</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className="w-full px-3.5 py-2.5 border border-mist-200 rounded-xl text-sm focus:outline-none focus:border-mist-400 transition-colors pr-10"
                placeholder="请输入密码"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mist-400 hover:text-mist-600 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-lg">
              <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="text-xs text-red-600">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full py-2.5 bg-mist-900 text-white text-sm font-medium rounded-xl hover:bg-mist-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            {loading ? '验证中...' : '登录'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Navbar ──────────────────────────────────────────────────
export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const authed = isAdminAuthed();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || loginOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, loginOpen]);

  return (
    <>
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
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-summit-500 to-lens-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <span
                className={cn(
                  'font-bold tracking-tight transition-all duration-300',
                  scrolled ? 'text-mist-900 text-sm' : 'text-white text-base'
                )}
              >
                登山路
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label }) => {
                const isActive = location.pathname === to || (to === '/works' && location.pathname.startsWith('/work/'));
                return (
                  <Link
                    key={to}
                    to={to}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm transition-all duration-200',
                      scrolled
                        ? isActive ? 'text-mist-900 font-medium' : 'text-mist-500 hover:text-mist-800'
                        : isActive ? 'text-white font-medium' : 'text-white/70 hover:text-white'
                    )}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* 登录入口 */}
              {authed ? (
                <Link
                  to="/admin"
                  className={cn(
                    'ml-1 px-3.5 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5',
                    scrolled ? 'text-mist-500 hover:text-mist-800' : 'text-white/70 hover:text-white'
                  )}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  后台
                </Link>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className={cn(
                    'ml-1 px-3.5 py-2 rounded-lg text-sm transition-colors flex items-center gap-1.5',
                    scrolled ? 'text-mist-400 hover:text-mist-700' : 'text-white/60 hover:text-white'
                  )}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  登录
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                'md:hidden p-2 rounded-lg transition-colors',
                scrolled ? 'text-mist-600 hover:bg-mist-100' : 'text-white/80 hover:text-white'
              )}
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

              {/* 移动端登录 */}
              <div className="border-t border-mist-100 mt-1 pt-1">
                {authed ? (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-mist-600 hover:bg-mist-50 transition-all"
                  >
                    <LogIn className="w-4 h-4" />
                    后台管理
                  </Link>
                ) : (
                  <button
                    onClick={() => { setMobileOpen(false); setLoginOpen(true); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-mist-600 hover:bg-mist-50 transition-all"
                  >
                    <LogIn className="w-4 h-4" />
                    登录
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
}
