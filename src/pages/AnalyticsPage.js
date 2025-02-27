import React from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { useData } from "../context/DataContext";
import _ from "lodash";

ChartJS.register(LineElement, PointElement, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip);

const AnalyticsPage = () => {
  const { tasks, habits } = useData();

  const last7Days = _.range(6, -1, -1).map((d) => {
    const date = new Date();
    date.setDate(date.getDate() - d);
    return date.toISOString().split("T")[0];
  });

  const timeData = {
    labels: last7Days,
    datasets: [
      {
        label: "Time Spent (s)",
        data: last7Days.map((day) =>
          tasks.reduce((sum, t) => sum + (t.timeSpent && new Date().toISOString().split("T")[0] === day ? t.timeSpent : 0), 0)
        ),
        borderColor: "#10B981",
        backgroundColor: "#10B981",
      },
    ],
  };

  const categoryData = {
    labels: ["Work", "Fitness", "Personal Growth"],
    datasets: [
      {
        data: ["Work", "Fitness", "Personal Growth"].map((cat) =>
          tasks.filter((t) => t.category === cat).reduce((sum, t) => sum + (t.timeSpent || 0), 0)
        ),
        backgroundColor: ["#EF4444", "#10B981", "#3B82F6"],
      },
    ],
  };

  const streakData = {
    labels: habits.map((h) => h.title),
    datasets: [
      {
        label: "Streak",
        data: habits.map((h) => h.streak || 0),
        backgroundColor: "#EF4444",
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-neon-green">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="glass p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Time Spent (Last 7 Days)</h3>
          <Line data={timeData} options={{ plugins: { legend: { display: false } } }} />
        </div>
        <div className="glass p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Time by Category</h3>
          {tasks.length > 0 ? <Pie data={categoryData} /> : <p className="text-center text-gray-400">No data yet.</p>}
        </div>
        <div className="glass p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Habit Streaks</h3>
          {habits.length > 0 ? <Bar data={streakData} /> : <p className="text-center text-gray-400">No habits yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;