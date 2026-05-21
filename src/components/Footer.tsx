import { Link } from 'react-router-dom';
import { Mountain } from 'lucide-react';

const footerLinks = [
  { label: '作品', to: '/works' },
  { label: '关于', to: '/about' },
];

const socialLinks = [
  { label: 'B站', href: '#' },
  { label: 'Email', href: 'mailto:hello@dengshanlu.com' },
];

export default function Footer() {
  return (
    <footer className="border-t border-mist-200">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-summit-500 to-lens-600 flex items-center justify-center shadow-sm">
              <Mountain className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-mist-900 text-sm">登山路</span>
              <p className="text-xs text-mist-400 mt-0.5">影像创作者</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            {footerLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-mist-500 hover:text-mist-800 transition-colors"
              >
                {label}
              </Link>
            ))}
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-mist-400 hover:text-mist-600 transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-mist-100">
          <p className="text-xs text-mist-400">
            &copy; {new Date().getFullYear()} 登山路
          </p>
        </div>
      </div>
    </footer>
  );
}
