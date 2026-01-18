import { useState, useEffect } from 'react';

interface Filters {
  search: string;
  jenjang: 'all' | 'SMK' | 'SMA';
  gender: 'all' | 'Putra' | 'Putri';
  sort: 'a-z' | 'z-a';
}

interface StudentFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  totalResults: number;
}

export default function StudentFilters({
  filters,
  onFilterChange,
  totalResults
}: StudentFiltersProps) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        onFilterChange({ ...filters, search: localSearch });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch]);

  const handleSelectChange = (key: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setLocalSearch('');
    onFilterChange({
      search: '',
      jenjang: 'all',
      gender: 'all',
      sort: 'a-z',
    });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.jenjang !== 'all' || 
    filters.gender !== 'all' || 
    filters.sort !== 'a-z';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search by name, class..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Jenjang */}
        <div>
          <label className="block text-sm font-medium mb-1">Jenjang</label>
          <select
            value={filters.jenjang}
            onChange={(e) => handleSelectChange('jenjang', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Jenjang</option>
            <option value="SMK">SMK</option>
            <option value="SMA">SMA</option>
          </select>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            value={filters.gender}
            onChange={(e) => handleSelectChange('gender', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua</option>
            <option value="Putra">Putra</option>
            <option value="Putri">Putri</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium mb-1">Sort</label>
          <select
            value={filters.sort}
            onChange={(e) => handleSelectChange('sort', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      {/* Reset button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {totalResults} results found
          </span>
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
