import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useWorks } from '@/context/WorksContext';
import { WORK_TYPE_MAP } from '@/types';
import StorySection from '@/components/StorySection';
import BilibiliPlayer from '@/components/BilibiliPlayer';

export default function WorkDetail() {
  const { id } = useParams<{ id: string }>();
  const { works } = useWorks();
  const work = works.find((w) => w.id === id);

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

  const typeInfo = WORK_TYPE_MAP[work.type];
  const relatedWorks = works
    .filter((w) => w.id !== work.id && (w.type === work.type || w.tags.some((t) => work.tags.includes(t))))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ======== 封面大图 ======== */}
      <section className="relative w-full aspect-[21/9] md:aspect-[21/9] overflow-hidden">
        <img
          src={work.coverImage}
          alt={work.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* 返回按钮 */}
        <Link
          to="/works"
          className="absolute top-6 left-6 flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          作品
        </Link>

        {/* 底部标题叠加 */}
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

      {/* ======== 制作信息行 ======== */}
      <div className="border-b border-mist-200">
        <div className="max-w-[1200px] mx-auto px-6 py-6 flex flex-wrap gap-x-10 gap-y-3 text-sm text-mist-500 font-mono">
          {work.duration && <span>时长 {work.duration}</span>}
          {work.client && <span>客户 {work.client}</span>}
          <span>年份 {work.date.slice(0, 4)}</span>
        </div>
      </div>

      {/* ======== 叙事段落 ======== */}
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

      {/* ======== 成片（视频嵌入） ======== */}
      <section className="py-16 md:py-20 bg-mist-50">
        <div className="max-w-[960px] mx-auto px-6">
          <div className="mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-mist-900 tracking-tight">
              成片
            </h2>
            <p className="mt-2 text-sm text-mist-400 font-mono tracking-wider uppercase">Result</p>
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

      {/* ======== 制作名单 ======== */}
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

      {/* ======== 相关作品 ======== */}
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
