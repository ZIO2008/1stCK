import { useState } from 'react';
import { Mountain, Lock, Eye, EyeOff } from 'lucide-react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'dsl2024';
const SESSION_KEY = 'dsl_admin_auth';

interface AdminLoginProps {
  onSuccess: () => void;
}

export function setAdminAuth() {
  sessionStorage.setItem(SESSION_KEY, '1');
}

export function clearAdminAuth() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 模拟短暂延迟防暴力猜测
    setTimeout(() => {
      if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
        setAdminAuth();
        onSuccess();
      } else {
        setError('账号或密码错误');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mist-50 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-summit-500 to-lens-600 flex items-center justify-center shadow-md mb-3">
            <Mountain className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-serif text-xl text-mist-900 font-bold">登山路后台</h1>
          <p className="text-sm text-mist-400 mt-1">请先登录以继续</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-mist-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-mist-700 mb-1.5">账号</label>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setError(''); }}
                className="w-full px-4 py-2.5 border border-mist-200 rounded-xl text-sm focus:outline-none focus:border-mist-400 transition-colors"
                placeholder="请输入账号"
                autoComplete="username"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-mist-700 mb-1.5">密码</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  className="w-full px-4 py-2.5 border border-mist-200 rounded-xl text-sm focus:outline-none focus:border-mist-400 transition-colors pr-10"
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
              className="w-full py-2.5 bg-mist-900 text-white text-sm font-medium rounded-xl hover:bg-mist-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '验证中...' : '登录'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-mist-300 mt-6">
          仅限创作者本人使用
        </p>
      </div>
    </div>
  );
}
