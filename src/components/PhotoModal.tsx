import { useState, useCallback, useEffect, useRef } from 'react';
import type { Work } from '@/types';
import { WORK_TYPE_MAP } from '@/types';

/* ---- Design Tokens ---- */
const GOLD = '#c49a2c';

interface PhotoModalProps {
  work: Work;
  onClose: () => void;
}

/** 小红书风格左右分栏弹窗 — 左边图片轮播，右边文字描述 */
export default function PhotoModal({ work, onClose }: PhotoModalProps) {
  const typeInfo = WORK_TYPE_MAP[work.type];
  const year = work.year || work.date.slice(0, 4);

  // 构建图片列表
  const images: string[] = [work.photoCoverImage || work.coverImage];
  if (work.stills && work.stills.length > 0) {
    images.push(...work.stills);
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;
  const showControls = total > 1;

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= total) return;
    setCurrentIndex(index);
  }, [total]);

  const navigate = useCallback((dir: number) => {
    goTo(currentIndex + dir);
  }, [currentIndex, goTo]);

  // 键盘事件
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, navigate]);

  // 阻止 body 滚动
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // 点击遮罩关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-[fadeIn_0.2s_ease]"
      onClick={handleOverlayClick}
    >
      {/* 弹窗主体 — 左右分栏 */}
      <div className="flex w-[92vw] max-w-[1200px] h-[88vh] max-h-[800px] bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]
        max-md:flex-col max-md:w-full max-md:h-full max-md:max-w-none max-md:max-h-none max-md:rounded-none">

        {/* ═══ 关闭按钮 ═══ */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-base font-light flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors max-md:top-3 max-md:right-3"
          aria-label="关闭"
        >
          ✕
        </button>

        {/* ═══════════════ 左面板 — 图片轮播 ═══════════════ */}
        <LeftPanel
          images={images}
          currentIndex={currentIndex}
          total={total}
          showControls={showControls}
          goTo={goTo}
          navigate={navigate}
        />

        {/* ═══════════════ 右面板 — 文字描述 ═══════════════ */}
        <div className="flex-1 overflow-y-auto flex flex-col scrollbar-w-[4px] scrollbar-thumb-[#e0ddd8] scrollbar-track-transparent">
          <div className="p-8 max-md:p-5 max-md:pb-10">
            {/* 作者栏 */}
            <AuthorRow />

            {/* 标题 */}
            <h1 className="font-serif text-[26px] font-bold leading-tight text-[#1a1a1a] mb-1 max-md:text-[21px]">
              {work.title}
            </h1>
            {work.subtitle && (
              <p className="text-sm text-[#999] mb-4">{work.subtitle}</p>
            )}

            {/* 元信息行 */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#b0b0b0] mb-6">
              <span className="px-2 py-0.5 rounded-sm bg-amber-50 text-amber-800 text-[10px] uppercase tracking-wider">
                {typeInfo.label}
              </span>
              {work.date && <span>{year}</span>}
              {work.location && (
                <>
                  <span className="text-[#ddd]">|</span>
                  <span>{work.location}</span>
                </>
              )}
              {work.gear && (
                <>
                  <span className="text-[#ddd]">|</span>
                  <span>{work.gear}</span>
                </>
              )}
            </div>

            {/* 正文描述 */}
            <div className="text-[14.5px] leading-relaxed text-[#333] mb-6 space-y-2.5">
              {work.description.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* 组图缩略图导航 */}
            {showControls && (
              <ThumbnailStrip
                images={images}
                currentIndex={currentIndex}
                goTo={goTo}
              />
            )}

            {/* 金色分隔线 */}
            <GoldDivider />

            {/* EXIF 参数 */}
            {work.exif && (work.exif.camera || work.exif.aperture || work.exif.shutter || work.exif.iso || work.exif.lens || work.exif.focalLength) && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {work.exif.camera && <ExifBadge label="相机" value={work.exif.camera} />}
                {work.exif.lens && <ExifBadge label="镜头" value={work.exif.lens} />}
                {work.exif.aperture && <ExifBadge label="光圈" value={work.exif.aperture} />}
                {work.exif.shutter && <ExifBadge label="快门" value={work.exif.shutter} />}
                {work.exif.iso && <ExifBadge label="ISO" value={work.exif.iso} />}
                {work.exif.focalLength && <ExifBadge label="焦距" value={work.exif.focalLength} />}
              </div>
            )}

            {/* 标签 */}
            {work.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {work.tags.map((tag) => (
                  <span key={tag} className="text-[13px] text-[#3b5998] cursor-pointer hover:text-[#fe2c55] transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 制作名单 */}
            {work.credits.length > 0 && (
              <div className="border-t border-[#f0efed] pt-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-5 h-0.5 rounded-sm opacity-40" style={{ backgroundColor: GOLD }} />
                  <span className="text-xs font-semibold text-[#999]">制作名单</span>
                  <span className="w-5 h-0.5 rounded-sm opacity-40" style={{ backgroundColor: GOLD }} />
                </div>
                <div className="space-y-1">
                  {work.credits.map((credit, i) => (
                    <div key={i} className="flex items-baseline gap-2 py-1 text-[12.5px]">
                      <span className="text-[#bbb] min-w-[70px] shrink-0 text-[11px]">{credit.role}</span>
                      <span className="text-[#555] font-medium">{credit.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   左面板 — 图片轮播
   ================================================================ */
function LeftPanel({
  images,
  currentIndex,
  total,
  showControls,
  goTo,
  navigate,
}: {
  images: string[];
  currentIndex: number;
  total: number;
  showControls: boolean;
  goTo: (i: number) => void;
  navigate: (dir: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);

  // 触摸滑动
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      navigate(diff > 0 ? -1 : 1);
    }
  };

  return (
    <div
      ref={panelRef}
      className="relative flex-[0_0_56%] bg-[#1a1a1a] flex items-center justify-center overflow-hidden select-none group
        max-md:flex-[0_0_50vh]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* 轮播轨道 */}
      <div
        className="flex w-full h-full transition-transform duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1.2)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className="flex-[0_0_100%] h-full">
            <img
              src={src}
              alt={`${i + 1}`}
              className="w-full h-full object-contain pointer-events-none"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* 计数器 */}
      {showControls && (
        <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/45 backdrop-blur-md rounded-full text-[11px] text-white font-mono z-10">
          {currentIndex + 1} / {total}
        </div>
      )}

      {/* 导航箭头 */}
      {showControls && (
        <>
          <button
            onClick={() => navigate(-1)}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-lg flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all disabled:opacity-20 disabled:cursor-default z-10
              max-md:opacity-100 max-md:w-8 max-md:h-8"
          >
            ‹
          </button>
          <button
            onClick={() => navigate(1)}
            disabled={currentIndex === total - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-lg flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 hover:bg-white/30 transition-all disabled:opacity-20 disabled:cursor-default z-10
              max-md:opacity-100 max-md:w-8 max-md:h-8"
          >
            ›
          </button>
        </>
      )}

      {/* 圆点指示器 */}
      {showControls && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              onClick={() => goTo(i)}
              className="w-1.5 h-1.5 rounded-full cursor-pointer transition-all duration-250"
              style={{
                backgroundColor: i === currentIndex ? '#fff' : 'rgba(255,255,255,0.35)',
                transform: i === currentIndex ? 'scale(1.5)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ================================================================
   共享小组件
   ================================================================ */

function AuthorRow() {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold shrink-0 text-[#c49a2c]"
        style={{ background: 'linear-gradient(135deg, #1a1a1a, #444)' }}>
        登
      </div>
      <div>
        <div className="text-sm font-semibold text-[#1a1a1a]">登山路</div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#999]">
          创意摄影
          <span className="w-[3px] h-[3px] rounded-full bg-[#ccc]" />
          哈苏合作摄影师
        </div>
      </div>
    </div>
  );
}

function ThumbnailStrip({
  images,
  currentIndex,
  goTo,
}: {
  images: string[];
  currentIndex: number;
  goTo: (i: number) => void;
}) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none">
      {images.map((src, i) => (
        <div
          key={i}
          onClick={() => goTo(i)}
          className="flex-shrink-0 w-[72px] h-[56px] rounded-lg overflow-hidden cursor-pointer transition-all border-2"
          style={{
            borderColor: i === currentIndex ? GOLD : 'transparent',
            opacity: i === currentIndex ? 1 : 0.5,
          }}
        >
          <img src={src} alt={`缩略图 ${i + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-2.5 mb-5 max-w-[220px] mx-auto">
      <div className="flex-1 h-px bg-[#e8e5e0]" />
      <div className="w-[5px] h-[5px] rounded-full opacity-60" style={{ backgroundColor: GOLD }} />
      <div className="flex-1 h-px bg-[#e8e5e0]" />
    </div>
  );
}

function ExifBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 bg-[#f8f7f6] rounded-full text-[11px] font-mono text-[#888]">
      {label}&nbsp;<span className="text-[#555] font-medium">{value}</span>
    </span>
  );
}
