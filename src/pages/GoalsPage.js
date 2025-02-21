import React from "react";
import QuoteDisplay from "../components/QuoteDisplay";
import { useData } from "../context/DataContext";

const Dashboard = () => {
  const { tasks, habits } = useData();
  const totalTimeToday = tasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);
  const tasksCompleted = tasks.filter((t) => t.completed).length;
  const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0), 0);

  return (
    <div className="p-6 ml-[20%]">
      <QuoteDisplay />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
          <h3 className="text-xl font-bold text-neon-green">Time Today</h3>
          <p className="text-2xl">
            {Math.floor(totalTimeToday / 3600)}h {Math.floor((totalTimeToday % 3600) / 60)}m
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
          <h3 className="text-xl font-bold text-neon-green">Tasks Done</h3>
          <p className="text-2xl">{tasksCompleted}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
          <h3 className="text-xl font-bold text-neon-green">Max Streak</h3>
          <p className="text-2xl">{maxStreak}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;