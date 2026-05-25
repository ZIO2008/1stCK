import { Link } from 'react-router-dom';
import type { Work } from '@/types';
import { WORK_TYPE_MAP } from '@/types';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  work: Work;
}

/**
 * 作品卡片 —— 极简网格版
 * hover 时显示标题 + 三个维度小字（年份 / 内容 / 工具）
 */
export default function WorkCard({ work }: WorkCardProps) {
  const typeInfo = WORK_TYPE_MAP[work.type];

  // 年份：优先 year 字段，fallback 从 date 提取
  const year = work.year || work.date?.slice(0, 4) || '';

  // 三维度 meta
  const meta = [
    year ? { icon: '📅', text: year } : null,
    work.subject ? { icon: '🎬', text: work.subject } : null,
    work.gear ? { icon: '📷', text: work.gear } : null,
  ].filter(Boolean) as { icon: string; text: string }[];

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
      <div className="absolute inset-0 bg-gradient-to-t from-mist-900/80 via-mist-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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

      {/* Title + meta — visible on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <h3 className="text-white font-serif text-base font-bold tracking-tight leading-snug mb-2">
          {work.title}
        </h3>

        {meta.length > 0 && (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {meta.map(({ icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1 text-white/70 text-[11px] leading-none"
              >
                <span className="text-[10px]">{icon}</span>
                <span>{text}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
