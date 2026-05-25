export default function About() {
  const timeline = [
    { year: '2018', event: '第一次拿起相机，拍了一组城市夜景。全糊了，但很快乐。' },
    { year: '2020', event: '开始接商业项目。第一个客户是朋友的朋友，预算800块。' },
    { year: '2022', event: '从剪辑助理转独立创作者。离开公司那天在工位上坐了半小时——不知道下一步往哪走，但知道不走不行。' },
    { year: '2024', event: '完成了第一个真正意义上的个人作品——贡嘎转山。找回了拿起相机的初衷。' },
    { year: '2026', event: '积累了不同领域的创作经验，从城市宣传片到非遗纪录，从广告到实验影像。继续在路上。' },
  ];

  return (
    <div className="min-h-screen">
      {/* ======== 肖像区 ======== */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(./images/bg-about.png)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            登山路
          </h1>
          <p className="text-white/60 text-base md:text-lg font-serif">
            影像创作者
          </p>
        </div>
      </section>

      {/* ======== 自述 ======== */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-[640px] mx-auto">
          <p className="font-serif text-lg md:text-xl leading-relaxed text-mist-700 mb-8">
            我拍过很多种东西——雪山、城市、珠宝、非遗银饰、工厂里的独舞、洱海边不说一句话的新人。它们看起来毫不相关，但对我来说有一个共同的内核：<strong>我想让值得被看见的东西被看见。</strong>
          </p>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-mist-700 mb-8">
            我不相信"风格"。风格是一个创作者成熟之后水到渠成的东西，不是出发点。我更在意的是"诚实"——影像有没有诚实地面对被摄对象？有没有诚实地面对自己当时的能力和局限？
          </p>
          <p className="font-serif text-lg md:text-xl leading-relaxed text-mist-700">
            这个网站里只有10部作品。很多做得比我好的人有100部。但我不着急。山还很高，路还很长。
          </p>
        </div>
      </section>

      {/* ======== 时间线 ======== */}
      <section className="py-20 bg-mist-50 px-6">
        <div className="max-w-[640px] mx-auto">
          <h2 className="font-serif text-xl font-bold text-mist-900 mb-12">创作历程</h2>

          <div className="space-y-10">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="shrink-0 w-12 text-right">
                  <span className="text-xs font-mono text-mist-400 tracking-wider">{item.year}</span>
                </div>
                <div className="flex-1 font-serif text-mist-700 leading-relaxed">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== 联系 ======== */}
      <section className="py-20 px-6">
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="font-serif text-xl font-bold text-mist-900 mb-4">联系</h2>
          <p className="text-mist-500 mb-6">
            如果你有故事想被讲述，或者只是想聊聊影像——
          </p>
          <a
            href="mailto:hello@dengshanlu.com"
            className="inline-block px-6 py-3 bg-mist-900 text-white text-sm rounded-full hover:bg-mist-800 transition-colors"
          >
            发送邮件
          </a>
        </div>
      </section>
    </div>
  );
}
