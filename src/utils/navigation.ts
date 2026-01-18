import type { Student } from "./student";
import type { StudentFilters } from "./filters";
import { filterStudents } from "./filters";

/**
 * Get navigation context (prev/next) based on filters
 * This is the CORE function for navigation
 */
export interface NavigationContext {
  current: Student;
  currentIndex: number;
  prev: Student | null;
  next: Student | null;
  total: number;
  filtered: Student[];
}

export function getNavigationContext(
  allStudents: Student[],
  currentSlug: string,
  filters: StudentFilters
): NavigationContext | null {
  // Apply filters to get subset
  const filtered = filterStudents(allStudents, filters);
  
  // Find current student in filtered list
  const currentIndex = filtered.findIndex(s => s.slug === currentSlug);
  
  if (currentIndex === -1) {
    return null; // Student not in filtered results
  }

  return {
    current: filtered[currentIndex],
    currentIndex,
    prev: currentIndex > 0 ? filtered[currentIndex - 1] : null,
    next: currentIndex < filtered.length - 1 ? filtered[currentIndex + 1] : null,
    total: filtered.length,
    filtered, // Keep for breadcrumb or other uses
  };
}