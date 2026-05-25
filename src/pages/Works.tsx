import { useState, useMemo, useEffect } from 'react';
import { useWorks } from '@/context/WorksContext';
import type { WorkType } from '@/types';
import FilterBar from '@/components/FilterBar';
import WorkCard from '@/components/WorkCard';
import { cn } from '@/lib/utils';

type OrientationTab = 'landscape' | 'portrait';

export default function Works() {
  const { works } = useWorks();
  const [activeType, setActiveType] = useState<WorkType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 读取首页"查看全部竖屏"传过来的 sessionStorage
  const initOrientation = (): OrientationTab => {
    const saved = sessionStorage.getItem('works_orientation');
    if (saved === 'portrait') {
      sessionStorage.removeItem('works_orientation');
      return 'portrait';
    }
    return 'landscape';
  };
  const [orientation, setOrientation] = useState<OrientationTab>(initOrientation);

  // 页面挂载时滚到顶
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // 按横竖屏分组
  const landscapeWorks = useMemo(() => works.filter((w) => w.orientation !== 'portrait'), [works]);
  const portraitWorks = useMemo(() => works.filter((w) => w.orientation === 'portrait'), [works]);

  const currentPool = orientation === 'landscape' ? landscapeWorks : portraitWorks;

  const filteredWorks = useMemo(() => {
    let result = currentPool;

    if (activeType) {
      result = result.filter((w) => w.type === activeType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q)) ||
          w.client?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeType, searchQuery, currentPool]);

  const handleOrientationChange = (tab: OrientationTab) => {
    setOrientation(tab);
    setActiveType(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* 页头 */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-mist-900 tracking-tight mb-4">
            作品
          </h1>
          <p className="text-mist-500 text-base max-w-md">
            从商业委托到个人创作，每一部都是通往更高处的路标。
          </p>
        </div>

        {/* 横竖屏 Tab 切换 */}
        <div className="flex items-center gap-1 mb-8 border-b border-mist-100 pb-0">
          <button
            onClick={() => handleOrientationChange('landscape')}
            className={cn(
              'relative px-5 py-3 text-sm font-medium transition-colors duration-200',
              orientation === 'landscape'
                ? 'text-mist-900'
                : 'text-mist-400 hover:text-mist-600'
            )}
          >
            横屏
            {orientation === 'landscape' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-mist-900 rounded-t" />
            )}
            <span className="ml-1.5 text-xs text-mist-400 font-normal">
              {landscapeWorks.length}
            </span>
          </button>

          <button
            onClick={() => handleOrientationChange('portrait')}
            className={cn(
              'relative px-5 py-3 text-sm font-medium transition-colors duration-200',
              orientation === 'portrait'
                ? 'text-mist-900'
                : 'text-mist-400 hover:text-mist-600'
            )}
          >
            竖屏
            {orientation === 'portrait' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-mist-900 rounded-t" />
            )}
            <span className="ml-1.5 text-xs text-mist-400 font-normal">
              {portraitWorks.length}
            </span>
          </button>
        </div>

        {/* 筛选 + 搜索 */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          <div className="flex-1">
            <FilterBar activeType={activeType} onTypeChange={setActiveType} />
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索作品..."
              className="w-full px-4 py-2.5 text-sm bg-mist-50 border border-mist-200 rounded-full focus:outline-none focus:border-mist-400 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mist-400 hover:text-mist-600"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* 作品网格 */}
        {filteredWorks.length > 0 ? (
          <div
            className={cn(
              'grid gap-5',
              orientation === 'landscape'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            )}
          >
            {filteredWorks.map((work, i) => (
              <div
                key={work.id}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <WorkCard work={work} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-mist-400 text-lg font-serif">没有找到匹配的作品</p>
            <button
              onClick={() => {
                setActiveType(null);
                setSearchQuery('');
              }}
              className="mt-4 text-sm text-lens-600 hover:text-lens-700 transition-colors"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
