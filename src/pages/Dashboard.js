import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaFire, FaPlus, FaMinus } from "react-icons/fa";
import { useData } from "../context/DataContext";
import QuoteDisplay from "../components/QuoteDisplay";

const Dashboard = () => {
  const { tasks, habits, goals, setHabits } = useData();

  // Calculate dashboard metrics
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const totalTimeSpentToday = tasks.reduce((sum, task) => {
    const today = new Date().toDateString();
    const taskSessions = task.sessions || [];
    const todaySessions = taskSessions.filter(
      (session) => new Date(session.timestamp).toDateString() === today
    );
    const todayTime = todaySessions.reduce((sessionSum, session) => sessionSum + session.duration, 0);
    return sum + todayTime;
  }, 0);
  const dailyGoal = 8 * 3600; // 8 hours as a sample daily goal
  const progress = (totalTimeSpentToday / dailyGoal) * 100;

  const completedGoals = goals.filter((goal) => goal.completed).length;
  const totalGoals = goals.length;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + "h " : ""}${m > 0 ? m + "m " : ""}${s}s`;
  };

  const incrementStreak = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, streak: habit.streak + 1 } : habit
      )
    );
  };

  const decrementStreak = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id && habit.streak > 0
          ? { ...habit, streak: habit.streak - 1 }
          : habit
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-black font-sans">
      <div className="p-6 pt-20">
        <h1 className="text-3xl font-bold text-white tracking-widest text-center mb-8">
          D A S H B O A R D
        </h1>
        <QuoteDisplay period="work" />
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

          {/* Goals Overview Widget */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/10">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Goals</h2>
            <p className="text-4xl font-bold text-white">{completedGoals}/{totalGoals}</p>
            <p className="text-sm text-gray-400 mt-2">Completed / Total</p>
          </div>

          {/* Habits Overview Widget */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/10">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Habits</h2>
            <div className="space-y-2">
              {habits.map((habit) => (
                <div key={habit.id} className="flex justify-between items-center">
                  <span className="text-white">{habit.title}</span>
                  <div className="flex items-center space-x-2">
                    <FaFire className="text-red-500" />
                    <span className="text-gray-400">Streak: {habit.streak}</span>
                    <button
                      onClick={() => incrementStreak(habit.id)}
                      className="p-1 bg-green-500/10 rounded-full hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
                      title="Increment Streak"
                    >
                      <FaPlus size={12} className="text-green-500" />
                    </button>
                    <button
                      onClick={() => decrementStreak(habit.id)}
                      className="p-1 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
                      title="Decrement Streak"
                    >
                      <FaMinus size={12} className="text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;