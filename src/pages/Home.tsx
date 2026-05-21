import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useWorks } from '@/context/WorksContext';
import ArtistStatement from '@/components/ArtistStatement';
import FeaturedWork from '@/components/FeaturedWork';

export default function Home() {
  const { works, loading } = useWorks();
  const [scrolled, setScrolled] = useState(false);

  const heroWorks = useMemo(() => works.filter((w) => w.hero), [works]);
  const featuredWorks = useMemo(() => works.filter((w) => w.featured && !w.hero).slice(0, 2), [works]);

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
              'url(/images/bg-hero.png)',
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

      {/* ======== 精选作品 (1-2部，hero 标记) ======== */}
      {heroWorks.length > 0 && (
        <section className="pb-32 px-6">
          <div className="max-w-[1200px] mx-auto space-y-6">
            {heroWorks.map((work) => (
              <FeaturedWork key={work.id} work={work} />
            ))}
          </div>

          {featuredWorks.length > 0 && (
            <div className="max-w-[1200px] mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredWorks.map((work) => (
                <FeaturedWork key={work.id} work={work} />
              ))}
            </div>
          )}

          {/* 查看全部链接 */}
          <div className="max-w-[1200px] mx-auto mt-16 text-center">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 font-serif text-lg text-mist-500 hover:text-mist-800 transition-colors duration-200"
            >
              查看全部作品
              <span className="text-mist-300">&rarr;</span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
