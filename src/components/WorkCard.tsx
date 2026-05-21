import { Link } from 'react-router-dom';
import type { Work } from '@/types';
import { WORK_TYPE_MAP } from '@/types';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  work: Work;
}

/**
 * 作品卡片 —— 极简网格版
 * 只展示图片，hover 时显示标题和类型
 * 不展示标签、时长、客户
 */
export default function WorkCard({ work }: WorkCardProps) {
  const typeInfo = WORK_TYPE_MAP[work.type];

  return (
    <Link
      to={`/work/${work.id}`}
      className="group block relative rounded-xl overflow-hidden bg-mist-100 animate-scale-in"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={work.coverImage}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-mist-900/70 via-mist-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Type label — always visible, top left */}
      <div className="absolute top-3 left-3">
        <span
          className={cn(
            'inline-block px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase',
            'bg-white/80 backdrop-blur-sm text-mist-700'
          )}
        >
          {typeInfo.label}
        </span>
      </div>

      {/* Title — visible on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="text-white font-serif text-lg font-bold tracking-tight leading-snug">
          {work.title}
        </h3>
      </div>
    </Link>
  );
}
