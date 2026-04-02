import { getOptimizedCloudinaryUrl } from "../utils/cloudinary";

interface Student {
  name: string;
  class: string;
  photo: string;
  slug: string;
}

interface StudentGridProps {
  students: Student[];
}

export default function StudentGrid({ students }: StudentGridProps) {
  if (students.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold mb-2">No students found</h3>
        <p className="text-gray-600">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {students.map((student) => (
        <a
          key={student.slug}
          href={`/students/${student.slug}`}
          className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={getOptimizedCloudinaryUrl(student.photo, 400)}
              alt={student.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
            <p className="text-sm text-gray-600 truncate">{student.class}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
