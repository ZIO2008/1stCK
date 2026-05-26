import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Work } from '@/types';
import { WORK_TYPE_MAP } from '@/types';
import BilibiliPlayer from '@/components/BilibiliPlayer';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface VideoModalProps {
  work: Work;
  allVideos: Work[];
  onClose: () => void;
  onNavigate: (work: Work) => void;
}

export default function VideoModal({ work, allVideos, onClose, onNavigate }: VideoModalProps) {
  const typeInfo = WORK_TYPE_MAP[work.type];
  const year = work.year || work.date?.slice(0, 4) || '';
  const currentIndex = allVideos.findIndex((v) => v.id === work.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allVideos.length - 1;

  // 键盘支持
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onNavigate(allVideos[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNavigate(allVideos[currentIndex + 1]);
      }
    },
    [onClose, onNavigate, allVideos, currentIndex, hasPrev, hasNext],
  );

  // 内容区点击：只有点击内容容器自身（即边距空白区域）才关闭
  const handleContentClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // 相关作品：同类型 + 标签重叠（排除当前）
  const relatedVideos = allVideos
    .filter((v) => v.id !== work.id)
    .sort((a, b) => {
      const aScore =
        (a.type === work.type ? 3 : 0) +
        a.tags.filter((t) => work.tags.includes(t)).length;
      const bScore =
        (b.type === work.type ? 3 : 0) +
        b.tags.filter((t) => work.tags.includes(t)).length;
      return bScore - aScore;
    })
    .slice(0, 9);

  return (
    <div className="fixed inset-0 z-50 bg-black/92 flex flex-col animate-fade-in">
      {/* ── 关闭按钮 ── */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-[70] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        title="关闭 (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* ── 左箭头 ── */}
      {hasPrev && (
        <button
          onClick={() => onNavigate(allVideos[currentIndex - 1])}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-[70] w-12 h-12 rounded-full bg-white/8 hover:bg-white/20 text-white flex items-center justify-center transition-all opacity-0 md:hover:opacity-100 md:group-hover:opacity-100"
          title="上一个 (←)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* ── 右箭头 ── */}
      {hasNext && (
        <button
          onClick={() => onNavigate(allVideos[currentIndex + 1])}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-[70] w-12 h-12 rounded-full bg-white/8 hover:bg-white/20 text-white flex items-center justify-center transition-all opacity-0 md:hover:opacity-100"
          title="下一个 (→)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* ── 滚动内容 ── */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden"
        onClick={handleContentClick}
      >
        {/* 视频播放器 */}
        <div className="w-full max-w-[900px] mx-auto pt-16 md:pt-20 px-4 md:px-6">
          <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/40">
            {work.videoUrl ? (
              <BilibiliPlayer url={work.videoUrl} showLink={false} />
            ) : (
              <div className="aspect-video bg-stone-900 flex items-center justify-center text-white/30 text-sm">
                视频链接不可用
              </div>
            )}
          </div>
        </div>

        {/* Info Bar */}
        <div className="w-full max-w-[900px] mx-auto px-4 md:px-6 pt-6">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
                {work.title}
              </h2>
              {work.subtitle && (
                <p className="text-white/40 text-sm mt-1">{work.subtitle}</p>
              )}
              <div className="flex items-center gap-3 mt-2 text-sm text-white/40">
                <span>{typeInfo.label}</span>
                <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                <span>{year}</span>
                {work.duration && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                    <span>{work.duration}</span>
                  </>
                )}
                {work.client && (
                  <>
                    <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                    <span>{work.client}</span>
                  </>
                )}
              </div>
            </div>

            {/* 设备信息 */}
            {work.gear && (
              <div className="text-right text-xs text-white/30 whitespace-nowrap leading-relaxed">
                {work.gear.split('、').map((g, i) => (
                  <div key={i}>{g.trim()}</div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          {work.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/8 text-white/50 text-xs transition-colors hover:bg-white/15 hover:text-white/80 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 描述 */}
        <div className="w-full max-w-[900px] mx-auto px-4 md:px-6 pt-5">
          <p className="text-white/50 text-sm leading-relaxed max-w-[600px]">
            {work.description}
          </p>
        </div>

        {/* Credits */}
        {work.credits.length > 0 && (
          <div className="w-full max-w-[900px] mx-auto px-4 md:px-6 pt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/35">
            {work.credits.map((c, i) => (
              <span key={i} className="flex gap-1.5">
                <span className="text-white/25">{c.role}</span>
                <span>{c.name}</span>
              </span>
            ))}
          </div>
        )}

        {/* 分隔线 */}
        <div className="w-full max-w-[900px] mx-auto px-4 md:px-6 py-5">
          <div className="h-px bg-white/6" />
        </div>

        {/* 相关作品 */}
        {relatedVideos.length > 0 && (
          <div className="w-full max-w-[900px] mx-auto px-4 md:px-6 pb-10">
            <h3 className="text-sm font-medium text-white/50 mb-4">
              更多相似作品
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {relatedVideos.map((v) => {
                const vType = WORK_TYPE_MAP[v.type];
                const vYear = v.year || v.date?.slice(0, 4) || '';
                return (
                  <div
                    key={v.id}
                    onClick={() => onNavigate(v)}
                    className="group cursor-pointer rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={v.coverImage}
                        alt={v.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs text-white/60 truncate group-hover:text-white/80 transition-colors">
                        {v.title}
                      </p>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        {vYear} · {vType.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 导航箭头 hover 区（桌面端始终可见） */}
      <style>{`
        @media (min-width: 768px) {
          .fixed.left-4, .fixed.right-4 {
            opacity: 0 !important;
          }
          .fixed.inset-0:hover ~ .fixed.left-4,
          .fixed.inset-0:hover ~ .fixed.right-4,
          div:hover > .fixed.left-4,
          div:hover > .fixed.right-4,
          .fixed.left-4:hover,
          .fixed.right-4:hover {
            opacity: 1 !important;
          }
        }
        @media (max-width: 767px) {
          .fixed.left-4, .fixed.right-4 {
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
