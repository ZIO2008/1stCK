import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Layers, Film } from 'lucide-react';
import { useWorks } from '@/context/WorksContext';
import { WORK_TYPE_MAP, type WorkType } from '@/types';
import { cn } from '@/lib/utils';

/* ─── 常量 ─────────────────────────────────────────── */
const ORIENTATION_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'landscape', label: '横屏' },
  { value: 'portrait', label: '竖屏' },
] as const;

const WORK_TYPES = Object.keys(WORK_TYPE_MAP) as WorkType[];

export default function Video() {
  const { works } = useWorks();

  /* ─── 状态 ─────────────────────────────── */
  const [search, setSearch] = useState('');
  const [orientation, setOrientation] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');

  /* ─── 过滤 ─────────────────────────────── */
  const filteredWorks = useMemo(() => {
    let result = works;

    // 方向筛选
    if (orientation !== 'all') {
      result = result.filter((w) => w.orientation === orientation);
    }

    // 类型筛选
    if (activeType !== 'all') {
      result = result.filter((w) => w.type === activeType);
    }

    // 搜索
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
  }, [works, orientation, activeType, search]);

  /* ─── 统计 ─────────────────────────────── */
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: works.length };
    for (const t of WORK_TYPES) {
      counts[t] = works.filter((w) => w.type === t).length;
    }
    return counts;
  }, [works]);

  /* ─── 渲染 ─────────────────────────────── */
  return (
    <div className="min-h-screen bg-white">
      {/* ── 顶部标题区 ─────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 pt-28 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <Film className="w-7 h-7 text-stone-800" />
          <h1 className="text-3xl font-light tracking-wide text-stone-900">影像</h1>
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
              placeholder="搜索作品名称、描述、标签..."
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
            {/* 方向筛选项 */}
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

            {/* 类型筛选项 */}
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

      {/* ── 瀑布流画廊 ────────────────────── */}
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
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {filteredWorks.map((work, i) => (
              <Link
                key={work.id}
                to={`/work/${work.id}`}
                className="block break-inside-avoid mb-5 group cursor-pointer"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* 图片容器 */}
                <div
                  className={cn(
                    'relative overflow-hidden rounded-xl bg-stone-100',
                    work.orientation === 'portrait'
                      ? 'aspect-[3/4]'
                      : 'aspect-[16/9]',
                  )}
                >
                  <img
                    src={work.coverImage}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* 组图标识 */}
                  {work.isGroup && (
                    <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-white text-[10px] font-medium">
                      <Layers className="w-3 h-3" />
                      组图
                    </span>
                  )}

                  {/* Hover 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover 文字信息 */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-medium leading-snug">
                      {work.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-white/70 text-xs">
                        {work.year || work.date.slice(0, 4)}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span className="text-white/70 text-xs">
                        {WORK_TYPE_MAP[work.type].label}
                      </span>
                      {work.duration && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-white/40" />
                          <span className="text-white/70 text-xs">
                            {work.duration}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* 卡片底部信息（非hover时可见） */}
                <div className="mt-2.5 px-0.5">
                  <p className="text-sm text-stone-700 font-medium truncate group-hover:text-stone-900 transition-colors">
                    {work.title}
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {WORK_TYPE_MAP[work.type].label} · {work.year || work.date.slice(0, 4)}
                    {work.isGroup && (
                      <span className="inline-flex items-center ml-1.5 text-stone-300">
                        <Layers className="w-3 h-3 mr-0.5" />
                        组图
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 结果计数 */}
        <div className="text-center mt-12 pb-16">
          <p className="text-xs text-stone-300 tracking-wide">
            共 {filteredWorks.length} 件作品
            {orientation !== 'all' &&
              ` · ${ORIENTATION_OPTIONS.find((o) => o.value === orientation)?.label}`}
            {activeType !== 'all' && ` · ${WORK_TYPE_MAP[activeType as WorkType]?.label}`}
            {search && ` · "${search}"`}
          </p>
        </div>
      </div>
    </div>
  );
}
