import { Link } from 'react-router-dom';
import { Layers } from 'lucide-react';
import type { Work } from '@/types';
import { WORK_TYPE_MAP } from '@/types';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  work: Work;
  /** 来源页面，用于返回按钮跳转 */
  from?: string;
}

/**
 * 统一作品卡片
 * 照片页 & 视频页共用同一设计语言
 */
export default function WorkCard({ work, from }: WorkCardProps) {
  const typeInfo = WORK_TYPE_MAP[work.type];
  const year = work.year || work.date?.slice(0, 4) || '';
  const isPortrait = work.orientation === 'portrait';

  // 照片页优先使用 photoCoverImage
  const imgSrc = from === 'works' ? (work.photoCoverImage || work.coverImage) : work.coverImage;

  const linkTo = from ? `/work/${work.id}?from=${from}` : `/work/${work.id}`;

  return (
    <Link
      to={linkTo}
      className="group block cursor-pointer animate-fade-in"
    >
      {/* 图片容器 */}
      <div
        className={cn(
          'relative overflow-hidden rounded-xl bg-stone-100',
          isPortrait ? 'aspect-[3/4]' : 'aspect-[16/9]',
        )}
      >
        <img
          src={imgSrc}
          alt={work.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* 组图标识 */}
        {work.isGroup && (
          <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-white text-[10px] font-medium z-10">
            <Layers className="w-3 h-3" />
            组图
          </span>
        )}

        {/* Hover 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover 文字信息 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white text-sm font-medium leading-snug line-clamp-2">
            {work.title}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-white/70 text-xs">{year}</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-white/70 text-xs">{typeInfo.label}</span>
            {work.duration && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-white/70 text-xs">{work.duration}</span>
              </>
            )}
          </div>
        </div>
      </div>

    </Link>
  );
}
