import { Link } from 'react-router-dom';
import { Mountain } from 'lucide-react';

const footerLinks = [
  { label: '作品', to: '/works' },
  { label: '关于', to: '/about' },
];

// 社交媒体图标 SVG（内联，避免外部字体库依赖）
function BilibiliIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
    </svg>
  );
}

function DouyinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.82a8.16 8.16 0 0 0 4.77 1.52V6.89a4.85 4.85 0 0 1-1-.2z"/>
    </svg>
  );
}

function XiaohongshuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.204c0 4.834-3.93 8.754-8.78 8.754-4.848 0-8.778-3.92-8.778-8.754C3.442 7.371 7.372 3.45 12.22 3.45c4.85 0 8.78 3.92 8.78 8.754zm-5.098-3.535h-1.663V7.286c0-.192-.157-.348-.35-.348h-1.344c-.193 0-.35.156-.35.348v1.383H10.53c-.193 0-.35.156-.35.348v1.22c0 .192.157.348.35.348h2.665v1.262H10.53c-.193 0-.35.156-.35.348v.898l-2.086 3.5c-.102.17-.046.39.125.49l1.168.69c.17.1.39.044.49-.127l1.558-2.614v4.166c0 .192.157.348.35.348h1.344c.193 0 .35-.156.35-.348v-4.166l1.558 2.614c.1.17.32.227.49.127l1.168-.69c.17-.1.227-.32.125-.49l-2.085-3.5v-.898c0-.192-.157-.348-.35-.348h-2.664V10.9h2.664c.193 0 .35-.156.35-.348v-1.22c0-.19-.157-.348-.35-.348h-.665V7.921h.665c.193 0 .35-.156.35-.348V6.33c0-.193-.157-.35-.35-.35h-1.344c-.193 0-.35.157-.35.35v1.244h-.646V7.286c0-.192-.157-.348-.35-.348h-1.344c-.193 0-.35.156-.35.348v1.383H9.762v-.001z"/>
    </svg>
  );
}

// TODO: 替换为你真实的主页链接
const socialLinks = [
  {
    label: '小红书',
    href: 'https://www.xiaohongshu.com/user/profile/YOUR_ID',
    Icon: XiaohongshuIcon,
    hoverColor: 'hover:text-rose-500',
  },
  {
    label: '抖音',
    href: 'https://www.douyin.com/user/YOUR_ID',
    Icon: DouyinIcon,
    hoverColor: 'hover:text-mist-900',
  },
  {
    label: 'B站',
    href: 'https://space.bilibili.com/YOUR_UID',
    Icon: BilibiliIcon,
    hoverColor: 'hover:text-sky-500',
  },
];

export { BilibiliIcon, DouyinIcon, XiaohongshuIcon, socialLinks };

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

          {/* Links + Social Icons */}
          <div className="flex items-center gap-6">
            {footerLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-mist-500 hover:text-mist-800 transition-colors"
              >
                {label}
              </Link>
            ))}

            {/* 分隔线 */}
            <div className="w-px h-4 bg-mist-200" />

            {/* 社交媒体图标 */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className={`text-mist-400 transition-colors ${hoverColor}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
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
