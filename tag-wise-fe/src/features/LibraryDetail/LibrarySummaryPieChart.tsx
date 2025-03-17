import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import type { LibrarySummary } from "./useLibrary";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function LibrarySummaryPieChart({
  librarySummary,
}: {
  librarySummary: LibrarySummary;
}) {
  const data = Object.entries(librarySummary.rulesName).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <PieChart width={300} height={150}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={60}
        fill="#8884d8"
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        align="left"
        layout="vertical"
        wrapperStyle={{ fontSize: 10, position: "absolute", top: 40, left: 0 }}
      />
    </PieChart>
  );
}

export default LibrarySummaryPieChart;
