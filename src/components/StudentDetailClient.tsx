import { useEffect } from 'react';
import { useStudentFilter } from '../contexts/StudentFilterContext';

export default function StudentDetailClient() {
  const { nextStudent, prevStudent, currentStudent, filteredStudents, currentIndex } = useStudentFilter();

  useEffect(() => {
    // Sync with URL parameters
    const url = new URL(window.location.href);
    const slug = url.pathname.split('/').pop();

    if (slug && currentStudent?.slug !== slug) {
      // Find the student in filtered list
      const index = filteredStudents.findIndex(s => s.slug === slug);
      if (index !== -1 && index !== currentIndex) {
        // This will be handled by the context
      }
    }
  }, [currentStudent, filteredStudents, currentIndex]);

  return null;
}
