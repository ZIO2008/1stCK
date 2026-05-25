import type { Work, Tag } from '@/types';

export const tags: Tag[] = [
  { name: '登山', slug: 'mountaineering', color: 'summit', count: 2, description: '向高而行的路' },
  { name: '徒步', slug: 'hiking', color: 'summit', count: 1, description: '脚步丈量大地' },
  { name: '风光', slug: 'landscape', color: 'lens', count: 2, description: '山川湖海，光影之间' },
  { name: '航拍', slug: 'aerial', color: 'summit', count: 1, description: '俯瞰大地' },
  { name: '品牌', slug: 'brand', color: 'lens', count: 1, description: '品牌故事' },
  { name: '城市', slug: 'city', color: 'lens', count: 1, description: '城市形象' },
  { name: '产品', slug: 'product', color: 'dusk', count: 1, description: '产品视觉' },
  { name: '旅行', slug: 'travel', color: 'peak', count: 1, description: '在路上' },
  { name: '人物', slug: 'people', color: 'mist', count: 1, description: '人的故事' },
  { name: '音乐', slug: 'music', color: 'rose', count: 1, description: '声与影' },
  { name: '实验', slug: 'experimental', color: 'violet', count: 1, description: '视觉探索' },
  { name: '婚礼', slug: 'wedding', color: 'cyan', count: 1, description: '美好时刻' },
  { name: '片头', slug: 'intro', color: 'orange', count: 1, description: '第一印象' },
  { name: '调色', slug: 'color-grading', color: 'dusk', count: 2, description: '色彩叙事' },
  { name: '剪辑', slug: 'editing', color: 'lens', count: 3, description: '帧间叙事' },
];

/**
 * 作品数据
 *
 * 每部作品包含完整叙事结构：背景 → 思考 → 过程 → 成片
 * videoUrl 填写B站视频链接即可自动嵌入播放器
 * 图片均为本地生成，位于 /public/images/
 */
