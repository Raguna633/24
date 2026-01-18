import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Define types
interface Student {
  name: string;
  class: string;
  jenjang: string;
  gender: string;
  slug: string;
}

interface FilterState {
  search: string;
  jenjang: string;
  gender: string;
  sort: string;
}

interface StudentFilterContextType {
  students: Student[];
  filteredStudents: Student[];
  currentStudent: Student | null;
  currentIndex: number;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  nextStudent: () => void;
  prevStudent: () => void;
  goToStudent: (slug: string) => void;
  isLoading: boolean;
  error: Error | null;
}

// Create context
const StudentFilterContext = createContext<StudentFilterContextType | undefined>(undefined);

// Custom hook for using the context
export const useStudentFilter = () => {
  const context = useContext(StudentFilterContext);
  if (!context) {
    throw new Error('useStudentFilter must be used within a StudentFilterProvider');
  }
  return context;
};

// Provider component
export const StudentFilterProvider = ({ children, initialStudents }: { children: ReactNode; initialStudents: Student[] }) => {
  const [students] = useState<Student[]>(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(initialStudents);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    jenjang: 'all',
    gender: 'all',
    sort: 'a-z',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Apply filters
  useEffect(() => {
    setIsLoading(true);
    try {
      let result = [...students];

      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        result = result.filter(student =>
          student.name.toLowerCase().includes(searchTerm) ||
          student.class.toLowerCase().includes(searchTerm)
        );
      }

      // Apply jenjang filter
      if (filters.jenjang !== 'all') {
        result = result.filter(student => student.jenjang === filters.jenjang);
      }

      // Apply gender filter
      if (filters.gender !== 'all') {
        result = result.filter(student => student.gender === filters.gender);
      }

      // Apply sort
      if (filters.sort === 'z-a') {
        result.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }

      setFilteredStudents(result);

      // Reset to first student if current index is out of bounds
      if (currentIndex >= result.length && result.length > 0) {
        setCurrentIndex(0);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, students, currentIndex]);

  // Navigation functions
  const nextStudent = () => {
    if (filteredStudents.length === 0) return;

    const nextIndex = (currentIndex + 1) % filteredStudents.length;
    setCurrentIndex(nextIndex);
    window.location.href = `/students/${filteredStudents[nextIndex].slug}`;
  };

  const prevStudent = () => {
    if (filteredStudents.length === 0) return;

    const prevIndex = (currentIndex - 1 + filteredStudents.length) % filteredStudents.length;
    setCurrentIndex(prevIndex);
    window.location.href = `/students/${filteredStudents[prevIndex].slug}`;
  };

  const goToStudent = (slug: string) => {
    const index = filteredStudents.findIndex(student => student.slug === slug);
    if (index !== -1) {
      setCurrentIndex(index);
      window.location.href = `/students/${slug}`;
    }
  };

  const currentStudent = filteredStudents[currentIndex] || null;

  return (
    <StudentFilterContext.Provider
      value={{
        students,
        filteredStudents,
        currentStudent,
        currentIndex,
        filters,
        setFilters,
        nextStudent,
        prevStudent,
        goToStudent,
        isLoading,
        error,
      }}
    >
      {children}
    </StudentFilterContext.Provider>
  );
};
