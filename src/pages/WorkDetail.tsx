import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useWorks } from '@/context/WorksContext';
import { WORK_TYPE_MAP } from '@/types';
import { cn } from '@/lib/utils';
import StorySection from '@/components/StorySection';
import BilibiliPlayer from '@/components/BilibiliPlayer';

export default function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { works } = useWorks();
  const work = works.find((w) => w.id === id);

  const fromParam = new URLSearchParams(location.search).get('from');
  const isPhotoView = fromParam === 'works';

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-mist-400 mb-4">作品未找到</h1>
          <Link to="/works" className="text-lens-600 hover:text-lens-700 transition-colors">
            &larr; 返回作品列表
          </Link>
        </div>
      </div>
    );
  }

  // ======== 照片专用布局 ========
  if (isPhotoView) {
    return <PhotoLayout work={work} works={works} />;
  }

  // ======== 视频布局（原有逻辑） ========
  const typeInfo = WORK_TYPE_MAP[work.type];
  const relatedWorks = works
    .filter((w) => w.id !== work.id && (w.type === work.type || w.tags.some((t) => work.tags.includes(t))))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 封面大图 */}
      <section className="relative w-full aspect-[21/9] md:aspect-[21/9] overflow-hidden">
        <img
          src={work.coverImage}
          alt={work.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <span
            className="inline-block text-xs font-mono tracking-widest uppercase mb-4"
            style={{ color: `var(--color-${typeInfo.color}-300)` }}
          >
            {typeInfo.label}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
            {work.title}
          </h1>
          {work.subtitle && (
            <p className="text-white/60 text-base md:text-lg">{work.subtitle}</p>
          )}
        </div>
      </section>

      {/* 制作信息行 */}
      <div className="border-b border-mist-200">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-wrap gap-x-10 gap-y-3 text-sm text-mist-500 font-mono">
          {work.duration && <span>时长 {work.duration}</span>}
          {work.client && <span>客户 {work.client}</span>}
          <span>年份 {work.date.slice(0, 4)}</span>
        </div>
      </div>

      {/* 叙事段落 */}
      <StorySection title="背景" subtitle="Background" image={work.processImages[0]}>
        {work.story.background.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </StorySection>

      <StorySection title="思考" subtitle="Thinking">
        {work.story.thinking.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </StorySection>

      <StorySection title="过程" subtitle="Process" image={work.processImages[1]}>
        {work.story.process.split('\n\n').map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </StorySection>

      {/* 成片 */}
      <section className="py-16 md:py-20 bg-mist-50">
        <div className="max-w-[960px] mx-auto px-6">
          <div className="mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-mist-900 tracking-tight">
              成片
            </h2>
            <p className="mt-2 text-sm text-mist-400 font-mono tracking-wider uppercase">
              Result
            </p>
          </div>

          {work.videoUrl ? (
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <BilibiliPlayer url={work.videoUrl} />
            </div>
          ) : (
            <div className="rounded-2xl bg-mist-100 p-16 text-center text-mist-400 font-serif">
              视频链接待补充
            </div>
          )}

          <div className="mt-10 font-serif text-base md:text-lg leading-relaxed text-mist-700 space-y-6">
            {work.story.result.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 制作名单 */}
      {work.credits.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="max-w-[720px] mx-auto px-6">
            <h2 className="font-serif text-xl font-bold text-mist-900 mb-8">制作名单</h2>
            <div className="space-y-3">
              {work.credits.map((credit, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-4 py-2 border-b border-mist-100 last:border-0"
                >
                  <span className="text-xs text-mist-400 font-mono w-24 shrink-0">{credit.role}</span>
                  <span className="text-sm text-mist-700">{credit.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 相关作品 */}
      {relatedWorks.length > 0 && (
        <section className="py-16 md:py-20 bg-mist-50">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-serif text-xl font-bold text-mist-900 mb-8">相关作品</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedWorks.map((rw) => (
                <Link
                  key={rw.id}
                  to={`/work/${rw.id}`}
                  className="group block"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3">
                    <img
                      src={rw.coverImage}
                      alt={rw.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <h3 className="font-serif text-base font-medium text-mist-800 group-hover:text-mist-900 transition-colors">
                    {rw.title}
                  </h3>
                  <p className="text-sm text-mist-400 mt-1">{WORK_TYPE_MAP[rw.type].label}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ======== 照片专用布局组件 ======== */
function PhotoLayout({ work, works }: { work: ReturnType<typeof useWorks>['works'][number]; works: ReturnType<typeof useWorks>['works'] }) {
  const [selectedStill, setSelectedStill] = useState<string>('');
  const typeInfo = WORK_TYPE_MAP[work.type];
  const relatedWorks = works
    .filter((w) => w.id !== work.id && w.hasPhoto)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ======== 封面大图（全幅） ======== */}
      <section className="relative w-full aspect-[3/2] md:aspect-[16/9] overflow-hidden bg-black">
        <img
          src={work.coverImage}
          alt={work.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <span className="inline-block text-xs font-mono tracking-widest uppercase mb-4 text-white/50">
            {typeInfo.label} / Photography
          </span>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-3">
            {work.title}
          </h1>
          {work.subtitle && (
            <p className="text-white/60 text-base md:text-lg">{work.subtitle}</p>
          )}
        </div>
      </section>

      {/* ======== 组图瀑布流 ======== */}
      {work.isGroup && work.stills && work.stills.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6">
            <h2 className="font-serif text-xl font-bold text-mist-900 mb-8">组图</h2>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {work.stills.map((still, i) => (
                <div
                  key={i}
                  className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedStill(still)}
                >
                  <img
                    src={still}
                    alt={`${work.title} ${i + 1}`}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
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

      {/* ======== 信息卡片 ======== */}
      <section className="py-12 md:py-16">
        <div className="max-w-[860px] mx-auto px-6">
          {/* 描述 */}
          <p className="font-serif text-lg md:text-xl leading-relaxed text-mist-800 mb-10">
            {work.description}
          </p>

          {/* 元数据网格 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {work.date && (
              <MetaItem label="拍摄日期" value={work.date} />
            )}
            {work.location && (
              <MetaItem label="地点" value={work.location} />
            )}
            {work.gear && (
              <MetaItem label="器材" value={work.gear} />
            )}
            {work.exif?.camera && (
              <MetaItem label="机身" value={work.exif.camera} />
            )}
          </div>

          {/* EXIF 参数行 */}
          {work.exif && (work.exif.aperture || work.exif.shutter || work.exif.iso || work.exif.focalLength) && (
            <div className="flex flex-wrap gap-4 mb-10">
              {work.exif.aperture && (
                <ExifBadge label="光圈" value={work.exif.aperture} />
              )}
              {work.exif.shutter && (
                <ExifBadge label="快门" value={work.exif.shutter} />
              )}
              {work.exif.iso && (
                <ExifBadge label="ISO" value={work.exif.iso} />
              )}
              {work.exif.focalLength && (
                <ExifBadge label="焦距" value={work.exif.focalLength} />
              )}
            </div>
          )}

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {work.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-xs font-mono tracking-wide text-mist-500 border border-mist-200 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 创作札记（精简叙事：背景 + 成片） ======== */}
      {(work.story.background || work.story.result) && (
        <section className="py-12 md:py-16 bg-mist-50 border-y border-mist-100">
          <div className="max-w-[720px] mx-auto px-6">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-mist-900 mb-8">
              创作札记
            </h2>

            {work.story.background && (
              <div className="mb-8">
                {work.story.background.split('\n\n').map((p, i) => (
                  <p key={i} className="font-serif text-base md:text-lg leading-relaxed text-mist-700 mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* 分隔线 */}
            {work.story.background && work.story.result && (
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-mist-200" />
                <span className="text-xs font-mono text-mist-400 tracking-widest uppercase">Photograph</span>
                <div className="flex-1 h-px bg-mist-200" />
              </div>
            )}

            {work.story.result && (
              <div>
                {work.story.result.split('\n\n').map((p, i) => (
                  <p key={i} className="font-serif text-base md:text-lg leading-relaxed text-mist-700 mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ======== 幕后过程图（如有） ======== */}
      {work.processImages && work.processImages.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-serif text-xl font-bold text-mist-900 mb-8">幕后</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {work.processImages.map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src={img}
                    alt={`${work.title} - 幕后 ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======== 制作名单 ======== */}
      {work.credits.length > 0 && (
        <section className="py-12 md:py-16 bg-mist-50">
          <div className="max-w-[480px] mx-auto px-6">
            <h3 className="font-serif text-lg font-bold text-mist-700 mb-6 text-center">制作名单</h3>
            <div className="space-y-2">
              {work.credits.map((credit, i) => (
                <div
                  key={i}
                  className="flex items-baseline gap-4 py-2 border-b border-mist-100 last:border-0"
                >
                  <span className="text-xs text-mist-400 font-mono w-20 shrink-0">{credit.role}</span>
                  <span className="text-sm text-mist-600">{credit.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======== 更多照片 ======== */}
      {relatedWorks.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="font-serif text-xl font-bold text-mist-900 mb-8">更多照片</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedWorks.map((rw) => (
                <Link
                  key={rw.id}
                  to={`/work/${rw.id}?from=works`}
                  className="group block"
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
                    <img
                      src={rw.coverImage}
                      alt={rw.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <h3 className="font-serif text-base font-medium text-mist-800 group-hover:text-mist-900 transition-colors">
                    {rw.title}
                  </h3>
                  <p className="text-sm text-mist-400 mt-1">{rw.subtitle || WORK_TYPE_MAP[rw.type].label}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/* ---- 子组件 ---- */

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-mono tracking-wider text-mist-400 uppercase mb-1">{label}</dt>
      <dd className="text-sm text-mist-700">{value}</dd>
    </div>
  );
}

function ExifBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mist-50 border border-mist-100 text-xs font-mono">
      <span className="text-mist-400">{label}</span>
      <span className="text-mist-700 font-medium">{value}</span>
    </span>
  );
}
