// ==================== REACT WRAPPER COMPONENT ====================
// src/components/StudentFilterWrapper.tsx

/**
 * React wrapper yang handle filtering logic
 * Tapi TIDAK render StudentCard - itu tetap Astro component via children
 * 
 * Best of both worlds:
 * - React: Interactivity, state management
 * - Astro: Zero JS for presentational components
 */

import { useState, useEffect, useRef, type ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { StudentFilterProvider } from '../contexts/StudentFilterContext';

interface Student {
  name: string;
  class: string;
  jenjang: string;
  gender: string;
  slug: string;
}

interface StudentFilterWrapperProps {
  students: Student[];
  children: ReactNode;
}

export default function StudentFilterWrapper({
  students,
  children
}: StudentFilterWrapperProps) {
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    jenjang: 'all',
    gender: 'all',
    sort: 'a-z',
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  // Refs for DOM manipulation
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Filtered count for stats
  const [filteredCount, setFilteredCount] = useState(students.length);

  // Apply filters via DOM manipulation (show/hide Astro components)
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('[data-student-card]');
    let visibleCount = 0;
    const visibleCards: HTMLElement[] = [];

    // Filter cards
    cards.forEach((card) => {
      const element = card as HTMLElement;
      const searchText = element.dataset.searchText || '';
      const jenjang = element.dataset.jenjang || '';
      const gender = element.dataset.gender || '';

      // Apply filters
      const searchMatch = !filters.search.trim() ||
        searchText.includes(filters.search.toLowerCase());

      const jenjangMatch = filters.jenjang === 'all' ||
        jenjang === filters.jenjang;

      const genderMatch = filters.gender === 'all' ||
        gender === filters.gender;

      if (searchMatch && jenjangMatch && genderMatch) {
        visibleCards.push(element);
        visibleCount++;
      } else {
        element.style.display = 'none';
      }
    });

    // Sort visible cards
    if (filters.sort === 'z-a') {
      visibleCards.sort((a, b) => {
        const nameA = a.dataset.sortKey || '';
        const nameB = b.dataset.sortKey || '';
        return nameB.localeCompare(nameA);
      });
    } else {
      visibleCards.sort((a, b) => {
        const nameA = a.dataset.sortKey || '';
        const nameB = b.dataset.sortKey || '';
        return nameA.localeCompare(nameB);
      });
    }

    // Apply pagination
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    visibleCards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Update filtered count
    setFilteredCount(visibleCount);

    // Update stats display
    const statsElement = document.getElementById('filteredCount');
    if (statsElement) {
      statsElement.textContent = visibleCount.toString();
    }
  }, [filters, page, pageSize]);

  // Debounced search
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== filters.search) {
        setFilters(prev => ({ ...prev, search: localSearch }));
        setPage(1); // Reset to first page on search
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch]);

  // Update student links with filter parameters
  useEffect(() => {
    if (!gridRef.current) return;

    const studentLinks = gridRef.current.querySelectorAll('[data-student-link]');
    studentLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Build query string from current filters
      const queryParams = new URLSearchParams();

      if (filters.search) queryParams.set('search', filters.search);
      if (filters.jenjang !== 'all') queryParams.set('jenjang', filters.jenjang);
      if (filters.gender !== 'all') queryParams.set('gender', filters.gender);
      if (filters.sort !== 'a-z') queryParams.set('sort', filters.sort);

      const queryString = queryParams.toString();
      const newHref = queryString ? `${href}?${queryString}` : href;

      link.setAttribute('href', newHref);
    });
  }, [filters]);

  // Reset to page 1 if current page is out of bounds
  useEffect(() => {
    const totalPages = Math.ceil(filteredCount / pageSize);
    if (page > totalPages && totalPages > 0) {
      setPage(1);
    }
  }, [filteredCount, pageSize, page]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCount / pageSize);

  // Handle filter changes
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page on filter change
  };

  // Reset filters
  const resetFilters = () => {
    setLocalSearch('');
    setFilters({
      search: '',
      jenjang: 'all',
      gender: 'all',
      sort: 'a-z',
    });
    setPage(1);
  };

  const hasActiveFilters = 
    filters.search || 
    filters.jenjang !== 'all' || 
    filters.gender !== 'all' || 
    filters.sort !== 'a-z';

  return (
    <StudentFilterProvider initialStudents={students}>
      <ErrorBoundary
        fallback={
          <div className="text-center py-12 bg-red-50 border-l-4 border-red-500 rounded-xl">
            <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Terjadi Kesalahan</h3>
            <p className="text-red-600 mb-4">Gagal memuat filter siswa. Silakan refresh halaman.</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Refresh Halaman
            </button>
          </div>
        }
      >
        <div className="space-y-8">
      {/* Filter Controls */}
      {/* Filter Controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* Search */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Cari Siswa
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Cari nama, kelas, atau hobi..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
              <svg 
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Jenjang */}
          <div>
            <label htmlFor="jenjang" className="block text-sm font-medium text-gray-700 mb-1">
              Jenjang
            </label>
            <select
              id="jenjang"
              value={filters.jenjang}
              onChange={(e) => handleFilterChange('jenjang', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            >
              <option value="all">Semua Jenjang</option>
              <option value="SMK">SMK</option>
              <option value="SMA">SMA</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kelamin
            </label>
            <select
              id="gender"
              value={filters.gender}
              onChange={(e) => handleFilterChange('gender', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            >
              <option value="all">Semua</option>
              <option value="Putra">Putra</option>
              <option value="Putri">Putri</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
              Urutkan
            </label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            >
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>

        {/* Page Size & Reset */}
        <div className="mt-4 flex items-center gap-4">
          <label htmlFor="pageSize" className="text-sm font-medium text-gray-700">
            Tampilkan per halaman:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value));
              setPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="9999">Semua</option>
          </select>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="ml-auto px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Results Info */}
      <div className="text-center">
        <p className="text-gray-600">
          Menampilkan <span className="font-semibold text-gray-900">
            {Math.min((page - 1) * pageSize + 1, filteredCount)}-{Math.min(page * pageSize, filteredCount)}
          </span> dari <span className="font-semibold text-gray-900">{filteredCount}</span> siswa
          {filters.search && ` untuk pencarian "${filters.search}"`}
        </p>
      </div>

      {/* Grid Container - Astro StudentCards are rendered here */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
        data-filter-jenjang={filters.jenjang}
        data-filter-gender={filters.gender}
        data-filter-search={filters.search}
        data-filter-sort={filters.sort}
      >
        {children}
      </div>

      {/* Empty State */}
      {filteredCount === 0 && (
        <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada siswa ditemukan</h3>
          <p className="text-gray-600 mb-4">Coba ubah filter atau kata kunci pencarian</p>
          <button
            onClick={resetFilters}
            className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg transition-colors ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
            >
              ← Sebelumnya
            </button>

            <span className="px-4 py-2 text-gray-700">
              Halaman <span className="font-semibold">{page}</span> dari <span className="font-semibold">{totalPages}</span>
            </span>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg transition-colors ${page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary-500 text-white hover:bg-primary-600'}`}
            >
              Selanjutnya →
            </button>
          </div>

          {/* Load More Button */}
          {page < totalPages && (
            <button
              onClick={() => setPageSize(prev => prev * 2)}
              className="px-6 py-3 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors font-medium"
            >
              Muat Lebih Banyak Siswa
            </button>
          )}
        </div>
      )}
      </div>
    </ErrorBoundary>
    </StudentFilterProvider>
  );
}
