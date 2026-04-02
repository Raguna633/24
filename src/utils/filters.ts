// src/utils/filters.ts
import type { Student } from "./student";

export interface StudentFilters {
  search?: string;
  jenjang?: string;
  gender?: string;
  sort?: 'a-z' | 'z-a';
}

export function filterStudents(
  students: Student[],
  filters: StudentFilters
): Student[] {
  let result = [...students];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.class.toLowerCase().includes(q)
    );
  }

  if (filters.jenjang && filters.jenjang !== 'all') {
    result = result.filter(s => s.jenjang === filters.jenjang);
  }

  if (filters.gender && filters.gender !== 'all') {
    result = result.filter(s => s.gender === filters.gender);
  }

  result.sort((a, b) => {
    const cmp = a.name.localeCompare(b.name);
    return filters.sort === 'z-a' ? -cmp : cmp;
  });

  return result;
}
