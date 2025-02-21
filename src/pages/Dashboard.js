import React from "react";
import QuoteDisplay from "../components/QuoteDisplay";
import { useData } from "../context/DataContext";

const Dashboard = () => {
  const { tasks, habits } = useData();
  const totalTimeToday = tasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);
  const tasksCompleted = tasks.filter((t) => t.completed).length;
  const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0), 0);

  return (
    <div className="space-y-8">
      <div className="glass p-6 shadow-lg text-center">
        <QuoteDisplay />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="glass p-6 shadow-lg text-center">
          <h3 className="text-xl font-semibold text-neon-green">Time Today</h3>
          <p className="text-2xl text-gray-200">
            {Math.floor(totalTimeToday / 3600)}h {Math.floor((totalTimeToday % 3600) / 60)}m
          </p>
        </div>
        <div className="glass p-6 shadow-lg text-center">
          <h3 className="text-xl font-semibold text-neon-green">Tasks Done</h3>
          <p className="text-2xl text-gray-200">{tasksCompleted}</p>
        </div>
        <div className="glass p-6 shadow-lg text-center">
          <h3 className="text-xl font-semibold text-neon-green">Max Streak</h3>
          <p className="text-2xl text-gray-200">{maxStreak}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;