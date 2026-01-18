import { useStudentFilter } from '../contexts/StudentFilterContext';

export default function ContextNavigation() {
  const { nextStudent, prevStudent, currentStudent, filteredStudents, currentIndex } = useStudentFilter();

  if (filteredStudents.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Navigasi Siswa</h3>
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1">
          <button
            onClick={prevStudent}
            disabled={currentIndex === 0}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
              currentIndex === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600'
            }`}
          >
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Sebelumnya
          </button>
        </div>

        <div className="text-center px-4 py-2 bg-gray-100 rounded-lg">
          <span className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{currentIndex + 1}</span> dari <span className="font-semibold text-gray-900">{filteredStudents.length}</span>
          </span>
          {currentStudent && (
            <div className="text-xs text-gray-500 mt-1">
              {currentStudent.name}
            </div>
          )}
        </div>

        <div className="flex-1">
          <button
            onClick={nextStudent}
            disabled={currentIndex === filteredStudents.length - 1}
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
              currentIndex === filteredStudents.length - 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600'
            }`}
          >
            Selanjutnya
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
