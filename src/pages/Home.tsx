import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Camera } from 'lucide-react';
import { useWorks } from '@/context/WorksContext';
import type { Work } from '@/types';
import ArtistStatement from '@/components/ArtistStatement';
import FeaturedWork from '@/components/FeaturedWork';
import WorkCard from '@/components/WorkCard';
import PhotoModal from '@/components/PhotoModal';

export default function Home() {
  const { works } = useWorks();
  const [scrolled, setScrolled] = useState(false);

  /* ─── 弹窗状态 ───────────────────────── */
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const heroWorks = useMemo(() => works.filter((w) => w.hero), [works]);
  const featuredWorks = useMemo(() => works.filter((w) => w.featured && !w.hero).slice(0, 2), [works]);

  // 竖屏视频作品：取前6个展示
  const portraitWorks = useMemo(
    () => works.filter((w) => w.orientation === 'portrait' && w.videoUrl).slice(0, 6),
    [works]
  );

  // 照片作品（仅横版，最多4张）
  const photoWorks = useMemo(
    () => works.filter((w) => w.hasPhoto && !w.videoUrl && w.orientation === 'landscape').slice(0, 4),
    [works]
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ======== Hero —— 全屏大图 + 创作哲学 ======== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 背景图 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(./images/bg-hero.webp)',
          }}
        />
        {/* 暗色渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

        {/* 中央文字 */}
        <div className="relative z-10 text-center px-6">
          <h1
            className={`font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-6 transition-all duration-700 ${
              scrolled ? 'opacity-0' : 'opacity-100'
            }`}
          >
            登山路
          </h1>
          <p
            className={`font-serif text-lg md:text-xl text-white/70 max-w-lg mx-auto leading-relaxed transition-all duration-700 delay-100 ${
              scrolled ? 'opacity-0' : 'opacity-100'
            }`}
          >
            影像创作是一场没有终点的攀登。
            <br />
            每一次举起相机，都是向更高处的自己走去。
          </p>
        </div>

        {/* 底部滚动提示 */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500 ${
            scrolled ? 'opacity-0' : 'opacity-60'
          }`}
        >
          <span className="text-white/40 text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/40 animate-bounce" />
        </div>
      </section>

      {/* ======== 创作哲学 ======== */}
      <ArtistStatement
        paragraphs={[
          '我相信影像的力量不在于多好看，而在于多诚实。',
          '每一部作品都是一次攀登——不是为了征服什么，而是为了离自己想要表达的东西更近一点。从商业委托到个人创作，从高山之巅到指尖工艺，我在不同形式的影像里寻找同一个答案：什么值得被看见？',
          '这里收集了一些路上的痕迹。它们不完美，但都是真实的。',
        ]}
      />

      {/* ======== 精选作品 (视频) ======== */}
      {heroWorks.length > 0 && (
        <section className="pb-20 px-6">
          <div className="max-w-[1200px] mx-auto">
            {/* section 标题 */}
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-mist-900 tracking-tight">
                精选作品
              </h2>
              <Link
                to="/video"
                className="text-sm text-mist-400 hover:text-mist-700 transition-colors"
              >
                查看更多 →
              </Link>
            </div>

            <div className="space-y-6">
              {heroWorks.map((work) => {
                const isPhoto = work.hasPhoto && !work.videoUrl;
                return (
                  <FeaturedWork
                    key={work.id}
                    work={work}
                    onClick={isPhoto ? setSelectedWork : undefined}
                  />
                );
              })}
            </div>

            {featuredWorks.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredWorks.map((work) => {
                  const isPhoto = work.hasPhoto && !work.videoUrl;
                  return (
                    <FeaturedWork
                      key={work.id}
                      work={work}
                      onClick={isPhoto ? setSelectedWork : undefined}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ======== 竖屏短片区块（视频） ======== */}
      {portraitWorks.length > 0 && (
        <section className="pb-20 px-6 bg-mist-50/60">
          <div className="max-w-[1200px] mx-auto pt-20">
            {/* section 标题 */}
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-mist-900 tracking-tight mb-1">
                  竖屏短片
                </h2>
                <p className="text-mist-400 text-sm">人文纪实 · 城市街拍 · 生活观察</p>
              </div>
              <Link
                to="/video"
                className="text-sm text-mist-400 hover:text-mist-700 transition-colors"
              >
                查看更多 →
              </Link>
            </div>

            {/* 竖屏网格：4列 3:4 卡片 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {portraitWorks.map((work, i) => (
                <div
                  key={work.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <WorkCard work={work} from="video" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======== 照片区域 ======== */}
      {photoWorks.length > 0 && (
        <section className="pb-32 px-6">
          <div className="max-w-[1200px] mx-auto pt-20">
            {/* section 标题 */}
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Camera className="w-5 h-5 text-stone-600" />
                  <h2 className="font-serif text-2xl font-bold text-mist-900 tracking-tight">
                    照片
                  </h2>
                </div>
                <p className="text-mist-400 text-sm">风光摄影 · 人文纪实 · 生活切片</p>
              </div>
              <Link
                to="/works"
                className="text-sm text-mist-400 hover:text-mist-700 transition-colors"
              >
                查看更多 →
              </Link>
            </div>

            {/* 照片网格 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photoWorks.map((work, i) => (
                <div
                  key={work.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <WorkCard work={work} from="works" onClick={setSelectedWork} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 照片弹窗 */}
      {selectedWork && (
        <PhotoModal work={selectedWork} onClose={() => setSelectedWork(null)} />
      )}
    </>
  );
}
