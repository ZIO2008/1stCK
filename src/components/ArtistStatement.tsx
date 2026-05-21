interface ArtistStatementProps {
  paragraphs: string[];
}

/**
 * 创作哲学区 —— 居中、衬线体、大行距
 * 不是自我介绍，是艺术声明
 */
export default function ArtistStatement({ paragraphs }: ArtistStatementProps) {
  return (
    <section className="py-32 md:py-48 px-6">
      <div className="max-w-[640px] mx-auto">
        {paragraphs.map((text, i) => (
          <p
            key={i}
            className="font-serif text-lg md:text-xl leading-relaxed md:leading-loose text-mist-700 mb-8 last:mb-0 animate-fade-in"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