export const works: Work[] = [
  {
    id: 'meili-snow-mountain',
    title: '在梅里雪山，我等了三天的日照金山',
    subtitle: '卡瓦格博峰的光影奇迹',
    description: '三天守候，只为两分钟的金色神迹。',
    coverImage: '/images/cover-meili-snow-mountain.png',
    photoCoverImage: '/images/photo-cover-meili.png',
    hasPhoto: true,
    videoUrl: 'https://www.bilibili.com/video/BV1GJ411x7h7',
    type: 'travel',
    tags: ['风光', '登山', '调色'],
    date: '2028-11-20',
    duration: '4:32',
    featured: true,
    hero: true,
    story: {
      background:
        '2028年深秋，迪庆州文旅局找到我，希望为梅里雪山国家公园制作一支不同于传统风光片的影像。\n\n' +
        '他们的诉求很明确：不要"这里很美"的陈述，而是要"让人想出发"的冲动。梅里雪山每年接待游客超过百万，但大多数人只是匆匆一瞥——在观景台拍张照，发个朋友圈，就走了。他们希望有些人看完这支片子，会愿意多停留几天，会在飞来寺等一个日出。\n\n' +
        '我接下了这个案子。预算不多，周期两周，但题材本身让我无法拒绝——卡瓦格博是我一直想去但没去的山。',
      thinking:
        '梅里的问题从来不是"不够美"，而是"太远"——物理距离和心理距离都远。\n\n' +
        '传统的风光片套路是：航拍大全景开头，配上恢弘的交响乐，然后切各种角度的雪山特写。这种片子看了100部等于看了1部。观众知道雪山很美，但不会觉得自己和它有什么关系。\n\n' +
        '我的核心问题是：怎么让屏幕前的人产生"我想亲自站在那里"的冲动？\n\n' +
        '答案在于放弃上帝视角。我决定采用第一人称徒步视角——观众不是一个旁观者，而是一个正在走向雪山的朝圣者。镜头高度保持在1.6米（人眼高度），手持微晃但不抖，呼吸声保留为环境音底。不追求完美构图，追求那种"我正走在这条路上"的沉浸感。\n\n' +
        '参考了《Free Solo》和《The Dawn Wall》的拍摄手法——不是展示山有多高，而是展示人有多渺小。',
      process:
        '团队在飞来寺驻扎了12天。前6天，卡瓦格博全程被云雾笼罩，连山腰都看不到。每天早上5点爬起来架机器，在零下15度的观景台等到9点，然后收工。那种无力感是真实的——你做了所有能做的准备，但山不给你看，你就是看不到。\n\n' +
        '第7天，凌晨4:30。气象App显示云层高度在6200米以上，有窗口。我们提前一个半小时到达观景台，架好两台机器。6:47，第一缕光线触到峰顶。接下来发生的事情我至今记得每一个细节：金色从峰顶开始往下流淌，像有人从天上倾倒融化的黄金。整座卡瓦格博在短短两分十七秒内被完全点亮。\n\n' +
        '那17秒原始素材，是摄影指导老徐抓到的——云层在日出前3分钟突然裂开一道缝隙，刚好框住了峰顶。他事后说那是他做了二十年的摄影指导以来最幸运的3分钟。\n\n' +
        '后期在DaVinci Resolve中完成。调色策略：高光暖金色（+15%饱和度），阴影偏冷蓝，形成冷暖对比；暗部保留细节而非压黑，让雪山有"发光"感而非"被打光"感。',
      result:
        '最终成片3分22秒。B站发布后首周播放量47万，转发1.2万。\n\n' +
        '最有价值的反馈来自评论区——有人留言说"看完订了飞丽江的机票"，有人问飞来寺的客栈怎么订。文旅局那边反馈说片子发布后一周，飞来寺区域的民宿预订量上升了约30%。\n\n' +
        '迪庆州文旅局后来把成片投放在香格里拉机场到达厅的大屏上。一个落地即见的邀请——那是比任何播放量数字都更让我满足的认可。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
      { role: '摄影指导', name: '老徐' },
      { role: '调色', name: '登山路' },
      { role: '委托方', name: '迪庆州文化和旅游局' },
    ],
    processImages: [
      '/images/process-meili-1.png',
      '/images/process-meili-2.png',
    ],
    isGroup: true,
    stills: [
      '/images/process-meili-1.png',
      '/images/process-meili-2.png',
    ],
  },
  {
    id: 'city-peak-shenzhen',
    title: '城市之巅',
    subtitle: '深圳城市宣传片',
    description: '创新不是目的，而是照亮未来的光。',
    coverImage: '/images/cover-city-peak-shenzhen.png',
    photoCoverImage: '/images/photo-cover-shenzhen.png',
    hasPhoto: true,
    videoUrl: 'https://www.bilibili.com/video/BV1uT4y1P7CX',
    type: 'promo',
    tags: ['城市', '航拍', '剪辑'],
    date: '2028-09-15',
    duration: '1:30',
    client: '深圳南山科技园',
    featured: true,
    story: {
      background:
        '南山科技园想做一支园区形象片。找了几家深圳本地的制作公司，提案都是"高楼大厦+无人机大全景+科技感BGM"，甲方觉得都差不多。\n\n' +
        '他们找到我时提了一个有意思的要求：不希望片子看起来像"房地产广告"。我理解他们的焦虑——科技园的形象片很容易拍成"这里有很多漂亮的写字楼，快来租"，但那不是他们想传达的。他们想说的是：这里的人在做什么。',
      thinking:
        '深圳的形象片有一个通病：太冷。玻璃幕墙、金属反光、LED灯带——拍出来很美，但没有人味。\n\n' +
        '我的切入点是：深圳最动人的不是科技本身，而是凌晨三点还在写代码的那些人。科技园的"光"不是LED灯，是那些凌晨还亮着的办公室窗户。\n\n' +
        '核心叙事线：从凌晨到日出再到夜晚，一天之内，在同一个科技园里发生的创造。用"光"作为视觉线索串联——凌晨的屏幕光 → 日出的自然光 → 白天的工作光 → 夜晚的城市光。\n\n' +
        '参考了苹果《The Underdogs》系列的叙事策略——不讲产品，讲人。',
      process:
        '拍摄分两个阶段：延时摄影需要连续拍摄日出（凌晨4点架机器），航拍在城市空域管制窗口期内完成，手持部分在科技园内部跟着真实员工拍了一天。\n\n' +
        '最大的挑战是航拍深圳湾大桥那段——当天海上雾大，能见度不足500米。我们等了两个小时，等到雾气稍微散开才起飞。最终拍到的画面有一个意料之外的效果：桥梁从雾中浮现，有一种"未来的城市正在成形"的隐喻——比晴天的版本更动人。\n\n' +
        '调色策略：日间偏冷（青蓝基调），夜间偏暖（金色灯光），日出段落用高动态范围保留天空的色彩渐变。',
      result:
        '90秒成片。甲方看完第一版就说"不用改了"。后来他们把成片用在了招商手册和官网首页。\n\n' +
        '一个细节让我觉得这次方向是对的：科技园的一位工程师在朋友圈转发时说"原来我们每天加班的地方拍出来这么好看"——他不是说"拍得真专业"，而是觉得被看见了。',
    },
    credits: [
      { role: '导演 / 剪辑', name: '登山路' },
      { role: '航拍摄影', name: '阿Ken' },
      { role: '调色', name: '登山路' },
      { role: '委托方', name: '深圳南山科技园' },
    ],
    processImages: [
      '/images/process-shenzhen-1.png',
      '/images/process-shenzhen-2.png',
    ],
  },
  {
    id: 'gongga-trek',
    title: '贡嘎转山：72公里的自我对话',
    subtitle: '一条朝圣之路的完整记录',
    description: '72公里，6天，无数次想放弃又坚持下来的瞬间。贡嘎教会我的不是征服，而是谦逊。',
    coverImage: '/images/cover-gongga-trek.png',
    photoCoverImage: '/images/photo-cover-gongga.png',
    hasPhoto: true,
    videoUrl: 'https://www.bilibili.com/video/BV1XW4y1M7F9',
    type: 'travel',
    tags: ['登山', '徒步', '风光'],
    date: '2028-07-10',
    duration: '12:48',
    featured: true,
    story: {
      background:
        '这不是一个商业项目。贡嘎转山是我自己想去。\n\n' +
        '2028年夏天，我状态很差。连续做了几个商业项目，技术越来越熟练，但感觉越来越不对劲——我开始不确定自己为什么做这一行了。拍出来的东西没有错，但也没有魂。\n\n' +
        '一个做户外向导的朋友跟我说："你去走一趟贡嘎吧，走完你就知道了。"我问他知道什么，他说："走完你就知道了。"',
      thinking:
        '这条片子的核心问题不是怎么拍，而是拍什么。\n\n' +
        '户外影像通常有两种：一种是"征服叙事"——人类战胜自然的英雄故事；一种是"风光叙事"——把自然拍得像明信片。我想做第三种——"对话叙事"。不把自己放在征服者的位置，也不把自己放在旁观者的位置，而是和大山进行一次平等的对话。\n\n' +
        '我决定不写脚本。只带一台相机和一个麦克风。走到哪儿拍到哪儿，想到什么说什么。后期再根据素材来组织叙事——这对我来说是一种完全反过来的工作方式，但也是我需要的。\n\n' +
        '参考了Werner Herzog的纪录片哲学：不要试图控制现实，要观察现实。',
      process:
        '贡嘎大环线全程约72公里，最高点日乌且垭口海拔4900米。\n\n' +
        '第三天的垭口段是最崩溃的。海拔从3900米攀升到4900米，稀薄的空气让每一步都像在深水里走路。我清楚地记得有一段200米的碎石坡我走了将近40分钟——那种身体的极限和意志的消磨不是拍出来的，是真实的。我在对讲机里说"我不行了，我想下撤"，向导回我一句"你已经走了三分之二了"——那种被堵在半路的感觉比身体的累更难熬。\n\n' +
        '站在垭口的时候，整个贡嘎西坡的冰川尽收眼底。但我没有像预想的那样激动——更多的是一种平静。72公里的路告诉我一件事：那些你以为撑不过去的时刻，最后都会过去。\n\n' +
        '后期剪辑用了将近两周。素材量不大（大约4个小时），但每一段都需要找到它在叙事中的位置。音乐选用了一支冰岛的钢琴曲，缓慢、空旷，不煽情。',
      result:
        '12分48秒的成片。没有发布在任何商业渠道，只放在了自己的B站频道。\n\n' +
        '但评论区收到了三百多条留言，其中很多是同样走过贡嘎的人。有人说"看着哭了，仿佛又走了一遍"。还有人说"明年我要去走"。\n\n' +
        '这部片子对我个人的意义大于任何商业项目。它帮我找回了一个重要的认知：影像的力量不在于多好看，而在于多诚实。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
      { role: '向导', name: '扎西' },
      { role: '户外协作', name: '康巴户外' },
    ],
    processImages: [
      '/images/process-gongga-1.png',
      '/images/process-gongga-2.png',
    ],
    isGroup: true,
    stills: [
      '/images/process-gongga-1.png',
      '/images/process-gongga-2.png',
    ],
  },
  {
    id: 'light-and-shadow',
    title: '光影之间',
    subtitle: '珠宝品牌广告片',
    description: '光不是照在珠宝上的，光是从珠宝里流出来的。',
    coverImage: '/images/cover-product-tech.png',
    type: 'commercial',
    tags: ['产品', '调色'],
    date: '2028-06-20',
    duration: '0:45',
    client: '隐山珠宝',
    story: {
      background:
        '隐山珠宝是一个刚成立两年的独立设计师品牌。创始人是一位从Tiffany回来的珠宝设计师，作品风格偏极简东方——大量留白、不对称线条、未经打磨的矿石质感。\n\n' +
        '他们之前拍过一支产品视频，是找摄影师棚拍的——黑色背景、环形灯、旋转台，标准的珠宝拍摄流程。创始人看完说"这不是我的东西"。她找到我，问能不能拍出"光在石头里面走"的感觉。',
      thinking:
        '传统珠宝广告的逻辑是"让产品看起来更贵"——高光打在金属面上，深色背景衬托宝石的折射。但隐山的珠宝不是"贵"的逻辑，是"光"的逻辑。\n\n' +
        '我的核心思路：放弃展示珠宝本身，转而展示光与矿物的关系。镜头语言上用微距捕捉光线在宝石内部的折射路径，让每一帧都像一幅抽象画——观众看到的不是"一枚戒指"，而是"一束光穿过一个世界"。\n\n' +
        '参考了James Turrell的光空间装置和Olafur Eliasson的自然光实验。45秒的片子，没有一句旁白，没有产品特写，只有光在宝石内部缓慢流淌的画面。这是一个冒险的决定——甲方可能会说"我看不清产品"。',
      process:
        '灯光方案是最核心的技术挑战。用单点光源（1000W钨丝灯）加棱镜分光，制造彩虹折射效果。光穿过棱镜后打在宝石背面，摄影机从正面捕捉光线在矿石内部的路径。\n\n' +
        '镜头用100mm F2.8微距，光圈全开。运镜用的是电动滑轨，速度0.5°/秒的极慢推进——一块2厘米长的宝石，在画面里走了整整12秒才"穿过"。\n\n' +
        '后期在DaVinci Resolve中做了大量二级调色。宝石内部的光谱需要被强化但又不能失真——我们用了一个自定义的LUT，在保留真实折射颜色的基础上提高了20%的饱和度，让彩虹光谱更接近人眼实际感知的丰富度而非相机记录的。',
      result:
        '45秒成片。给甲方看第一版的时候，创始人沉默了三秒钟，然后说"这个对了"。\n\n' +
        '品牌把成片用在官网首页和线下门店的循环展播。后来他们告诉我，上海连卡佛买手店的买手就是看了这条片子决定引进他们的产品——买手说"这是我这几年见过最有审美自信的珠宝广告"。\n\n' +
        '对于我来说，这45秒证明了：商业广告也可以不叫卖。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
      { role: '灯光指导', name: '陈工' },
      { role: '调色', name: '登山路' },
      { role: '委托方', name: '隐山珠宝' },
    ],
    processImages: [
      '/images/process-jewelry-1.png',
      '/images/process-jewelry-2.png',
    ],
  },
  {
    id: 'on-the-road-chuanxi',
    title: '在路上：川西14天',
    subtitle: '一个人、一台车、一条未知的路',
    description: '14天自驾穿越川西高原，没有目的地，只有方向。',
    coverImage: '/images/cover-traveler-mountain.png',
    videoUrl: 'https://www.bilibili.com/video/BV1h54y1Q7rG',
    type: 'vlog',
    tags: ['旅行', '剪辑'],
    date: '2028-05-05',
    duration: '18:24',
    story: {
      background:
        '贡嘎转山之后，我养成了一个习惯：每年给自己安排一次"没有甲方"的旅行拍摄。不是为了出作品，就是为了保持那种"想拍什么就拍什么"的原始冲动。\n\n' +
        '2028年春天，我租了一辆SUV，从成都出发，往西走。没有固定路线，没有时间表。唯一的方向是"往高了走"——318国道往康定，然后找路往四姑娘山、色达、稻城的方向绕。',
      thinking:
        '旅行Vlog最容易陷入两个陷阱：流水账（"大家看我到了XX景点"）和表演（"假装很放松但其实每个镜头都NG了5次"）。\n\n' +
        '这条片子的核心策略：音乐先行。先选定一首节奏舒缓的Post-rock（选的是Sigur Rós的《Hoppípolla》器乐版），然后按音乐的起伏来剪辑画面的松紧。音乐安静的段落放长镜头（车窗外掠过的雪山、一个人吃饭的侧影），音乐上扬的段落放动感素材（无人机拉升、加速奔跑的背影）。\n\n' +
        '旁白极少，几乎只有环境音和音乐。我不解释这里是什么地方，有多美——让画面自己说话。观众的想象永远比我的描述更丰富。\n\n' +
        '参考了Casey Neistat的"随性但不随便"的Vlog哲学——不设计，但有审美。',
      process:
        '14天下来拍了大约12小时的素材。每天开车4-6小时，到了地方就拍，拍到天黑就找地方住。\n\n' +
        '色达那段是意外之喜。我到的时候下午4点，红房子在夕阳光里像一片燃烧的珊瑚。拿出无人机升到200米高度拍了一段俯瞰——穿红衣的觉姆（尼姑）在红房子之间走动，像流动的血脉。后来这段成了全片播放量最高的片段。\n\n' +
        '剪辑花了三个星期。不是因为素材多，而是因为节奏感需要反复调整。音乐和画面的对应关系不能太"准"——太精准会像MV，太松散会像随机拼贴。找到一个中间状态用了大量时间。',
      result:
        '18分24秒的成片。B站播放量31万，弹幕最多的一句是"想辞职"。\n\n' +
        '有无聊的人算过，14天的成本（租车+油费+吃住）一共4700块。有人在评论里说"4700块换31万播放，值了"——但我做这条片子不是为了数据。我就是想让自己记住：影像最开始吸引我的，不是甲方，是路上。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-chuanxi-1.png',
      '/images/process-chuanxi-2.png',
    ],
    isGroup: true,
    stills: [
      '/images/process-chuanxi-1.png',
      '/images/process-chuanxi-2.png',
    ],
  },
  {
    id: 'heritage-craft',
    title: '指尖上的非遗',
    subtitle: '苗族银饰锻造纪实',
    description: '72岁的龙师傅是村里最后的银匠。他锤下的银片比纸还薄，却比任何语言都重。',
    coverImage: '/images/cover-documentary-village.png',
    videoUrl: 'https://www.bilibili.com/video/BV1zb4y1Z7Rj',
    type: 'documentary',
    tags: ['人物', '调色'],
    date: '2028-04-12',
    duration: '22:10',
    story: {
      background:
        '这个项目缘起于一个公益纪录片计划——用影像记录正在消失的传统手艺。贵州苗寨的银饰锻造技艺虽然被列入国家级非物质文化遗产，但在现代化冲击下，年轻人大多外出打工，愿意花十年学这门手艺的人凤毛麟角。\n\n' +
        '72岁的龙师傅是村子里最后一个还在打银的人。他的祖父是银匠，父亲是银匠，他从12岁开始学，打了整整60年。但他儿子在深圳做程序员，孙子连苗语都不会说。',
      thinking:
        '非遗纪录片的危险在于"猎奇"——把传统手艺拍成博物馆里的标本，观众看完觉得"好厉害"然后滑走了。\n\n' +
        '我的策略是放弃"解说式"纪录片，采用"跟随式"。没有主持人，没有旁白，没有"苗族银饰锻造技艺源远流长"的解说词。镜头就是一双眼睛，安静地观察龙师傅的一天——他早上几点起来生火、他怎么挑选银料、他锤了多少下才锤出一片叶子形状的银片。\n\n' +
        '全程手持+稳定器，画面有轻微的呼吸感但不晃。不设摆拍——龙师傅干活的时候我就在旁边拍，他休息喝茶的时候我也拍。真实的力量大于一切修饰。\n\n' +
        '参考了《寿司之神》和《我在故宫修文物》的记录态度——不是讲技艺，是讲人。',
      process:
        '在苗寨住了5天。第一天龙师傅不太说话，只是埋头干活。第二天开始有一搭没一搭地聊——聊他年轻时去镇上赶集的经历，聊他儿子小时候最喜欢的一把银锁。拍到第三天的时候，他已经完全忽略了我的存在。\n\n' +
        '最触动我的一段素材：龙师傅在锤一片蝴蝶花纹的银片，锤到第47下的时候突然停下来，说"这片不行"，然后把它扔回熔炉重做。我问为什么，他指给我看——花纹的右下角比左上角厚了不到0.2毫米。他说："客人看不出来，我看得出来。"\n\n' +
        '后期选择了低饱和度处理——环境偏暖偏旧，保留银器的冷白本色，形成冷暖对比。声音处理上保留了锤击声和火炉的噼啪声，没有覆盖任何背景音乐。',
      result:
        '22分10秒的成片。B站播放量19万，点赞1.8万。\n\n' +
        '最意外的事情是，片子发布一周后，龙师傅的孙女（在成都读大学）联系我，说她看完片子哭了，寒假要回村里跟爷爷学打银。\n\n' +
        '还有一个插曲：贵州某文旅局看了片子后，把龙师傅的作坊列为非遗体验点——现在有游客专程去学一个下午的银饰制作。龙师傅说"忙起来了，想退休都不行"。\n\n' +
        '这部片子让我意识到：影像的力量在于发现值得被看见的东西，然后把它们放在别人能看见的地方。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
      { role: '翻译协助', name: '阿苗' },
      { role: '公益协作', name: '非遗影像计划' },
    ],
    processImages: [
      '/images/process-heritage-1.png',
      '/images/process-heritage-2.png',
    ],
    isGroup: true,
    stills: [
      '/images/process-heritage-1.png',
      '/images/process-heritage-2.png',
    ],
  },
  {
    id: 'solitude-dance',
    title: 'SOLITUDE',
    subtitle: '独舞影像MV',
    description: '在一个废弃的水泥工厂中，舞者用身体语言诠释从困顿到释放的情感弧线。',
    coverImage: '/images/cover-concert-music-video.png',
    type: 'mv',
    tags: ['音乐', '调色'],
    date: '2028-03-18',
    duration: '3:42',
    story: {
      background:
        '音乐人林屿写了一首关于独处的歌，叫《SOLITUDE》。他找到我，说想拍一支MV。预算少到近乎没有——只有3000块——但他给了一个让我无法拒绝的创作自由度：怎么拍都行，没有任何限制。\n\n' +
        '这种"怎么拍都行"的案子，要么拍出最好的东西，要么拍出最烂的东西。没有中间状态。',
      thinking:
        '歌的核心情绪是独处——从压抑到释放的渐变。我决定把这种情绪外化为空间和身体的关系。\n\n' +
        '找到了一个废弃的水泥工厂作为场景——巨大的灰色空间、破碎的窗户、铁锈的楼梯。在这样的空间里，一个人会显得特别渺小，那种"被环境压迫"的感觉正是我想要的。\n\n' +
        '视觉策略：黑白为主（占90%的时长），只在情绪爆发的两个节点插入单色——红色在"愤怒"段落，蓝色在"释放"段落。广角低角度拍摄，让空间显得更加压倒性。慢动作拍摄（120fps），后期与正常速度交叉剪辑，制造节奏感。\n\n' +
        '舞者选了一个现代舞出身的朋友。没有编舞，只是跟她讲了情绪弧线——从蜷缩到伸展，再到奔跑——让她在工厂空间里自由即兴。拍了整整一个下午，最后选了最诚实的那些片段。',
      process:
        '废弃工厂的拍摄条件很差。没有电，带了两个LED灯板+V口电池；地面很多碎玻璃，舞者是光脚的；冬天，工厂里和外面一样冷，舞者每拍一段就要裹上羽绒服暖一会儿。\n\n' +
        '最打动我的一场：舞者在工厂二楼的一个窗口前即兴了一段旋转，逆光，头发和裙摆在空中散开。那个moment没有任何设计，就是发生了。后期我把这段放在音乐的高潮点——之前的黑白画面从这一帧开始渐渐渗入蓝色，像是冰冷的水里滴进一滴墨水。\n\n' +
        '后期在DaVinci Resolve完成调色。黑白部分不是简单的去饱和度，而是用了Blue/Yellow通道混合来模拟Kodak Tri-X胶片的黑白质感——暗部偏青，高光偏暖。红色和蓝色的单色部分是手工关键帧追踪的，用于精确控制颜色出现的时刻和扩散速度。',
      result:
        '3分42秒的成片。林屿看完说"这3000块是我花得最值的3000块"。上线后B站播放量15万——对于一个独立音乐人来说是不错的成绩。\n\n' +
        '后来有一个独立电影节收录了这支MV，评委的评语是："用影像而非歌词讲完了歌曲的故事。"这句话让我觉得方向对了——MV不应该是歌词的视觉翻译，而应该是音乐的平行叙事。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑 / 调色', name: '登山路' },
      { role: '舞者', name: 'Aya' },
      { role: '音乐', name: '林屿' },
      { role: '灯光助理', name: '阿Ken' },
    ],
    processImages: [
      '/images/process-solitude-1.png',
      '/images/process-solitude-2.png',
    ],
  },
  {
    id: 'echo-experimental',
    title: '回声',
    subtitle: '实验影像短片',
    description: '关于记忆与遗忘的实验短片。每一次回忆，都是一次重新构建。',
    coverImage: '/images/cover-experimental-neon.png',
    type: 'creative',
    tags: ['实验', '剪辑'],
    date: '2028-02-10',
    duration: '6:18',
    story: {
      background:
        '这是一部没有任何委托方的短片。纯粹的个人表达。\n\n' +
        '2028年初，我在整理硬盘的时候发现了一段2015年拍的旧素材——外婆在老家的院子里晒太阳，背景声音是电视里的戏曲。外婆2019年去世了。那14秒的素材我反复看了很多遍，发现每次重温的时候，记忆都在微妙地改变——有时候觉得那个院子很大，有时候觉得很小；有时候觉得那天是春天，但窗外的树明明叶子已经黄了。\n\n' +
        '记忆是精确的回放，还是每一次回忆时的重新构建？这部短片试图用影像回答这个问题。',
      thinking:
        '实验短片最怕"看不懂"。但我的目标不是制造困惑，而是制造感受——观众不需要"理解"这部短片，只需要感觉自己的记忆被搅动了。\n\n' +
        '核心技法：\n1. 多重曝光——同一画面叠加3-5层不同时间拍摄的影像，模拟记忆的层叠感\n2. 声画错位——声音与画面不同步（有时声音比画面早0.5秒，有时晚0.5秒），制造微妙的违和感，模拟"觉得肯定是这样的但其实不太确定"的记忆体验\n3. 16mm胶片颗粒——After Effects模拟，让画面有一种"被时间磨损"的质感\n4. 色彩策略——整体偏暖褪色（像老照片），但在关键记忆时刻突然高饱和（像那一刻在脑海中突然清晰）\n\n' +
        '参考了Chris Marker的《堤》——用静态影像讲述流动的记忆，以及Bill Viola的慢速影像装置。',
      process:
        '素材来源很杂：外婆的14秒、几年前旅行的空镜、在街上随手拍的陌生人、电脑录屏的桌面碎片、翻拍的家庭相册。没有专门拍摄任何新素材——所有的影像都是"被捡到的"，就像记忆本身也是被捡到的碎片。\n\n' +
        '多重曝光的技术实现：在After Effects里把多个图层叠加，透明度在30%-70%之间变化。不是所有画面都叠加——大部分画面是清晰的，只在"记忆闪回"的节点出现重叠。那些重叠的画面会根据音乐节奏变化透明度，像记忆在脑海里浮沉。\n\n' +
        '声音设计请了一个做实验音乐的朋友。他在环境音底上叠加了外婆生前说话的一小段录音（从手机里找到的），但做了大量降速和倒放处理——你能听出那是一个老人在说话，但听不清在说什么。那种"模糊的熟悉感"就是我想要的。',
      result:
        '6分18秒的成片。投了一个独立影展的实验单元，入围了但没有获奖。\n\n' +
        '但我收到了一封让我印象深刻的观众来信：一位在海外留学的女生说，她看完之后翻出了自己奶奶的照片，"我以前觉得回忆是软弱的，但你的片子让我觉得回忆是有力量的"。\n\n' +
        '这部短片我很少给人看。它太私人了。但每次回看，我知道它不是一次创作，而是一次对话——和过去，和记忆，和那个手里还拿着老式DV的自己。',
    },
    credits: [
      { role: '导演 / 剪辑 / 视觉设计', name: '登山路' },
      { role: '声音设计', name: '周觉' },
    ],
    processImages: [
      '/images/process-echo-1.png',
      '/images/process-echo-2.png',
    ],
  },
  {
    id: 'best-time-wedding',
    title: '最好的时光',
    subtitle: '苍山洱海间的婚礼',
    description: '不设摆拍，只在旁边安静记录。婚礼不是表演，是两个生命的交汇。',
    coverImage: '/images/cover-wedding-cinematic.png',
    photoCoverImage: '/images/photo-cover-wedding.png',
    hasPhoto: true,
    type: 'event',
    tags: ['婚礼', '调色'],
    date: '2028-01-22',
    duration: '8:55',
    story: {
      background:
        '新娘是我的大学同学。她和她先生在一起八年，从校园到社会，从深圳到北京再到深圳。他们决定把婚礼放在大理——"不是在酒店里走个流程，是真的想在一个我们喜欢的地方，和喜欢的人在一起"。\n\n' +
        '她问我能不能帮他们记录。我说好，一个条件：不要摆拍。她先生笑了说"我们本来就是最怕摆拍的人"。',
      thinking:
        '婚礼影像的通病是表演感太强。新郎新娘面对镜头微笑、伴娘伴郎摆出"很欢乐"的姿态——你知道那是真的开心，但经过了镜头的翻译就变了味。\n\n' +
        '我的策略：双机位，但两个机位都不被注意到。主机跟随新娘，副机在人群中游走捕捉来宾的自然反应。收音用领夹麦（新郎新娘各一）+环境音双轨独立录制。\n\n' +
        '后期剪辑不按时间顺序——婚礼当天从早到晚的时间线对于外人来说是无聊的。按情绪来剪：开篇是一段环境氛围（洱海的晨光→苍山的云→场地的花），然后切到新娘化妆间的私密时刻，再到仪式的核心段落，最后用派对上的混乱与欢笑收尾。\n\n' +
        '音乐选了Sufjan Stevens的《Mystery of Love》——不是传统的婚礼进行曲，但那种温柔又略带不确定的旋律，更接近婚姻真正的质地。',
      process:
        '大理冬天风大，户外仪式的声音录制是个挑战。领夹麦的风噪在前期测试时几乎是灾难级别的——最后是用死猫套+后期iZotope RX降噪才保住了誓言那一分钟的干净音频。\n\n' +
        '拍摄当天我最满意的一个决定：在仪式结束后，我没有立刻关机。新郎新娘在退场后走到洱海边一块礁石上，背对着所有人，两个人就那么站着，什么也没说。没有人在拍他们（摄影师和摄像师的合同已经结束了），只有我的副机远远地记录了三分钟。那三分钟后来成了全片的结尾——两个人面向洱海，苍山在背后，天光渐暗。没有台词，没有拥抱，没有煽情，就只是两个人一起站着。\n\n' +
        '调色走暖色调（带一点点柯达Portra胶片的褪色感），高光保留了洱海面反光的细节而不是过曝成一片白。自然光感是第一优先——不把人拍成"打了光的"，而是拍成"刚好被光照到的"。',
      result:
        '8分55秒的成片。新娘看完发了一段语音，说到一半哭了："我以为你会拍我们俩怎么美，但你拍的是我们俩怎么在一起。"\n\n' +
        '这不是一个商业案例。但它的意义在于让我确认了一个信念：好的记录不是制造瞬间，是发现瞬间。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
      { role: '副机摄影', name: '阿Ken' },
      { role: '调色', name: '登山路' },
    ],
    processImages: [
      '/images/process-wedding-1.png',
      '/images/process-wedding-2.png',
    ],
    isGroup: true,
    stills: [
      '/images/process-wedding-1.png',
      '/images/process-wedding-2.png',
    ],
  },
  {
    id: 'flux-motion',
    title: 'FLUX',
    subtitle: '动态品牌视觉系统',
    description: '从粒子聚合到Logo成型，一套会呼吸的品牌动效。',
    coverImage: '/images/cover-motion-graphics.png',
    orientation: 'landscape',
    type: 'motion',
    tags: ['片头', '剪辑'],
    date: '2027-12-05',
    duration: '2:15',
    client: 'FLUX Labs',
    story: {
      background:
        'FLUX Labs是一家做AI数据可视化的初创公司。2027年底他们拿到A轮融资后想做一次品牌升级，需要一套从Logo演绎到数据动效的完整视觉系统。\n\n' +
        '他们之前的Logo是一个静态的渐变色圆环——"像一个甜甜圈"（CEO原话）。新的品牌方向是"流动的数据"——不是静态的图标，而是一个有生命的动态系统。',
      thinking:
        '品牌动效设计不同于影视制作——不是追求"好看"，而是追求"好用"。Logo需要在各种场景下（官网加载、App启动、PPT封面、视频片头）都能流畅演绎，且不依赖任何特定的播放环境。\n\n' +
        '技术选型：After Effects完成核心动画设计，通过Lottie/Bodymovin导出为JSON格式的矢量动画——可以在Web（轻量Lottie播放器）、移动端（iOS/Android原生Lottie）和视频中无缝使用。这是"做一套、用所有"的思路——设计师的动画被导出一个JSON后，前端只需3行代码就能在任何地方复现一模一样的动画，不依赖视频渲染，不依赖After Effects，文件从几十MB变成几十KB。\n\n' +
        '设计语言：\n1. Logo演绎——从粒子聚合到圆环成型（5秒），粒子之间的运动遵循流体力学模拟，不能是简单随机\n2. 数据可视化动效——把运营数据（用户增长、活跃度等）转化为自然流动的有机形态\n3. UI过渡动效——App内页面转场的微交互\n\n' +
        '参考了Google Material Design的动效哲学——动效不是装饰，是引导注意力和建立空间关系的手段。',
      process:
        'Logo演绎做了12个版本。最大的挑战是粒子聚合的速度感——太快像爆炸倒放，太慢像催眠。最终版本用了分段缓动：前2秒粒子分散飘荡（ease-out），中间1.5秒加速聚合（ease-in），最后1.5秒缓慢收敛成型（spring）。节奏感像一次深呼吸。\n\n' +
        'Lottie导出的工作量远超预期——After Effects里大量表达式和效果器无法被Bodymovin识别，需要逐一替换为原生关键帧动画。初始导出时JSON文件体积8MB，经过去重优化后压缩到800KB。\n\n' +
        '数据可视化部分用Three.js做了一个3D演示版本（粒子云实时响应用户鼠标），但最终交付还是以2D Lottie版本为主——3D版本在低端设备上的性能开销太大，FLUX担心在潜在客户的旧手机上跑不动。这个取舍后来被证明是正确的。',
      result:
        '整套系统交付后，FLUX的CTO在官网上线当天发了一条消息："我们的投资人今天问我Logo能不能动，我说能，然后给他看了官网加载动画——他就开始聊下一轮的估值了。"\n\n' +
        '产品总监后来告诉我：新的App图标用动态版本在App Store预览中获得了比静态版本多40%的详情页点击量。\n\n' +
        '这个项目让我最深的体会是：动效设计不是"让东西动起来"，而是想清楚什么东西在什么时刻以什么方式动——每一个运动都需要有意义。',
    },
    credits: [
      { role: '动效设计 / 视觉指导', name: '登山路' },
      { role: '前端协作', name: 'FLUX Labs 工程团队' },
      { role: '声音设计', name: '周觉' },
      { role: '委托方', name: 'FLUX Labs' },
    ],
    processImages: [
      '/images/process-flux-1.png',
      '/images/process-flux-2.png',
    ],
  },

  // ─── 竖屏短片（portrait 3:4）────────────────────────────────────────────────
  {
    id: 'street-portrait-guangzhou',
    title: '广州一日',
    subtitle: '城市街头纵向记录',
    description: '行走就是拍摄，每一条小巷都藏着一个人的生活证据。',
    coverImage: '/images/portrait-cover-guangzhou.png',
    videoUrl: 'https://www.bilibili.com/video/BV1xx411c7mD',
    orientation: 'portrait',
    type: 'vlog',
    tags: ['人文', '街拍', '竖屏'],
    date: '2024-03-10',
    year: '2024',
    subject: '城市人文',
    gear: '索尼 ZV-E10 + 35mm F1.8',
    duration: '3:21',
    story: {
      background:
        '广州北京路的早晨六点。摆摊的婆婆、早餐店的烟火、骑车路过的外卖小哥——这些画面没有全景航拍的宏大，却有一种真实的重量。',
      thinking:
        '竖屏强迫观看者聚焦于一个局部。我想用这种亲密的视角记录广州街头的生活证据。',
      process:
        '单机稳定器一整天，全程手持，只带一块备用电池。最有趣的画面来自一位小朋友，他用馒头对着镜头外的摩托车认真行礼。',
      result:
        '发布后四天播放量超过15万，评论第一条就是"和我家楼下一样"。',
    },
    credits: [
      { role: '导演 / 摄影', name: '登山路' },
      { role: '剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-guangzhou-1.png',
      '/images/process-guangzhou-2.png',
    ],
  },
  {
    id: 'mountain-hiker-portrait',
    title: '登山者',
    subtitle: '高海拔的脸',
    description: '再小的相机也有一双望不够高山的眼睛。',
    coverImage: '/images/portrait-cover-hiker.png',
    photoCoverImage: '/images/photo-cover-hiker.png',
    hasPhoto: true,
    videoUrl: 'https://www.bilibili.com/video/BV1Gx411M7bV',
    orientation: 'portrait',
    type: 'documentary',
    tags: ['登山', '人物', '竖屏'],
    date: '2024-05-15',
    year: '2024',
    subject: '人物纵写',
    gear: '索尼 FX3 + 85mm F1.4',
    duration: '5:48',
    story: {
      background:
        '卡瓦格博峰山脚小镇，遥望山顶。周欢其是一个六十岁的藏族老向导，这是他第十四次来到这里。',
      thinking:
        '不要拍山，拍一个与山相伴了一辈子的人。',
      process:
        '连续跟拍两天，从他准备物资到出发、途中休息、最终抵达观景点。竖屏框道让观众和他的面孔更近。',
      result:
        '山野游社区转发后反响热烈，说"看到这个视频我想找这样的向导"。',
    },
    credits: [
      { role: '导演 / 摄影', name: '登山路' },
      { role: '剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-hiker-1.png',
      '/images/process-hiker-2.png',
    ],
    isGroup: true,
    stills: [
      '/images/process-hiker-1.png',
      '/images/process-hiker-2.png',
    ],
  },
  {
    id: 'night-market-chengdu',
    title: '成都夜宵',
    subtitle: '刹那的烟火气从筷子里升起来',
    description: '夜市的灯火和烟火，构成成都最真实的第二层。',
    coverImage: '/images/portrait-cover-chengdu.png',
    photoCoverImage: '/images/photo-cover-chengdu.png',
    hasPhoto: true,
    videoUrl: 'https://www.bilibili.com/video/BV1Hx4y1X7Tr',
    orientation: 'portrait',
    type: 'travel',
    tags: ['美食', '夜景', '竖屏'],
    date: '2024-01-20',
    year: '2024',
    subject: '美食人文',
    gear: '索尼 A7C + 50mm F1.2',
    duration: '2:56',
    story: {
      background:
        '成都宽窄巷1号小地。凌晨十二点，面前是满桌的串串、锅里赤红的汤底、汗流浃背的面条师傅。这些画面真实得让人眼眶发酸。',
      thinking:
        '就用竖屏扎进烟火里。小屏占满了才能传达这个域的喧嚣。',
      process:
        '轻装单机无脚架街游记录，没有补光，只依靠现场光和店面灯光。最终拍到存储卡满才回酒店。',
      result:
        '整个视频没有一句口语，全程环境音加配乐，四天内播放量达到48万。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-chengdu-1.png',
      '/images/process-chengdu-2.png',
    ],
    isGroup: true,
    stills: [
      '/images/process-chengdu-1.png',
      '/images/process-chengdu-2.png',
    ],
  },
  {
    id: 'tea-farmer-yunnan',
    title: '叶上春秋',
    subtitle: '云南老茶农的一天',
    description: '最年轻的茶农六十岁，最年老的茶树三百岁。',
    coverImage: '/images/portrait-cover-tea.png',
    videoUrl: 'https://www.bilibili.com/video/BV1Lx4y1v7En',
    orientation: 'portrait',
    type: 'documentary',
    tags: ['人物', '远行', '竖屏'],
    date: '2023-04-05',
    year: '2023',
    subject: '人文纪实',
    gear: '索尼 A7M4 + 35mm F1.4',
    duration: '7:12',
    story: {
      background:
        '云南普洱古茶山。一块已经在家族里传了六代的茶地。老丹的儿子已经去了大城市，她一个人守在这山里。',
      thinking:
        '不找山上的全景，只拍她的手和肩背。竖屏让要讲的东西精准了。',
      process:
        '跟她一起凌晨四点起床采茶。光线减弱后用手机补拍，没有指挥，她走我跟。',
      result:
        '成都茶叶商用作商业素材引用，来访看过的人经常表示"看完真的去买茶了"。',
    },
    credits: [
      { role: '导演 / 摄影', name: '登山路' },
      { role: '剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-tea-1.png',
      '/images/process-tea-2.png',
    ],
  },
  {
    id: 'ballet-dancer-backstage',
    title: '幕后六分钟',
    subtitle: '一个芭蕾演员的周五夜晚',
    description: '灯光点亮之前，座位满了，她还在幕后独自对着镜子。',
    coverImage: '/images/portrait-cover-ballet.png',
    videoUrl: 'https://www.bilibili.com/video/BV14x4y1Z7cX',
    orientation: 'portrait',
    type: 'documentary',
    tags: ['人物', '艺术', '竖屏'],
    date: '2024-02-28',
    year: '2024',
    subject: '艺术人纵写',
    gear: '索尼 FX3 + 50mm F1.2',
    duration: '4:15',
    story: {
      background:
        '广州大剧院。莉莉是今年的主角，她从小学芭蕾，今年二十六岁。我想拍的是幕后的她，不是舞台上的她。',
      thinking:
        '竖屏让人物占满屏幕，引导观众直接与表演者面对面。',
      process:
        '连续跟拍三场演出。最好的画面在演出前，她独自在幕后用坐着的姿势准备热身等待登场。',
      result:
        '广州文化局小红书转发，评论区很多人说"看到她的演出之后第一次想去看芭蕾"。',
    },
    credits: [
      { role: '导演 / 摄影', name: '登山路' },
      { role: '剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-ballet-1.png',
      '/images/process-ballet-2.png',
    ],
  },
  {
    id: 'fishing-village-dawn',
    title: '渔港日出',
    subtitle: '山东日照渔港的清晨',
    description: '第一网鱼还没收，渔船就已经出港。天默默亮起来。',
    coverImage: '/images/portrait-cover-fishing.png',
    videoUrl: 'https://www.bilibili.com/video/BV1pJ411G7Vh',
    orientation: 'portrait',
    type: 'travel',
    tags: ['纪实', '海洋', '竖屏'],
    date: '2023-08-12',
    year: '2023',
    subject: '渔村人文',
    gear: '索尼 A7C + 28mm F2',
    duration: '3:44',
    story: {
      background:
        '山东日照渔港。不是旅游景点，就是一个日常工作的渔港。也没有什么特别的故事，就是一个人一天的日子。',
      thinking:
        '竖屏自带的垂直感，把人立在海和天之间的气质截出来。',
      process:
        '凌晨五点跟船家出发，文化差异导致没有什么有意识的语言交流，只是跟着看。',
      result:
        '平台推荐后单视频观看量超过六十万，评论区变成了许多人对这个渔港的向往。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-fishing-1.png',
      '/images/process-fishing-2.png',
    ],
    isGroup: true,
    stills: [
      '/images/process-fishing-1.png',
      '/images/process-fishing-2.png',
    ],
  },
  {
    id: 'craftsman-bamboo-art',
    title: '竹山居后',
    subtitle: '湖南竹编匠人的年味',
    description: '他一天能完成一个竹编筐，不多也不少。',
    coverImage: '/images/portrait-cover-bamboo.png',
    videoUrl: 'https://www.bilibili.com/video/BV1Kx4y1Z7Ua',
    orientation: 'portrait',
    type: 'documentary',
    tags: ['非遗', '手工', '竖屏'],
    date: '2024-04-18',
    year: '2024',
    subject: '民间非遗',
    gear: '索尼 A7M4 + 90mm微距',
    duration: '6:30',
    story: {
      background:
        '湖南某安小镇。胡巧的父亲就这样指导他编竹，也就这样附着一代一代传了下来。',
      thinking:
        '竖屏让手部和竹节关系专注。就这一个主题。',
      process:
        '第一天全程远拍，第二天才拿近。手部的微距拍到了竹节上无数次刷动摩擦的痕迹。',
      result:
        '去外地工作的年轻人看到这个视频，就回来买了他父亲的竹筐。',
    },
    credits: [
      { role: '导演 / 摄影', name: '登山路' },
      { role: '剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-bamboo-1.png',
      '/images/process-bamboo-2.png',
    ],
  },
  {
    id: 'surfer-hainan',
    title: '海南浪',
    subtitle: '一个冲浪者的冬季',
    description: '冬天来海南冲浪的人，多半不是为了浪。',
    coverImage: '/images/portrait-cover-surf.png',
    videoUrl: 'https://www.bilibili.com/video/BV1kx4y1S7Xx',
    orientation: 'portrait',
    type: 'travel',
    tags: ['运动', '海洋', '竖屏'],
    date: '2024-01-08',
    year: '2024',
    subject: '运动人文',
    gear: '索尼 FX3 + 防水壳 + 大疆 Osmo Action',
    duration: '4:58',
    story: {
      background:
        '三亚日月湾海滩。每年冬天，北方冲浪者南下，海滩就换了面貌。我把这种现象称为"季节接山"。',
      thinking:
        '竖屏把海浪和人都圈进来了。一种被包裹的感觉。',
      process:
        '防水壳带着摄影机下水跟拍，第三天才拍到一个好浪。标准镜头是一切。',
      result:
        '吸引了一批冲浪社区粉丝，并有多个品牌主动联系合作。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-surf-1.png',
      '/images/process-surf-2.png',
    ],
    isGroup: true,
    stills: [
      '/images/process-surf-1.png',
      '/images/process-surf-2.png',
    ],
  },
  {
    id: 'flower-market-spring',
    title: '迎春花市',
    subtitle: '广州花市夜走一圈',
    description: '一年一度的花市，人与花的面貌都是季节的符号。',
    coverImage: '/images/portrait-cover-flower.png',
    videoUrl: 'https://www.bilibili.com/video/BV1Xx4y1T7bX',
    orientation: 'portrait',
    type: 'vlog',
    tags: ['节庆', '人文', '竖屏'],
    date: '2024-02-08',
    year: '2024',
    subject: '广州民俗',
    gear: '索尼 ZV-E10 + 24mm F2.8',
    duration: '2:33',
    story: {
      background:
        '广州花地广场花市。除夕前一晚，万人涌动。我易装轻装混进去。',
      thinking:
        '竖屏能让人和花都被包裹在一个亲密可视的空间里。',
      process:
        '这是我拍到特别多笑容的一次拍摄。人们对着镜头笑、孩子们抱着花松。',
      result:
        '春节前一天发布，当天播放量超三十万。许多广州不在家的人评论"想回家了"。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-flower-1.png',
      '/images/process-flower-2.png',
    ],
  },
  {
    id: 'subway-strangers',
    title: '地铁里的陌生人',
    subtitle: '一小时内八个陌生人的表情',
    description: '每个人都在赶路，每个人都在展示自己的一面。',
    coverImage: '/images/portrait-cover-subway.png',
    videoUrl: 'https://www.bilibili.com/video/BV1Hx411c7bX',
    orientation: 'portrait',
    type: 'creative',
    tags: ['街拍', '人文', '竖屏'],
    date: '2024-03-25',
    year: '2024',
    subject: '城市观察',
    gear: '索尼 ZV-E10 + 16mm F2.8',
    duration: '1:58',
    story: {
      background:
        '广州地铁三号线。高峰期，走不动。我把手机举起来开始录。周边的脸变得比平时更有趣。',
      thinking:
        '竖屏广视角能把一车厢的气氛干净地展示。',
      process:
        '连续五天在同一个时间段在同一个车厢记录，剩下的是筛选。',
      result:
        '小红书"公共交通"话题内转发，评论区评分极高。',
    },
    credits: [
      { role: '导演 / 摄影 / 剪辑', name: '登山路' },
    ],
    processImages: [
      '/images/process-subway-1.png',
      '/images/process-subway-2.png',
    ],
  },
];
