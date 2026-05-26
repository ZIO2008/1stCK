import { useState, useRef, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useWorks } from '@/context/WorksContext';
import { WORK_TYPE_MAP } from '@/types';
import BilibiliPlayer from '@/components/BilibiliPlayer';

/* ---- Design Tokens ---- */
const GOLD = '#c49a2c';

export default function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { works } = useWorks();
  const work = works.find((w) => w.id === id);

  const fromParam = new URLSearchParams(location.search).get('from');

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f4f0]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-mist-400 mb-4">作品未找到</h1>
          <Link to="/works" className="text-mist-500 hover:text-mist-700 transition-colors">
            &larr; 返回作品列表
          </Link>
        </div>
      </div>
    );
  }

  // 布局由作品自身属性决定，不依赖 ?from 参数
  // 纯照片作品（无视频链接）→ PhotoLayout；有视频的作品 → VideoLayout
  const isPhotoOnly = work.hasPhoto && !work.videoUrl;

  if (isPhotoOnly) {
    return <PhotoLayout work={work} works={works} />;
  }
  return <VideoLayout work={work} works={works} />;
}

/* ================================================================
   视频作品布局
   — 播放器首屏 → 图+短文案交替 → 居中窄栏叙事 → 深色名单 → 横向滚动
   ================================================================ */
