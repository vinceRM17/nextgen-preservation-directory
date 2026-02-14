'use client';

import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useSearchParams } from '@/lib/hooks/useSearchParams';
import { cn } from '@/lib/utils';

// Category taxonomy from PROJECT.md and schema
const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'Builder', label: 'Builder' },
  { value: 'Craftsperson', label: 'Craftsperson' },
  { value: 'Tradesperson', label: 'Tradesperson' },
  { value: 'Developer', label: 'Developer' },
  { value: 'Investor', label: 'Investor' },
  { value: 'Advocate', label: 'Advocate' },
  { value: 'Architect', label: 'Architect' },
  { value: 'Government', label: 'Government' },
  { value: 'Nonprofit', label: 'Nonprofit' },
  { value: 'Educator', label: 'Educator' },
];

interface FilterPanelProps {
  defaultRole?: string;
  defaultLocation?: string;
  className?: string;
}

export function FilterPanel({
  defaultRole = 'all',
  defaultLocation = '',
  className,
}: FilterPanelProps) {
  const { updateSearchParam, searchParams } = useSearchParams();

  const currentRole = searchParams?.get('role') || defaultRole;
  const currentLocation = searchParams?.get('location') || defaultLocation;

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSearchParam('role', e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParam('location', e.target.value);
  };

  const handleClearLocation = () => {
    updateSearchParam('location', null);
  };

  // Get active filters for display
  const activeFilters = [];
  if (currentRole && currentRole !== 'all') {
    activeFilters.push({
      key: 'role',
      label: `Category: ${currentRole}`,
    });
  }
  if (currentLocation) {
    activeFilters.push({
      key: 'location',
      label: `Location: ${currentLocation}`,
    });
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Filter */}
        <div>
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-slate-200 mb-2"
          >
            Category
          </label>
          <Select
            id="category-filter"
            value={currentRole}
            onChange={handleRoleChange}
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <label
            htmlFor="location-filter"
            className="block text-sm font-medium text-slate-200 mb-2"
          >
            Location
          </label>
          <div className="relative">
            <Input
              id="location-filter"
              type="text"
              value={currentLocation}
              onChange={handleLocationChange}
              placeholder="Enter neighborhood or area..."
              className={currentLocation ? 'pr-10' : ''}
            />
            {currentLocation && (
              <button
                onClick={handleClearLocation}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                aria-label="Clear location filter"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-slate-300">Active filters:</span>
          {activeFilters.map((filter) => (
            <div
              key={filter.key}
              className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-sm"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => updateSearchParam(filter.key, null)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label={`Remove ${filter.key} filter`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
