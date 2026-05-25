/* ---- Work Types ---- */
export type WorkType = 'promo' | 'travel' | 'commercial' | 'vlog' | 'documentary' | 'mv' | 'creative' | 'event' | 'motion';

export const WORK_TYPE_MAP: Record<WorkType, { label: string; color: string; icon: string; enLabel: string }> = {
  promo:       { label: '宣传片',  color: 'lens',    icon: 'megaphone',  enLabel: 'Promo' },
  travel:      { label: '旅拍',    color: 'summit',  icon: 'compass',    enLabel: 'Travel' },
  commercial:  { label: '广告片',  color: 'dusk',    icon: 'sparkle',    enLabel: 'Commercial' },
  vlog:        { label: 'Vlog',    color: 'peak',    icon: 'video',      enLabel: 'Vlog' },
  documentary: { label: '纪实',    color: 'mist',    icon: 'film',       enLabel: 'Documentary' },
  mv:          { label: 'MV',      color: 'rose',    icon: 'music',      enLabel: 'Music Video' },
  creative:    { label: '创意短片', color: 'violet',  icon: 'wand',       enLabel: 'Creative' },
  event:       { label: '活动记录', color: 'cyan',    icon: 'calendar',   enLabel: 'Event' },
  motion:      { label: '动效动画', color: 'orange',  icon: 'zap',        enLabel: 'Motion' },
};

/* ---- Story Sections ---- */
export interface Story {
  background: string;   // 项目背景：为什么存在
  thinking: string;     // 创作思考：核心问题与方法
  process: string;      // 制作过程：挑战与突破
  result: string;       // 成片说明：最终呈现
}

/* ---- Credits ---- */
export interface Credit {
  role: string;
  name: string;
}

/* ---- Work Data ---- */
export interface Work {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  /** 外部视频链接，如 B站 https://www.bilibili.com/video/BV1xxxxx */
  videoUrl?: string;
  type: WorkType;
  tags: string[];
  date: string;
  /** 作品年份，如 "2024"；不填时自动从 date 字段提取 */
  year?: string;
  /** 内容主题，如 "自然景观"、"人文纪实"、"动物" */
  subject?: string;
  /** 拍摄工具，如 "索尼 FX3"、"大疆 Air 3"、"佳能 R5" */
  gear?: string;
  duration?: string;
  client?: string;
  featured?: boolean;
  hero?: boolean;
  /** 完整叙事结构 */
  story: Story;
  /** 制作名单 */
  credits: Credit[];
  /** 幕后/过程图片 (Unsplash 占位) */
  processImages: string[];
}

/* ---- Tag ---- */
export interface Tag {
  name: string;
  slug: string;
  color: string;
  count: number;
  description?: string;
}

/* ---- Media ---- */
export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt?: string;
  caption?: string;
}
