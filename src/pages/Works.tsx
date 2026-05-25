import { useState, useMemo, useEffect } from 'react';
import { useWorks } from '@/context/WorksContext';
import type { WorkType } from '@/types';
import { WORK_TYPE_MAP } from '@/types';
import WorkCard from '@/components/WorkCard';
import { cn } from '@/lib/utils';
import { Camera, Search, X } from 'lucide-react';

/* ─── 常量 ─────────────────────────────── */
const ORIENTATION_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'landscape', label: '横屏' },
  { value: 'portrait', label: '竖屏' },
] as const;

const WORK_TYPES = Object.keys(WORK_TYPE_MAP) as WorkType[];

export default function Works() {
  const { works } = useWorks();
  const [search, setSearch] = useState('');
  const [orientation, setOrientation] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');

  // 读取首页"查看全部竖屏"传过来的 sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('works_orientation');
    if (saved === 'portrait') {
      sessionStorage.removeItem('works_orientation');
      setOrientation('portrait');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  /* ─── 过滤 ─────────────────────────────── */
  const photoWorks = useMemo(() => works.filter((w) => w.hasPhoto), [works]);

  const filteredWorks = useMemo(() => {
    let result = photoWorks;

    if (orientation !== 'all') {
      result = result.filter((w) => w.orientation === orientation);
    }

    if (activeType !== 'all') {
      result = result.filter((w) => w.type === activeType);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q)) ||
          (w.subtitle && w.subtitle.toLowerCase().includes(q)) ||
          (w.client && w.client.toLowerCase().includes(q)),
      );
    }

    return result;
  }, [photoWorks, orientation, activeType, search]);

  /* ─── 统计 ─────────────────────────────── */
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: photoWorks.length };
    for (const t of WORK_TYPES) {
      counts[t] = photoWorks.filter((w) => w.type === t).length;
    }
    return counts;
  }, [photoWorks]);

  /* ─── 渲染 ─────────────────────────────── */
  return (
    <div className="min-h-screen bg-white">
      {/* ── 顶部标题区 ─────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 pt-28 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Camera className="w-7 h-7 text-stone-800" />
          <h1 className="text-3xl font-light tracking-wide text-stone-900">照片</h1>
        </div>
        <p className="text-stone-400 text-sm tracking-wide">
          每一帧都是时间的切片
        </p>
      </div>

      {/* ── 筛选栏 ────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          {/* 搜索 */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索作品名称、描述、标签……"
              className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-100 rounded-lg text-sm text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-stone-300 focus:bg-white transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 方向 + 类型 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400 mr-1">方向</span>
            {ORIENTATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setOrientation(opt.value)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                  orientation === opt.value
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200',
                )}
              >
                {opt.label}
              </button>
            ))}

            <span className="w-px h-5 bg-stone-200 mx-2" />

            <span className="text-xs text-stone-400 mr-1">类型</span>
            <button
              onClick={() => setActiveType('all')}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                activeType === 'all'
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200',
              )}
            >
              全部 ({typeCounts.all})
            </button>
            {WORK_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
                  activeType === t
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200',
                )}
              >
                {WORK_TYPE_MAP[t].label}
                {typeCounts[t] > 0 && (
                  <span className="ml-1 opacity-60">({typeCounts[t]})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 网格画廊 ────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
        {filteredWorks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-stone-300">
            <Search className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-sm">没有找到匹配的作品</p>
            <button
              onClick={() => {
                setSearch('');
                setOrientation('all');
                setActiveType('all');
              }}
              className="mt-3 text-xs text-stone-400 underline hover:text-stone-600"
            >
              清除所有筛选
            </button>
          </div>
        ) : (
          <div
            className={cn(
              'grid gap-5',
              orientation === 'portrait'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {filteredWorks.map((work, i) => (
              <div
                key={work.id}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <WorkCard work={work} from="works" />
              </div>
            ))}
          </div>
        )}

        {/* 结果计数 */}
        <div className="text-center mt-12 pb-16">
          <p className="text-xs text-stone-300 tracking-wide">
            共 {filteredWorks.length} 件作品
            {orientation !== 'all' &&
              ` · ${ORIENTATION_OPTIONS.find((o) => o.value === orientation)?.label}`}
            {activeType !== 'all' &&
              ` · ${WORK_TYPE_MAP[activeType as WorkType]?.label}`}
            {search && ` · "${search}"`}
          </p>
        </div>
      </div>
    </div>
  );
}
