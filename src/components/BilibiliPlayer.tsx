import { useMemo } from 'react';
import { ExternalLink } from 'lucide-react';

interface BilibiliPlayerProps {
  /** B站视频链接，如 https://www.bilibili.com/video/BV1xxxxx 或 https://b23.tv/xxxxx */
  url: string;
  /** 播放器宽高比，默认 16/9 */
  aspectRatio?: number;
  /** 是否显示"在B站观看"链接 */
  showLink?: boolean;
  /** 额外 className */
  className?: string;
}

/**
 * 解析B站视频链接，提取 BV号 或 AV号
 * 支持格式：
 *   - https://www.bilibili.com/video/BV1xxxxx
 *   - https://www.bilibili.com/video/BV1xxxxx?p=2
 *   - https://www.bilibili.com/video/av12345
 *   - https://b23.tv/BV1xxxxx
 *   - BV1xxxxx（纯BV号）
 */
function parseBilibiliUrl(url: string): { embedUrl: string; bvid?: string; aid?: string; page: number } | null {
  let bvid: string | undefined;
  let aid: string | undefined;
  let page = 1;

  // 纯BV号
  const bvOnly = url.match(/^(BV[a-zA-Z0-9]+)$/);
  if (bvOnly) {
    bvid = bvOnly[1];
  }

  // 标准URL格式
  if (!bvid) {
    const bvMatch = url.match(/\/video\/(BV[a-zA-Z0-9]+)/);
    if (bvMatch) bvid = bvMatch[1];
  }

  // AV号
  const avMatch = url.match(/\/video\/av(\d+)/);
  if (avMatch) aid = avMatch[1];

  // 分P参数
  const pMatch = url.match(/[?&]p=(\d+)/);
  if (pMatch) page = parseInt(pMatch[1], 10);

  if (!bvid && !aid) return null;

  const params = new URLSearchParams({
    high_quality: '1',
    danmaku: '0',
    autoplay: '0',
    p: String(page),
  });

  if (bvid) {
    params.set('bvid', bvid);
  } else if (aid) {
    params.set('aid', aid);
  }

  const embedUrl = `https://player.bilibili.com/player.html?${params.toString()}`;

  return { embedUrl, bvid, aid, page };
}

export default function BilibiliPlayer({
  url,
  aspectRatio = 16 / 9,
  showLink = true,
  className = '',
}: BilibiliPlayerProps) {
  const parsed = useMemo(() => parseBilibiliUrl(url), [url]);

  if (!parsed) {
    return (
      <div className={`rounded-2xl overflow-hidden bg-mist-100 ${className}`}>
        <div
          className="flex items-center justify-center text-mist-400"
          style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <ExternalLink className="w-6 h-6" />
            <p className="text-sm">视频链接格式无法识别</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lens-600 hover:text-lens-700 text-sm underline"
            >
              直接打开链接
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* 播放器容器 - 保持宽高比 */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-mist-900 shadow-card">
        <div style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}>
          <iframe
            src={parsed.embedUrl}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            allow="autoplay; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
          />
        </div>
      </div>

      {/* B站外链 */}
      {showLink && (
        <div className="flex items-center justify-between mt-3 px-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-mist-400 hover:text-lens-600 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            在B站观看
          </a>
          <span className="text-[10px] text-mist-300 tracking-wider">
            {parsed.bvid || `av${parsed.aid}`}
            {parsed.page > 1 && ` · P${parsed.page}`}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * 工具函数：判断一个URL是否是B站链接
 */
export function isBilibiliUrl(url: string): boolean {
  return /bilibili\.com|b23\.tv/.test(url);
}

/**
 * 工具函数：判断一个URL是否是可嵌入的视频链接
 */
export function isEmbeddableVideo(url: string): boolean {
  return isBilibiliUrl(url) || /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}
