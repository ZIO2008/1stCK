interface StorySectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  image?: string;
}

/**
 * 作品详情叙事段落 ——
 * 每个段落有标题、可选副标题、正文和多行文字
 * 克制排版，让文字自己说话
 */
export default function StorySection({ title, subtitle, children, image }: StorySectionProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-[720px] mx-auto px-6">
        <div className="mb-10">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-mist-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-mist-400 font-mono tracking-wider uppercase">
              {subtitle}
            </p>
          )}
        </div>

        <div className="font-serif text-base md:text-lg leading-relaxed text-mist-700 space-y-6">
          {children}
        </div>

        {image && (
          <div className="mt-12 rounded-2xl overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
}
