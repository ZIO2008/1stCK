import { useState, useRef, useMemo } from 'react';
import { useWorks } from '@/context/WorksContext';
import { WORK_TYPE_MAP } from '@/types';
import type { Work, WorkType, Story } from '@/types';
import { Link } from 'react-router-dom';
import AdminLogin, { isAdminAuthed, clearAdminAuth } from './AdminLogin';

type FormMode = 'list' | 'new' | 'edit';

const emptyStory: Story = { background: '', thinking: '', process: '', result: '' };
const emptyWork: Work = {
  id: '',
  title: '',
  description: '',
  coverImage: '',
  type: 'travel',
  tags: [],
  date: new Date().toISOString().slice(0, 10),
  story: emptyStory,
  credits: [],
  processImages: [],
  location: '',
  hasPhoto: false,
  isGroup: false,
  photoCoverImage: '',
  stills: [],
  exif: {},
};

export default function Admin() {
  const { works, loading, addWork, updateWork, deleteWork, resetToDefault, exportData, importData, isLocalOverride } = useWorks();
  const [authed, setAuthed] = useState(isAdminAuthed());
  const [mode, setMode] = useState<FormMode>('list');
  const [form, setForm] = useState<Work>(emptyWork);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [_tagInput, _setTagInput] = useState('');
  const [creditRole, setCreditRole] = useState('');
  const [creditName, setCreditName] = useState('');
  const [processImgInput, setProcessImgInput] = useState('');
  const [stillsInput, setStillsInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [tabFilter, setTabFilter] = useState<'all' | 'photo' | 'video'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ---- Navigation ----
  const goList = () => { setMode('list'); setEditingId(null); setSaved(false); };
  const goNew = () => { setForm({ ...emptyWork, id: generateId(), date: new Date().toISOString().slice(0, 10) }); setMode('new'); setSaved(false); };
  const goEdit = (work: Work) => { setForm(structuredClone(work)); setEditingId(work.id); setMode('edit'); setSaved(false); };

  function generateId() {
    return 'work-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  // ---- Tab filtering ----
  const filteredWorks = useMemo(() => {
    if (tabFilter === 'all') return works;
    if (tabFilter === 'photo') return works.filter((w) => w.hasPhoto && !w.videoUrl);
    if (tabFilter === 'video') return works.filter((w) => w.videoUrl);
    return works;
  }, [works, tabFilter]);

  const tabCounts = useMemo(() => ({
    all: works.length,
    photo: works.filter((w) => w.hasPhoto && !w.videoUrl).length,
    video: works.filter((w) => w.videoUrl).length,
  }), [works]);

  // ---- Field updates ----
  const set = (key: keyof Work, value: unknown) => setForm(f => ({ ...f, [key]: value }));
  const setStory = (key: keyof Story, value: string) => setForm(f => ({ ...f, story: { ...f.story, [key]: value } }));
  const setExif = (key: keyof NonNullable<Work['exif']>, value: string) => {
    setForm(f => ({ ...f, exif: { ...(f.exif || {}), [key]: value || undefined } }));
  };
  const toggleTag = (tag: string) => {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }));
  };

  const addCredit = () => {
    if (!creditRole.trim() || !creditName.trim()) return;
    setForm(f => ({ ...f, credits: [...f.credits, { role: creditRole.trim(), name: creditName.trim() }] }));
    setCreditRole(''); setCreditName('');
  };

  const removeCredit = (idx: number) => {
    setForm(f => ({ ...f, credits: f.credits.filter((_, i) => i !== idx) }));
  };

  const addProcessImage = () => {
    if (!processImgInput.trim()) return;
    setForm(f => ({ ...f, processImages: [...f.processImages, processImgInput.trim()] }));
    setProcessImgInput('');
  };

  const removeProcessImage = (idx: number) => {
    setForm(f => ({ ...f, processImages: f.processImages.filter((_, i) => i !== idx) }));
  };

  const addStill = () => {
    if (!stillsInput.trim()) return;
    setForm(f => ({ ...f, stills: [...(f.stills || []), stillsInput.trim()] }));
    setStillsInput('');
  };

  const removeStill = (idx: number) => {
    setForm(f => ({ ...f, stills: (f.stills || []).filter((_, i) => i !== idx) }));
  };

  // ---- Save ----
  const handleSave = () => {
    if (!form.title.trim() || !form.coverImage.trim()) return;
    if (mode === 'new') {
      addWork(form);
    } else if (mode === 'edit' && editingId) {
      updateWork(editingId, form);
    }
    setSaved(true);
    setTimeout(() => goList(), 600);
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个作品吗？此操作不可撤销。')) {
      deleteWork(id);
    }
  };

  const handleImagePick = (key: 'coverImage' | 'processImages') => {
    const input = fileInputRef.current;
    if (!input) return;
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const path = `./images/${file.name}`;
      if (key === 'coverImage') {
        set('coverImage', path);
      } else {
        setForm(f => ({ ...f, processImages: [...f.processImages, path] }));
      }
      input.value = '';
    };
    input.click();
  };

  // ---- Available images gallery ----
  const availableImages = [
    './images/bg-about.webp',
    './images/bg-hero.webp',
    './images/cover-city-peak-shenzhen.webp',
    './images/cover-color-grading.webp',
    './images/cover-concert-music-video.webp',
    './images/cover-documentary-village.webp',
    './images/cover-experimental-neon.webp',
    './images/cover-gongga-trek.webp',
    './images/cover-meili-snow-mountain.webp',
    './images/cover-motion-graphics.webp',
    './images/cover-movie-intro.webp',
    './images/cover-product-tech.webp',
    './images/cover-tea-plantation-brand.webp',
    './images/cover-traveler-mountain.webp',
    './images/cover-wedding-cinematic.webp',
    './images/photo-cover-chengdu.webp',
    './images/photo-cover-flowers.webp',
    './images/photo-cover-geometry.webp',
    './images/photo-cover-gongga.webp',
    './images/photo-cover-hiker.webp',
    './images/photo-cover-hongyadong.webp',
    './images/photo-cover-kids.webp',
    './images/photo-cover-meili.webp',
    './images/photo-cover-mirror.webp',
    './images/photo-cover-ruoergai.webp',
    './images/photo-cover-shenzhen.webp',
    './images/photo-cover-teahouse.webp',
    './images/photo-cover-wedding.webp',
    './images/photo-cover-xiapu.webp',
    './images/photo-still-flowers-1.webp',
    './images/photo-still-flowers-2.webp',
    './images/photo-still-flowers-3.webp',
    './images/photo-still-flowers-4.webp',
    './images/photo-still-ruoergai-1.webp',
    './images/photo-still-ruoergai-2.webp',
    './images/photo-still-ruoergai-3.webp',
    './images/photo-still-ruoergai-4.webp',
    './images/photo-still-xiapu-1.webp',
    './images/photo-still-xiapu-2.webp',
    './images/photo-still-xiapu-3.webp',
    './images/photo-still-xiapu-4.webp',
    './images/portrait-cover-ballet.webp',
    './images/portrait-cover-bamboo.webp',
    './images/portrait-cover-chengdu.webp',
    './images/portrait-cover-fishing.webp',
    './images/portrait-cover-flower.webp',
    './images/portrait-cover-guangzhou.webp',
    './images/portrait-cover-hiker.webp',
    './images/portrait-cover-subway.webp',
    './images/portrait-cover-surf.webp',
    './images/portrait-cover-tea.webp',
    './images/process-ballet-1.webp',
    './images/process-ballet-2.webp',
    './images/process-bamboo-1.webp',
    './images/process-bamboo-2.webp',
    './images/process-chengdu-1.webp',
    './images/process-chengdu-2.webp',
    './images/process-chuanxi-1.webp',
    './images/process-chuanxi-2.webp',
    './images/process-echo-1.webp',
    './images/process-echo-2.webp',
    './images/process-fishing-1.webp',
    './images/process-fishing-2.webp',
    './images/process-flower-1.webp',
    './images/process-flower-2.webp',
    './images/process-flowers-1.webp',
    './images/process-flowers-2.webp',
    './images/process-flux-1.webp',
    './images/process-flux-2.webp',
    './images/process-geometry-1.webp',
    './images/process-geometry-2.webp',
    './images/process-gongga-1.webp',
    './images/process-gongga-2.webp',
    './images/process-guangzhou-1.webp',
    './images/process-guangzhou-2.webp',
    './images/process-heritage-1.webp',
    './images/process-heritage-2.webp',
    './images/process-hiker-1.webp',
    './images/process-hiker-2.webp',
    './images/process-hongyadong-1.webp',
    './images/process-hongyadong-2.webp',
    './images/process-jewelry-1.webp',
    './images/process-jewelry-2.webp',
    './images/process-meili-1.webp',
    './images/process-meili-2.webp',
    './images/process-mirror-1.webp',
    './images/process-mirror-2.webp',
    './images/process-shenzhen-1.webp',
    './images/process-shenzhen-2.webp',
    './images/process-solitude-1.webp',
    './images/process-solitude-2.webp',
    './images/process-subway-1.webp',
    './images/process-subway-2.webp',
    './images/process-surf-1.webp',
    './images/process-surf-2.webp',
    './images/process-tea-1.webp',
    './images/process-tea-2.webp',
    './images/process-teahouse-1.webp',
    './images/process-teahouse-2.webp',
    './images/process-wedding-1.webp',
    './images/process-wedding-2.webp',
    './images/process-xiapu-1.webp',
    './images/process-xiapu-2.webp',
  ];

  // All known tags
  const allTags = ['风光', '登山', '调色', '城市', '航拍', '剪辑', '徒步', '产品', '旅行', '人物', '音乐', '实验', '婚礼', '片头'];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-mist-400">加载中...</div>;
  }

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  // ---- RENDER: List view ----
  if (mode === 'list') {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-mist-900">管理后台</h1>
            <p className="text-mist-500 mt-1 text-sm">
              {works.length} 部作品 {isLocalOverride && <span className="text-amber-600 ml-2">(本地编辑中)</span>}
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={resetToDefault} className="px-4 py-2 text-sm border border-mist-200 rounded-lg hover:bg-mist-50 transition-colors" title="放弃本地修改，恢复默认数据">
              重置
            </button>
            <button onClick={exportData} className="px-4 py-2 text-sm border border-lens-200 text-lens-700 rounded-lg hover:bg-lens-50 transition-colors">
              导出 JSON
            </button>
            <button onClick={goNew} className="px-5 py-2 text-sm bg-mist-900 text-white rounded-lg hover:bg-mist-800 transition-colors">
              + 新增作品
            </button>
            <button
              onClick={() => { clearAdminAuth(); setAuthed(false); }}
              className="px-4 py-2 text-sm border border-mist-100 text-mist-400 rounded-lg hover:bg-mist-50 transition-colors"
              title="退出登录"
            >
              退出
            </button>
          </div>
        </div>

        {/* Tab 筛选：全部 / 照片 / 视频 */}
        <div className="flex gap-2 mb-6">
          {([
            { key: 'all', label: '全部' },
            { key: 'photo', label: '照片' },
            { key: 'video', label: '视频' },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTabFilter(tab.key)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                tabFilter === tab.key
                  ? 'bg-mist-900 text-white'
                  : 'bg-mist-50 text-mist-600 hover:bg-mist-100'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-xs ${tabFilter === tab.key ? 'text-white/60' : 'text-mist-400'}`}>
                ({tabCounts[tab.key]})
              </span>
            </button>
          ))}
        </div>

        {/* Import */}
        <div className="mb-8 p-4 bg-mist-50 rounded-lg">
          <label className="text-sm text-mist-600 mr-3">导入 JSON 数据：</label>
          <input
            type="file"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                try {
                  const data = JSON.parse(reader.result as string) as Work[];
                  importData(data);
                } catch { alert('JSON 格式错误'); }
              };
              reader.readAsText(file);
              e.target.value = '';
            }}
            className="text-sm"
          />
        </div>

        {/* Works list */}
        <div className="space-y-3">
          {filteredWorks.map((w) => (
            <div key={w.id} className="flex items-center gap-4 p-4 bg-white border border-mist-100 rounded-lg hover:border-mist-200 transition-colors">
              <img src={w.coverImage} alt={w.title} className="w-20 h-12 object-cover rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-mist-900 truncate">{w.title}</div>
                <div className="text-xs text-mist-400 mt-0.5">
                  {WORK_TYPE_MAP[w.type]?.label}
                  {w.videoUrl ? ' · 视频' : w.hasPhoto ? ' · 照片' : ''}
                  {' · '}{w.date}{w.duration ? ` · ${w.duration}` : ''}
                  {w.orientation ? ` · ${w.orientation === 'portrait' ? '竖屏' : '横屏'}` : ''}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  to={w.videoUrl ? `/video?preview=${w.id}` : (w.hasPhoto ? `/works?preview=${w.id}` : `/work/${w.id}`)}
                  target="_blank"
                  className="px-3 py-1.5 text-xs border border-mist-200 rounded hover:bg-mist-50 transition-colors"
                >
                  预览
                </Link>
                <button onClick={() => goEdit(w)} className="px-3 py-1.5 text-xs border border-lens-200 text-lens-700 rounded hover:bg-lens-50 transition-colors">
                  编辑
                </button>
                <button onClick={() => handleDelete(w.id)} className="px-3 py-1.5 text-xs border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors">
                  删除
                </button>
              </div>
            </div>
          ))}
          {filteredWorks.length === 0 && (
            <div className="text-center py-12 text-mist-400">
              还没有作品，点击右上角「新增作品」开始
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---- RENDER: Edit / New form ----
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl text-mist-900">{mode === 'new' ? '新增作品' : '编辑作品'}</h1>
          {saved && <p className="text-green-600 text-sm mt-1">已保存！</p>}
        </div>
        <button onClick={goList} className="px-4 py-2 text-sm border border-mist-200 rounded-lg hover:bg-mist-50 transition-colors">
          返回列表
        </button>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-mist-700 mb-1">标题 *</label>
          <input value={form.title} onChange={e => set('title', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" placeholder="作品标题" />
        </div>

        {/* Subtitle + Date row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-mist-700 mb-1">副标题</label>
            <input value={form.subtitle || ''} onChange={e => set('subtitle', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" placeholder="可选" />
          </div>
          <div>
            <label className="block text-sm font-medium text-mist-700 mb-1">日期</label>
            <input value={form.date} onChange={e => set('date', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" type="date" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-mist-700 mb-1">简述</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={2} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" placeholder="一句话描述" />
        </div>

        {/* Year / Subject / Gear */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-mist-700 mb-1">年份</label>
            <input value={form.year || ''} onChange={e => set('year', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" placeholder="如 2024" />
          </div>
          <div>
            <label className="block text-sm font-medium text-mist-700 mb-1">内容主题</label>
            <input value={form.subject || ''} onChange={e => set('subject', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" placeholder="如 自然景观、人文纪实" />
          </div>
          <div>
            <label className="block text-sm font-medium text-mist-700 mb-1">拍摄工具</label>
            <input value={form.gear || ''} onChange={e => set('gear', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" placeholder="如 索尼 FX3、大疆 Air 3" />
          </div>
        </div>

        {/* Location + Orientation */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-mist-700 mb-1">拍摄地点</label>
            <input value={form.location || ''} onChange={e => set('location', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" placeholder="如 重庆·洪崖洞" />
          </div>
          <div>
            <label className="block text-sm font-medium text-mist-700 mb-1">画面方向</label>
            <select value={form.orientation || ''} onChange={e => set('orientation', e.target.value || undefined)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm">
              <option value="">未设置</option>
              <option value="landscape">横屏 (16:9)</option>
              <option value="portrait">竖屏 (3:4)</option>
            </select>
          </div>
        </div>

        {/* Type + Duration + Client */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-mist-700 mb-1">类型</label>
            <select value={form.type} onChange={e => set('type', e.target.value as WorkType)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm">
              {Object.entries(WORK_TYPE_MAP).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-mist-700 mb-1">时长</label>
            <input value={form.duration || ''} onChange={e => set('duration', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" placeholder="如 4:32" />
          </div>
          <div>
            <label className="block text-sm font-medium text-mist-700 mb-1">委托方</label>
            <input value={form.client || ''} onChange={e => set('client', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" placeholder="可选" />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-mist-700 mb-1">封面图路径 *</label>
          <div className="flex gap-2">
            <input value={form.coverImage} onChange={e => set('coverImage', e.target.value)} className="flex-1 px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm font-mono" placeholder="./images/cover-xxx.webp" />
            <button onClick={() => handleImagePick('coverImage')} className="px-3 py-2 text-xs border border-mist-200 rounded-lg hover:bg-mist-50 transition-colors">浏览</button>
          </div>
          {form.coverImage && (
            <img src={form.coverImage} alt="封面预览" className="mt-2 w-48 h-27 object-cover rounded border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
        </div>

        {/* Photo Cover Image */}
        <div>
          <label className="block text-sm font-medium text-mist-700 mb-1">
            照片页封面图
            <span className="text-mist-400 font-normal ml-1">(照片作品专用，与视频封面可不同)</span>
          </label>
          <input value={form.photoCoverImage || ''} onChange={e => set('photoCoverImage', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm font-mono" placeholder="./images/photo-cover-xxx.webp" />
          {form.photoCoverImage && (
            <img src={form.photoCoverImage} alt="照片封面预览" className="mt-2 w-48 h-27 object-cover rounded border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          )}
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium text-mist-700 mb-1">B站视频链接</label>
          <input value={form.videoUrl || ''} onChange={e => set('videoUrl', e.target.value)} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm font-mono" placeholder="https://www.bilibili.com/video/BVxxxxxx" />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-mist-700 mb-1">标签</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {allTags.map(tag => (
              <button key={tag} onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${form.tags.includes(tag) ? 'bg-mist-900 text-white border-mist-900' : 'border-mist-200 text-mist-500 hover:border-mist-400'}`}>
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured / Hero / Photo / Group toggles */}
        <div className="flex gap-6 flex-wrap">
          <label className="flex items-center gap-2 text-sm text-mist-700 cursor-pointer">
            <input type="checkbox" checked={form.featured || false} onChange={e => set('featured', e.target.checked)} className="rounded" />
            精选作品
          </label>
          <label className="flex items-center gap-2 text-sm text-mist-700 cursor-pointer">
            <input type="checkbox" checked={form.hero || false} onChange={e => set('hero', e.target.checked)} className="rounded" />
            Hero 展示
          </label>
          <label className="flex items-center gap-2 text-sm text-mist-700 cursor-pointer">
            <input type="checkbox" checked={form.hasPhoto || false} onChange={e => set('hasPhoto', e.target.checked)} className="rounded" />
            照片作品
          </label>
          <label className="flex items-center gap-2 text-sm text-mist-700 cursor-pointer">
            <input type="checkbox" checked={form.isGroup || false} onChange={e => set('isGroup', e.target.checked)} className="rounded" />
            组图作品
          </label>
        </div>

        {/* Story */}
        <div className="border-t border-mist-100 pt-6">
          <h2 className="font-serif text-lg text-mist-900 mb-4">创作叙事</h2>
          {(['background', 'thinking', 'process', 'result'] as const).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-mist-700 mb-1 capitalize">
                {key === 'background' ? '项目背景' : key === 'thinking' ? '创作思考' : key === 'process' ? '制作过程' : '成片结果'}
              </label>
              <textarea value={form.story?.[key] || ''} onChange={e => setStory(key, e.target.value)} rows={4} className="w-full px-4 py-2 border border-mist-200 rounded-lg focus:outline-none focus:border-mist-400 text-sm" />
            </div>
          ))}
        </div>

        {/* EXIF */}
        <div className="border-t border-mist-100 pt-6">
          <h2 className="font-serif text-lg text-mist-900 mb-4">
            EXIF 参数
            <span className="text-mist-400 text-sm font-normal ml-1">(摄影作品适用)</span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-mist-600 mb-1">机身</label>
              <input value={form.exif?.camera || ''} onChange={e => setExif('camera', e.target.value)} className="w-full px-3 py-2 border border-mist-200 rounded-lg text-sm" placeholder="如 索尼 α7R V" />
            </div>
            <div>
              <label className="block text-sm text-mist-600 mb-1">镜头</label>
              <input value={form.exif?.lens || ''} onChange={e => setExif('lens', e.target.value)} className="w-full px-3 py-2 border border-mist-200 rounded-lg text-sm" placeholder="如 FE 24-70mm F2.8 GM II" />
            </div>
            <div>
              <label className="block text-sm text-mist-600 mb-1">光圈</label>
              <input value={form.exif?.aperture || ''} onChange={e => setExif('aperture', e.target.value)} className="w-full px-3 py-2 border border-mist-200 rounded-lg text-sm" placeholder="如 f/2.8" />
            </div>
            <div>
              <label className="block text-sm text-mist-600 mb-1">快门</label>
              <input value={form.exif?.shutter || ''} onChange={e => setExif('shutter', e.target.value)} className="w-full px-3 py-2 border border-mist-200 rounded-lg text-sm" placeholder="如 1/250" />
            </div>
            <div>
              <label className="block text-sm text-mist-600 mb-1">ISO</label>
              <input value={form.exif?.iso || ''} onChange={e => setExif('iso', e.target.value)} className="w-full px-3 py-2 border border-mist-200 rounded-lg text-sm" placeholder="如 100" />
            </div>
            <div>
              <label className="block text-sm text-mist-600 mb-1">焦距</label>
              <input value={form.exif?.focalLength || ''} onChange={e => setExif('focalLength', e.target.value)} className="w-full px-3 py-2 border border-mist-200 rounded-lg text-sm" placeholder="如 50mm" />
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="border-t border-mist-100 pt-6">
          <h2 className="font-serif text-lg text-mist-900 mb-4">制作名单</h2>
          <div className="flex gap-2 mb-3">
            <input value={creditRole} onChange={e => setCreditRole(e.target.value)} className="flex-1 px-3 py-2 border border-mist-200 rounded-lg text-sm" placeholder="职位" />
            <input value={creditName} onChange={e => setCreditName(e.target.value)} className="flex-1 px-3 py-2 border border-mist-200 rounded-lg text-sm" placeholder="姓名" />
            <button onClick={addCredit} className="px-4 py-2 text-sm bg-mist-900 text-white rounded-lg hover:bg-mist-800 transition-colors">添加</button>
          </div>
          {form.credits.map((c, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 text-sm">
              <span className="text-mist-400 w-24">{c.role}</span>
              <span className="text-mist-700">{c.name}</span>
              <button onClick={() => removeCredit(i)} className="text-red-400 hover:text-red-600 text-xs ml-auto">删除</button>
            </div>
          ))}
        </div>

        {/* Process Images */}
        <div className="border-t border-mist-100 pt-6">
          <h2 className="font-serif text-lg text-mist-900 mb-4">过程图片</h2>
          <div className="flex gap-2 mb-3">
            <input value={processImgInput} onChange={e => setProcessImgInput(e.target.value)} className="flex-1 px-3 py-2 border border-mist-200 rounded-lg text-sm font-mono" placeholder="./images/process-xxx.webp" />
            <button onClick={addProcessImage} className="px-4 py-2 text-sm border border-mist-200 rounded-lg hover:bg-mist-50 transition-colors">添加</button>
            <button onClick={() => handleImagePick('processImages')} className="px-3 py-2 text-xs border border-mist-200 rounded-lg hover:bg-mist-50 transition-colors">浏览</button>
          </div>
          <div className="flex gap-3 flex-wrap">
            {form.processImages.map((img, i) => (
              <div key={i} className="relative group">
                <img src={img} alt="" className="w-24 h-16 object-cover rounded border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <button onClick={() => removeProcessImage(i)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">x</button>
              </div>
            ))}
          </div>
        </div>

        {/* Stills (组图内页) */}
        <div className="border-t border-mist-100 pt-6">
          <h2 className="font-serif text-lg text-mist-900 mb-4">
            组图内页
            <span className="text-mist-400 text-sm font-normal ml-1">(组图作品专用)</span>
          </h2>
          <div className="flex gap-2 mb-3">
            <input value={stillsInput} onChange={e => setStillsInput(e.target.value)} className="flex-1 px-3 py-2 border border-mist-200 rounded-lg text-sm font-mono" placeholder="./images/photo-still-xxx.webp" />
            <button onClick={addStill} className="px-4 py-2 text-sm border border-mist-200 rounded-lg hover:bg-mist-50 transition-colors">添加</button>
          </div>
          <div className="flex gap-3 flex-wrap">
            {(form.stills || []).map((img, i) => (
              <div key={i} className="relative group">
                <img src={img} alt="" className="w-24 h-16 object-cover rounded border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                <button onClick={() => removeStill(i)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">x</button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick image gallery */}
        <div className="border-t border-mist-100 pt-6">
          <h2 className="font-serif text-lg text-mist-900 mb-3">
            可用图片
            <span className="text-mist-400 text-sm font-normal ml-1">({availableImages.length} 张，点击复制路径)</span>
          </h2>
          <p className="text-xs text-mist-400 mb-3">点击图片复制路径到剪贴板，或拖入上方输入框</p>
          <div className="grid grid-cols-8 gap-2 max-h-96 overflow-y-auto">
            {availableImages.map(img => (
              <button key={img} onClick={() => { navigator.clipboard.writeText(img); setProcessImgInput(img); }}
                className="relative group" title={img}>
                <img src={img} alt="" className="w-full aspect-video object-cover rounded border border-mist-100 hover:border-lens-400 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity rounded">复制</span>
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex gap-3 pt-4 border-t border-mist-100">
          <button onClick={handleSave} className="px-6 py-2.5 bg-mist-900 text-white text-sm rounded-lg hover:bg-mist-800 transition-colors">
            {mode === 'new' ? '创建作品' : '保存修改'}
          </button>
          <button onClick={goList} className="px-6 py-2.5 border border-mist-200 text-mist-700 text-sm rounded-lg hover:bg-mist-50 transition-colors">
            取消
          </button>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
    </div>
  );
}
