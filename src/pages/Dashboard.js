import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useData } from "../context/DataContext";

const Dashboard = () => {
  const { tasks } = useData();

  // Calculate dashboard metrics
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const totalTimeSpentToday = tasks.reduce((sum, task) => {
    const today = new Date().toDateString();
    const taskTime = task.timeSpent || 0;
    // Assume timeSpent is in seconds; we'll filter for today in a real app with timestamps
    return sum + taskTime;
  }, 0);
  const dailyGoal = 8 * 3600; // 8 hours as a sample daily goal
  const progress = (totalTimeSpentToday / dailyGoal) * 100;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + "h " : ""}${m > 0 ? m + "m " : ""}${s}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black font-sans">
      <div className="p-6 pt-20">
        <h1 className="text-3xl font-bold text-white tracking-widest text-center mb-8">
          D A S H B O A R D
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Task Overview Widget */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/10">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Tasks</h2>
            <p className="text-4xl font-bold text-white">{completedTasks}/{totalTasks}</p>
            <p className="text-sm text-gray-400 mt-2">Completed / Total</p>
          </div>

          {/* Time Spent Widget */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/10">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Time Spent Today</h2>
            <p className="text-4xl font-bold text-white">{formatTime(totalTimeSpentToday)}</p>
            <p className="text-sm text-gray-400 mt-2">Focused Effort</p>
          </div>

          {/* Progress Widget */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/10 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Daily Progress</h2>
            <div className="w-32">
              <CircularProgressbar
                value={progress}
                text={`${Math.round(progress)}%`}
                styles={buildStyles({
                  pathColor: "#10B981",
                  textColor: "#E5E7EB",
                  trailColor: "rgba(255, 255, 255, 0.1)",
                  textSize: "24px",
                })}
              />
            </div>
            <p className="text-sm text-gray-400 mt-4">Goal: {formatTime(dailyGoal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;