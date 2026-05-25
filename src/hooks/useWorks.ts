import { useState, useEffect, useCallback } from 'react';
import type { Work, Tag } from '@/types';

const LS_KEY = 'works_data';
// const TAGS_LS_KEY = 'works_tags'; // reserved for future tag persistence

// Default tags
const defaultTags: Tag[] = [
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

export function useWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [tags] = useState<Tag[]>(defaultTags);
  const [loading, setLoading] = useState(true);
  const [isLocalOverride, setIsLocalOverride] = useState(false);

  // Load data: localStorage first, then fetch JSON
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Work[];
        setWorks(parsed);
        setIsLocalOverride(true);
        setLoading(false);
      } catch {
        fetchDefault();
      }
    } else {
      fetchDefault();
    }
  }, []);

  const fetchDefault = useCallback(async () => {
    try {
      const res = await fetch('./data/works.json');
      const data = await res.json();
      setWorks(data);
      setIsLocalOverride(false);
    } catch {
      // Fallback: import from static module
      const { works: staticWorks } = await import('@/data/works-static');
      setWorks(staticWorks);
      setIsLocalOverride(false);
    }
    setLoading(false);
  }, []);

  // ---- CRUD ----
  const addWork = useCallback((work: Work) => {
    setWorks(prev => {
      const next = [work, ...prev];
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
    setIsLocalOverride(true);
  }, []);

  const updateWork = useCallback((id: string, updates: Partial<Work>) => {
    setWorks(prev => {
      const next = prev.map(w => w.id === id ? { ...w, ...updates } : w);
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
    setIsLocalOverride(true);
  }, []);

  const deleteWork = useCallback((id: string) => {
    setWorks(prev => {
      const next = prev.filter(w => w.id !== id);
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
    setIsLocalOverride(true);
  }, []);

  // Reset to default (from JSON)
  const resetToDefault = useCallback(async () => {
    localStorage.removeItem(LS_KEY);
    setIsLocalOverride(false);
    try {
      const res = await fetch('./data/works.json');
      const data = await res.json();
      setWorks(data);
    } catch {
      const { works: staticWorks } = await import('@/data/works-static');
      setWorks(staticWorks);
    }
  }, []);

  // Export current data as downloadable JSON
  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(works, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'works.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [works]);

  // Import data from JSON file
  const importData = useCallback((data: Work[]) => {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
    setWorks(data);
    setIsLocalOverride(true);
  }, []);

  return {
    works,
    tags,
    loading,
    isLocalOverride,
    addWork,
    updateWork,
    deleteWork,
    resetToDefault,
    exportData,
    importData,
  };
}
