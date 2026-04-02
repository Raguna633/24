import { useState, useMemo } from 'react';
import StudentFilters from './StudentFilters';
import StudentGrid from './StudentGrid';
import StudentStats from './StudentStats';

interface Student {
  name: string;
  class: string;
  photo: string;
  slug: string;
  jenjang: 'SMK' | 'SMA';
  gender: 'Putra' | 'Putri';
}

interface StudentBrowserProps {
  students: Student[];
}

export default function StudentBrowser({ students }: StudentBrowserProps) {
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    jenjang: 'all' as 'all' | 'SMK' | 'SMA',
    gender: 'all' as 'all' | 'Putra' | 'Putri',
    sort: 'a-z' as 'a-z' | 'z-a',
  });

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Apply filters - memoized for performance
  const filteredStudents = useMemo(() => {
    let result = [...students];

    // Search filter
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(searchLower) ||
        s.class.toLowerCase().includes(searchLower)
      );
    }

    // Jenjang filter
    if (filters.jenjang !== 'all') {
      result = result.filter(s => s.jenjang === filters.jenjang);
    }

    // Gender filter
    if (filters.gender !== 'all') {
      result = result.filter(s => s.gender === filters.gender);
    }

    // Sort
    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return filters.sort === 'z-a' ? -comparison : comparison;
    });

    return result;
  }, [students, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredStudents.slice(start, start + pageSize);
  }, [filteredStudents, page, pageSize]);

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <StudentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        totalResults={filteredStudents.length}
      />

      {/* Results count */}
      <div className="text-center text-gray-600">
        Menampilkan {paginatedStudents.length} dari {filteredStudents.length} siswa
        {filters.search && ` untuk "${filters.search}"`}
      </div>

      {/* Grid */}
      <StudentGrid students={paginatedStudents} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            ← Previous
          </button>
          
          <span>Page {page} of {totalPages}</span>
          
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}

      {/* Stats */}
      <StudentStats
        total={students.length}
        filtered={filteredStudents.length}
        smk={students.filter(s => s.jenjang === 'SMK').length}
        sma={students.filter(s => s.jenjang === 'SMA').length}
      />
    </div>
  );
}

