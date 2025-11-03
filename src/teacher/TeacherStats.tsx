export default function TeacherStats() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-blue-50 to-sky-50 flex flex-col items-center justify-center font-[Nunito] text-gray-800 p-8">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">
        📊 Suivi des élèves
      </h2>
      <p className="text-gray-600 text-lg text-center max-w-2xl mb-8">
        Consultez les progrès, les réussites et les points à renforcer pour chaque élève.
      </p>

      <div className="bg-white/80 rounded-3xl shadow-xl p-6 w-[90%] max-w-3xl">
        <ul className="divide-y divide-indigo-100">
          <li className="py-4 flex justify-between">
            <span>Élève A</span> <span className="text-green-500 font-semibold">92%</span>
          </li>
          <li className="py-4 flex justify-between">
            <span>Élève B</span> <span className="text-yellow-500 font-semibold">78%</span>
          </li>
          <li className="py-4 flex justify-between">
            <span>Élève C</span> <span className="text-red-500 font-semibold">61%</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
