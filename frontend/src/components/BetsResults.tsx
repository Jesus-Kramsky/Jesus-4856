import { PieChart, Pie } from "recharts";

export default function BetsResults() {
  const pieData = [
    { name: "Ganadas", value: 8, fill: "#10B981" },
    { name: "Perdidas", value: 14, fill: "#EF4444" },
  ];
  return (
    <div className="flex flex-1 flex-col border p-4 gap-4 border-gray-700">
      <p>Apuestas ganadas y perdidas</p>
      <div className="flex flex-row gap-4 justify-center">
        <PieChart width={240} height={240}>
          <Pie
            data={pieData}
            innerRadius={50}
            outerRadius={80}
            dataKey="value"
          ></Pie>
          <text
            x="120"
            y="112"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#F3F4F6"
            fontSize="28"
            fontWeight="600"
          >
            22
          </text>
          <text
            x="120"
            y="140"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#D1D5DB"
            fontSize="16"
          >
            apuestas
          </text>
        </PieChart>
        <div className="flex flex-col justify-center gap-2">
          <p className="flex items-center gap-3 text-lg font-bold text-white">
            <span
              className="h-4 w-4 shrink-0 rounded bg-[#10B981]"
              aria-hidden="true"
            />
            Ganadas: 8 (36%)
          </p>
          <p className="flex items-center gap-3 text-lg font-bold text-white">
            <span
              className="h-4 w-4 shrink-0 rounded bg-[#EF4444]"
              aria-hidden="true"
            />
            Perdidas: 14 (64%)
          </p>
        </div>
      </div>
    </div>
  );
}
