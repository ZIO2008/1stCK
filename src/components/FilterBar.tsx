import { WORK_TYPE_MAP, type WorkType } from '@/types';

interface FilterBarProps {
  activeType: WorkType | null;
  onTypeChange: (type: WorkType | null) => void;
}

/**
 * 作品归档页的类型筛选条 ——
 * 水平滚动的文字按钮，无图标，不抢眼
 */
export default function FilterBar({ activeType, onTypeChange }: FilterBarProps) {
  const types = Object.entries(WORK_TYPE_MAP) as [WorkType, typeof WORK_TYPE_MAP[WorkType]][];

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
      <button
        onClick={() => onTypeChange(null)}
        className={`shrink-0 px-4 py-2 text-sm rounded-full transition-all duration-200 ${
          activeType === null
            ? 'bg-mist-900 text-white'
            : 'text-mist-500 hover:text-mist-800 hover:bg-mist-100'
        }`}
      >
        全部
      </button>

      {types.map(([key, { label }]) => (
        <button
          key={key}
          onClick={() => onTypeChange(key)}
          className={`shrink-0 px-4 py-2 text-sm rounded-full transition-all duration-200 ${
            activeType === key
              ? 'bg-mist-900 text-white'
              : 'text-mist-500 hover:text-mist-800 hover:bg-mist-100'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
