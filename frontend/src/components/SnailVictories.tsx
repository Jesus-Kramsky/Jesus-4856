import { BarChart, Bar, XAxis, YAxis, LabelList } from "recharts";

export default function SnailVictories() {
  const barData = [
    { name: "Turbo", victories: 2 },
    { name: "Razer", victories: 1 },
    { name: "Flash", victories: 0 },
    { name: "Bolt", victories: 1 },
    { name: "Rayo", victories: 2 },
    { name: "Cher", victories: 0 },
  ];

  return (
    <div className="flex flex-1 flex-col border p-4 gap-4 border-gray-700">
      <p>Victorias por caracol</p>
      <p>6 carreras · 1 ganador por carrera</p>
      <BarChart
        height={350}
        data={barData}
        margin={{ top: 35, right: 20, bottom: 10, left: 20 }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#C7C4BC", fontSize: 20 }}
          dy={10}
        />
        <YAxis hide domain={[0, 2]} />
        <Bar
          dataKey="victories"
          fill="#F59E0B"
          radius={[10, 10, 0, 0]}
          barSize={132}
        >
          <LabelList
            dataKey="victories"
            position="top"
            fill="#F3F4F6"
            fontSize={28}
            fontWeight={600}
            offset={8}
          />
        </Bar>
      </BarChart>
    </div>
  );
}
