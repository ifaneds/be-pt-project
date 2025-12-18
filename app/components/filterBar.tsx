'use client'

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  options?: FilterOption[];
  hasAllOption?: boolean;
  selectedFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export default function FilterBar({ 
  options = [], 
  hasAllOption = true,
  selectedFilter = 'all',
  onFilterChange
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      {hasAllOption && (
        <button 
          onClick={() => onFilterChange?.('all')}
          className={`filter-button ${selectedFilter === 'all' ? 'filter-button-active' : ''}`}
        >
          All
        </button>
      )}
      {options.map((option) => (
        <button 
          key={option.value}
          onClick={() => onFilterChange?.(option.value)}
          className={`filter-button ${selectedFilter === option.value ? 'filter-button-active' : ''}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}