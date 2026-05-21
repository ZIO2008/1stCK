import { createContext, useContext, type ReactNode } from 'react';
import { useWorks as useWorksHook } from '@/hooks/useWorks';
import type { Work, Tag } from '@/types';

interface WorksContextValue {
  works: Work[];
  tags: Tag[];
  loading: boolean;
  isLocalOverride: boolean;
  addWork: (work: Work) => void;
  updateWork: (id: string, updates: Partial<Work>) => void;
  deleteWork: (id: string) => void;
  resetToDefault: () => Promise<void>;
  exportData: () => void;
  importData: (data: Work[]) => void;
}

const WorksContext = createContext<WorksContextValue | null>(null);

export function WorksProvider({ children }: { children: ReactNode }) {
  const value = useWorksHook();
  return <WorksContext.Provider value={value}>{children}</WorksContext.Provider>;
}

export function useWorks() {
  const ctx = useContext(WorksContext);
  if (!ctx) throw new Error('useWorks must be inside WorksProvider');
  return ctx;
}