function VideoLayout({ work, works }: { work: ReturnType<typeof useWorks>['works'][number]; works: ReturnType<typeof useWorks>['works'] }) {
  const typeInfo = WORK_TYPE_MAP[work.type];
  const year = work.year || work.date.slice(0, 4);
  const relatedWorks = works
    .filter((w) => w.id !== work.id && w.videoUrl && (w.type === work.type || w.tags.some((t) => work.tags.includes(t))))
    .slice(0, 6);

  // Extract short excerpts from story sections for image captions
  const firstPara = (text: string) => text.split('\n\n')[0];

  return (
    <div className="min-h-screen bg-[#f5f4f0]">

      {/* ★ 视频播放器 — 页面第一屏就是作品本身 */}
      <section className="w-full bg-black">
        {work.videoUrl ? (
          <BilibiliPlayer
            url={work.videoUrl}
            aspectRatio={16 / 9}
            showLink={false}
            className="max-w-[1400px] mx-auto"
          />
        ) : (
          <div className="aspect-video flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white/40">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border-2 border-white/15">
              <div className="w-0 h-0 border-l-[24px] border-t-[14px] border-b-[14px] border-l-white border-t-transparent border-b-transparent ml-1" />
            </div>
            <span className="text-sm font-mono tracking-widest">NO VIDEO</span>
          </div>
        )}
      </section>

      {/* 信息栏 */}
      <div className="border-b border-[#e5e0d8] bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <h1 className="font-serif text-xl md:text-2xl font-bold text-[#2c2c2c]">{work.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#777] tracking-wider">
            <span className="px-2 py-0.5 rounded-sm bg-amber-50 text-amber-800 text-[10px] tracking-[0.1em] uppercase">
              {typeInfo.label}
            </span>
            {work.duration && <span>时长 {work.duration}</span>}
            <span>{year}</span>
            {work.gear && <span>器材 {work.gear}</span>}
            {work.tags.length > 0 && (
              <span style={{ color: GOLD }}>#{work.tags.slice(0, 3).join(' #')}</span>
            )}
          </div>
        </div>
      </div>

      {/* ★ 图+短文案交替叙事 — 自然呼吸 */}
      {/* processImages[0] + background excerpt */}
      {work.processImages[0] && (
        <VisualTextBlock image={work.processImages[0]}>
          {firstPara(work.story.background)}
        </VisualTextBlock>
      )}

      {/* processImages[1] + process excerpt */}
      {work.processImages[1] && (
        <VisualTextBlock image={work.processImages[1]}>
          {firstPara(work.story.process)}
        </VisualTextBlock>
      )}

      {/* 创作思考 — 居中窄栏，白底 */}
      {work.story.thinking && (
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-[640px] mx-auto px-6">
            <div className="font-serif text-lg md:text-xl leading-relaxed text-[#777] text-center">
              {work.story.thinking.split('\n\n').map((p, i, arr) => (
                <span key={i}>
                  {p}
                  {i < arr.length - 1 && <><br /><br /></>}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 更多过程图 + 成片说明 */}
      {work.processImages.length > 2 && (
        <section className="py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {work.processImages.slice(2).map((img, i) => (
                <div key={i} className="rounded overflow-hidden">
                  <img
                    src={img}
                    alt={`幕后 ${i + 3}`}
                    className="w-full aspect-[16/10] object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {work.story.result && (
              <p className="mt-12 max-w-[640px] mx-auto font-serif text-base md:text-lg leading-relaxed text-[#777] italic text-center">
                {work.story.result}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 单独成片说明（无额外过程图） */}
      {work.processImages.length <= 2 && work.story.result && (
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-[640px] mx-auto px-6">
            <p className="font-serif text-lg leading-relaxed text-[#777] italic text-center">
              {work.story.result}
            </p>
          </div>
        </section>
      )}

      {/* ★ 制作名单 — 深色背景 + 金色点缀 */}
      {work.credits.length > 0 && (
        <CreditsSection credits={work.credits} />
      )}

      {/* ★ 相关作品 — 横向滚动 */}
      {relatedWorks.length > 0 && (
        <RelatedScrollSection
          label="Related"
          title="相关作品"
          works={relatedWorks}
          basePath=""
        />
      )}
    </div>
  );
}

/* ================================================================
   照片作品布局
   — 全幅封面 → 组图瀑布流 → 极简描述 → 过程图 → 深色名单 → 横向滚动
   ================================================================ */
function PhotoLayout({ work, works }: { work: ReturnType<typeof useWorks>['works'][number]; works: ReturnType<typeof useWorks>['works'] }) {
  const [selectedStill, setSelectedStill] = useState<string>('');
  const typeInfo = WORK_TYPE_MAP[work.type];
  const year = work.year || work.date.slice(0, 4);
  const relatedWorks = works
    .filter((w) => w.id !== work.id && w.hasPhoto)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f5f4f0]">

      {/* ★ 全幅封面 */}
      <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden bg-black">
        <img
          src={work.photoCoverImage || work.coverImage}
          alt={work.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <p className="font-mono text-xs tracking-[0.15em] uppercase text-white/40 mb-4">
            {typeInfo.label} / Photography · {year}{work.location ? ` · ${work.location}` : ''}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
            {work.title}
          </h1>
          {work.subtitle && (
            <p className="text-white/60 text-base md:text-lg">{work.subtitle}</p>
          )}
        </div>
      </section>

      {/* ★ 组图瀑布流 — 封面后第一内容 */}
      {work.isGroup && work.stills && work.stills.length > 0 && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <div className="text-center mb-8">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#777] mb-1">Gallery</p>
              <h2 className="font-serif text-xl font-bold text-[#2c2c2c]">组图</h2>
            </div>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {work.stills.map((still, i) => (
                <div
                  key={i}
                  className="break-inside-avoid rounded overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedStill(still)}
                >
                  <img
                    src={still}
                    alt={`${work.title} ${i + 1}`}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]"
                    loading={i > 2 ? 'lazy' : 'eager'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 全屏灯箱 */}
          {selectedStill && (
            <div
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedStill('')}
            >
              <button
                className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-light leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="关闭"
              >
                ✕
              </button>
              <img
                src={selectedStill}
                alt={work.title}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </section>
      )}

      {/* ★ 描述 + Meta + EXIF + 标签 — 浅灰底，解除章节框 */}
      <section className="py-16 md:py-24 bg-[#f5f4f0]">
        <div className="max-w-[640px] mx-auto px-6">
          {/* 正文描述 — 极简居中窄栏 */}
          <p className="font-serif text-lg md:text-xl leading-relaxed text-[#777] text-center mb-12">
            {work.description}
          </p>

          {/* 金色分隔线 */}
          <div className="flex items-center gap-4 mb-12 max-w-[300px] mx-auto">
            <div className="flex-1 h-px bg-[#e5e0d8]" />
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: GOLD }} />
            <div className="flex-1 h-px bg-[#e5e0d8]" />
          </div>

          {/* 元数据网格 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {work.date && <MetaItem label="日期" value={year} />}
            {work.location && <MetaItem label="地点" value={work.location} />}
            {work.gear && <MetaItem label="器材" value={work.gear} />}
            {work.exif?.lens && <MetaItem label="镜头" value={work.exif.lens} />}
          </div>

          {/* EXIF 参数行 */}
          {work.exif && (work.exif.aperture || work.exif.shutter || work.exif.iso || work.exif.focalLength) && (
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {work.exif.aperture && <ExifBadge label="光圈" value={work.exif.aperture} />}
              {work.exif.shutter && <ExifBadge label="快门" value={work.exif.shutter} />}
              {work.exif.iso && <ExifBadge label="ISO" value={work.exif.iso} />}
              {work.exif.focalLength && <ExifBadge label="焦距" value={work.exif.focalLength} />}
            </div>
          )}

          {/* 标签 */}
          {work.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-3 py-1 text-xs font-mono tracking-wide text-[#777] border border-[#e5e0d8] rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 创作札记 — 极简居中，白底，无框 */}
      {(work.story.background || work.story.result) && (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-[640px] mx-auto px-6">
            {work.story.background && (
              <div className="font-serif text-base md:text-lg leading-relaxed text-[#777] text-center mb-12">
                {work.story.background.split('\n\n').map((p, i, arr) => (
                  <span key={i}>{p}{i < arr.length - 1 && <><br /><br /></>}</span>
                ))}
              </div>
            )}
            {work.story.background && work.story.result && (
              <div className="flex items-center gap-4 mb-12 max-w-[300px] mx-auto">
                <div className="flex-1 h-px bg-[#e5e0d8]" />
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: GOLD }} />
                <div className="flex-1 h-px bg-[#e5e0d8]" />
              </div>
            )}
            {work.story.result && (
              <div className="font-serif text-base md:text-lg leading-relaxed text-[#777] text-center">
                {work.story.result.split('\n\n').map((p, i, arr) => (
                  <span key={i}>{p}{i < arr.length - 1 && <><br /><br /></>}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 幕后过程图 */}
      {work.processImages && work.processImages.length > 0 && (
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-8">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#777] mb-1">Behind the Scenes</p>
              <h2 className="font-serif text-xl font-bold text-[#2c2c2c]">幕后</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {work.processImages.map((img, i) => (
                <div key={i} className="rounded overflow-hidden">
                  <img
                    src={img}
                    alt={`${work.title} - 幕后 ${i + 1}`}
                    className="w-full aspect-[16/10] object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ★ 制作名单 — 深色背景 + 金色点缀 */}
      {work.credits.length > 0 && (
        <CreditsSection credits={work.credits} />
      )}

      {/* ★ 更多照片 — 横向滚动 */}
      {relatedWorks.length > 0 && (
        <RelatedScrollSection
          label="More"
          title="更多照片"
          works={relatedWorks}
          basePath="?from=works"
        />
      )}
    </div>
  );
}

/* ================================================================
   共享组件
   ================================================================ */

/** 全幅图 + 居中窄栏短文案 — 松散呼吸感 */
function VisualTextBlock({ image, children }: { image: string; children: React.ReactNode }) {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <img
          src={image}
          alt=""
          className="w-full max-h-[70vh] object-cover rounded-sm"
        />
        <div className="max-w-[640px] mx-auto mt-8">
          <p className="font-serif text-base md:text-lg leading-relaxed text-[#777] italic text-center">
            {children}
          </p>
        </div>
      </div>
    </section>
  );
}

/** 制作名单 — 深色背景 + 金色点缀 */
function CreditsSection({ credits }: { credits: { role: string; name: string }[] }) {
  return (
    <section className="py-20 md:py-24 bg-[#1a1a1a] text-white">
      <div className="max-w-[640px] mx-auto px-6">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/25 mb-2">Credits</p>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="w-8 h-px" style={{ backgroundColor: GOLD, opacity: 0.4 }} />
            <h2 className="font-serif text-2xl font-bold text-white/85">制作名单</h2>
            <div className="w-8 h-px" style={{ backgroundColor: GOLD, opacity: 0.4 }} />
          </div>
        </div>
        <div className="space-y-2 max-w-[480px] mx-auto">
          {credits.map((credit, i) => (
            <div
              key={i}
              className="flex items-baseline gap-4 py-2 border-b border-white/8 last:border-0"
            >
              <span className="text-xs text-white/30 font-mono w-28 shrink-0 tracking-wider">{credit.role}</span>
              <span className="text-sm text-white/70">{credit.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** 横向滚动相关作品 */
function RelatedScrollSection({
  label,
  title,
  works,
  basePath,
}: {
  label: string;
  title: string;
  works: ReturnType<typeof useWorks>['works'];
  basePath: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mouse drag to scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add('cursor-grabbing');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onLeave = () => { isDown = false; el.classList.remove('cursor-grabbing'); };
    const onUp = () => { isDown = false; el.classList.remove('cursor-grabbing'); };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);

    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section className="py-20 md:py-24 bg-[#f5f4f0]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-8">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#777] mb-1">{label}</p>
          <h2 className="font-serif text-xl font-bold text-[#2c2c2c]">{title}</h2>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-6 pb-2 scrollbar-none cursor-grab select-none"
        >
          {works.map((rw) => (
            <Link
              key={rw.id}
              to={`/work/${rw.id}${basePath}`}
              className="group flex-shrink-0 w-[280px] md:w-[320px] bg-white rounded-lg overflow-hidden transition-transform hover:-translate-y-1"
            >
              <img
                src={rw.coverImage}
                alt={rw.title}
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="p-4">
                <h3 className="font-serif text-sm font-medium text-[#2c2c2c] group-hover:text-black transition-colors">
                  {rw.title}
                </h3>
                <p className="text-xs text-[#777] mt-1 font-mono">{WORK_TYPE_MAP[rw.type]?.label ?? ''}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <dt className="text-[10px] font-mono tracking-wider text-[#777] uppercase mb-1">{label}</dt>
      <dd className="text-sm text-[#2c2c2c]">{value}</dd>
    </div>
  );
}

function ExifBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e5e0d8] text-xs font-mono">
      <span className="text-[#777]">{label}</span>
      <span className="text-[#2c2c2c] font-medium">{value}</span>
    </span>
  );
}
