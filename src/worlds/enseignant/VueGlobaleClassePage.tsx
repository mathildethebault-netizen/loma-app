

import { Link } from "react-router-dom";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function VueGlobaleClassePage() {
  const [filtre, setFiltre] = useState("Global");

  const data = [
    { name: "Français", value: 78 },
    { name: "Maths", value: 82 },
    { name: "Lecture", value: 74 },
    { name: "Sciences", value: 69 },
  ];

  const COLORS = ["#f472b6", "#60a5fa", "#34d399", "#facc15"];

  const moyenneClasse = (
    data.reduce((acc, curr) => acc + curr.value, 0) / data.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 p-10 font-[Nunito]">
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 dark:text-indigo-300 mb-8">
        📊 Vue Globale de la Classe
      </h1>

      <div className="flex justify-center mb-8 gap-4">
        {["Global", "Français", "Maths", "Lecture", "Sciences"].map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`px-5 py-2 rounded-xl shadow-md font-semibold transition-all ${
              filtre === f
                ? "bg-indigo-500 text-white"
                : "bg-white dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          🌱 Moyenne générale de la classe :{" "}
          <span className="text-indigo-600 dark:text-indigo-300">{moyenneClasse}%</span>
        </h2>

        <div className="w-full h-96">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(props) => `${props.name ?? ""} (${props.value ?? 0}%)`}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/enseignant/tableau"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            ⬅️ Retour au tableau de classe
          </Link>
        </div>
      </div>
    </div>
  );
}