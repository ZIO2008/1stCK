import { Link } from 'react-router-dom';
import type { Work } from '@/types';
import { WORK_TYPE_MAP } from '@/types';

interface FeaturedWorkProps {
  work: Work;
  /** 来源标识（用于返回导航），自动推断 */
  from?: string;
  /** 照片作品弹窗回调（传入后使用 div+onClick 代替 Link） */
  onClick?: (work: Work) => void;
}

/**
 * 首页精选作品 —— 大图 + 标题 + 一行描述
 * 极度克制，不展示标签/类型/时长
 */
export default function FeaturedWork({ work, from, onClick }: FeaturedWorkProps) {
  const typeColor = WORK_TYPE_MAP[work.type].color;
  const isPhoto = work.hasPhoto && !work.videoUrl;
  const linkFrom = from || (isPhoto ? 'works' : 'video');
  const linkTo = `/work/${work.id}?from=${linkFrom}`;

  // 共享内容
  const featuredContent = (
    <>
      <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        <img
          src={work.coverImage}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {/* 渐变遮罩 — 只在底部 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* 文字叠加 */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <span
          className="inline-block text-xs font-mono tracking-widest uppercase mb-3 opacity-80"
          style={{ color: `var(--color-${typeColor}-300)` }}
        >
          {WORK_TYPE_MAP[work.type].label}
        </span>
        <h2 className="font-serif text-2xl md:text-4xl font-bold text-white tracking-tight mb-2">
          {work.title}
        </h2>
        <p className="text-white/70 text-sm md:text-base max-w-lg">
          {work.description}
        </p>
      </div>
    </>
  );

  // 弹窗模式
  if (onClick) {
    return (
      <div
        className="group block relative overflow-hidden rounded-2xl animate-fade-in cursor-pointer"
        onClick={() => onClick(work)}
      >
        {featuredContent}
      </div>
    );
  }

  return (
    <Link
      to={linkTo}
      className="group block relative overflow-hidden rounded-2xl animate-fade-in"
    >
      {featuredContent}
    </Link>
  );
}
