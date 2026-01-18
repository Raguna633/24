interface StudentStatsProps {
  total: number;
  filtered: number;
  smk: number;
  sma: number;
}

export default function StudentStats({ total, filtered, smk, sma }: StudentStatsProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border">
      <h3 className="text-xl font-semibold mb-4">Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{total}</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-3xl font-bold text-green-600">{smk}</div>
          <div className="text-sm text-gray-600">SMK Students</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">{sma}</div>
          <div className="text-sm text-gray-600">SMA Students</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-3xl font-bold text-orange-600">{filtered}</div>
          <div className="text-sm text-gray-600">Filtered Results</div>
        </div>
      </div>
    </div>
  );
}