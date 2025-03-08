import React from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
import { FaTasks, FaListAlt, FaBullseye, FaCheckCircle } from "react-icons/fa";
import _ from "lodash";

ChartJS.register(LineElement, PointElement, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip);

const AnalyticsPage = () => {
  const { tasks, habits, goals } = useData();

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
          tasks.reduce((sum, t) => sum + (t.timeSpent && new Date(t.timeSpent).toISOString().split("T")[0] === day ? t.timeSpent : 0), 0)
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

  const taskCompletionData = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        data: [
          tasks.filter((task) => task.completed).length,
          tasks.filter((task) => !task.completed).length,
        ],
        backgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };

  const goalCompletionData = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        data: [
          goals.filter((goal) => goal.completed).length,
          goals.filter((goal) => !goal.completed).length,
        ],
        backgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };

  const habitStreakTrendData = {
    labels: last7Days,
    datasets: habits.map((habit) => ({
      label: habit.title,
      data: last7Days.map((day) =>
        habit.streakHistory && habit.streakHistory[day] ? habit.streakHistory[day] : 0
      ),
      borderColor: "#10B981",
      backgroundColor: "#10B981",
    })),
  };

  const getSuggestions = () => {
    const suggestions = [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalHabits = habits.length;
    const totalStreaks = habits.reduce((sum, habit) => sum + habit.streak, 0);
    const totalGoals = goals.length;
    const completedGoals = goals.filter((goal) => goal.completed).length;

    if (totalTasks === 0) {
      suggestions.push("You haven't added any tasks. Start by setting some goals and tasks.");
    } else if (completedTasks / totalTasks < 0.5) {
      suggestions.push("Your task completion rate is abysmal. Stop procrastinating and get to work.");
    } else {
      suggestions.push("Good job on completing your tasks. Keep pushing for more.");
    }

    if (totalHabits === 0) {
      suggestions.push("You haven't added any habits. Start building some positive routines.");
    } else if (totalStreaks / totalHabits < 1) {
      suggestions.push("Your habit streaks are weak. Consistency is key. Step up your game.");
    } else {
      suggestions.push("Excellent habit streaks. Keep building those positive routines.");
    }

    if (totalGoals === 0) {
      suggestions.push("You haven't set any goals. Define what you want to achieve.");
    } else if (completedGoals / totalGoals < 0.5) {
      suggestions.push("You're failing to achieve your goals. Focus and execute.");
    } else {
      suggestions.push("Great job on achieving your goals. Set new ones and keep striving.");
    }

    return suggestions;
  };

  const suggestions = getSuggestions();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalGoals = goals.length;
  const completedGoals = goals.filter((goal) => goal.completed).length;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-black font-sans p-6 pt-20">
      <h2 className="text-4xl font-bold text-neon-green text-center mb-8">Analytics</h2>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-800 mb-10">
        <h3 className="text-2xl font-semibold text-blue-500 mb-4">Summary</h3>
        <div className="flex flex-wrap justify-around">
          <Link to="/tasks" className="flex flex-col items-center text-white">
            <FaTasks size={40} className="text-blue-500 mb-2" />
            <p className="text-xl font-bold">{tasks.length} Tasks</p>
          </Link>
          <Link to="/habits" className="flex flex-col items-center text-white">
            <FaListAlt size={40} className="text-green-500 mb-2" />
            <p className="text-xl font-bold">{habits.length} Habits</p>
          </Link>
          <Link to="/goals" className="flex flex-col items-center text-white">
            <FaBullseye size={40} className="text-red-500 mb-2" />
            <p className="text-xl font-bold">{goals.length} Goals</p>
          </Link>
          <div className="flex flex-col items-center text-white">
            <FaCheckCircle size={40} className="text-yellow-500 mb-2" />
            <p className="text-xl font-bold">{tasks.filter((task) => task.completed).length} Tasks Completed</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <FaCheckCircle size={40} className="text-yellow-500 mb-2" />
            <p className="text-xl font-bold">{goals.filter((goal) => goal.completed).length} Goals Completed</p>
          </div>
          <div className="flex flex-col items-center text-white">
            <FaCheckCircle size={40} className="text-yellow-500 mb-2" />
            <p className="text-xl font-bold">{habits.reduce((sum, habit) => sum + habit.streak, 0)} Total Streaks</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-4 shadow-lg rounded-2xl flex flex-col items-center">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Overall Progress</h3>
          <CircularProgressbar
            value={(completedTasks / totalTasks) * 100}
            text={`${Math.round((completedTasks / totalTasks) * 100)}%`}
            styles={buildStyles({
              pathColor: "#10B981",
              textColor: "#E5E7EB",
              trailColor: "rgba(255, 255, 255, 0.1)",
              textSize: "24px",
            })}
          />
          <p className="text-sm text-gray-400 mt-4">Tasks Completed</p>
        </div>
        <div className="glass p-4 shadow-lg rounded-2xl flex flex-col items-center">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Goal Progress</h3>
          <CircularProgressbar
            value={(completedGoals / totalGoals) * 100}
            text={`${Math.round((completedGoals / totalGoals) * 100)}%`}
            styles={buildStyles({
              pathColor: "#10B981",
              textColor: "#E5E7EB",
              trailColor: "rgba(255, 255, 255, 0.1)",
              textSize: "24px",
            })}
          />
          <p className="text-sm text-gray-400 mt-4">Goals Completed</p>
        </div>
        <div className="glass p-4 shadow-lg rounded-2xl">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Task Completion Rate</h3>
          {tasks.length > 0 ? <Pie data={taskCompletionData} /> : <p className="text-center text-gray-400">No tasks yet.</p>}
        </div>
        <div className="glass p-4 shadow-lg rounded-2xl">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Goal Completion Rate</h3>
          {goals.length > 0 ? <Pie data={goalCompletionData} /> : <p className="text-center text-gray-400">No goals yet.</p>}
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-800 mb-10">
        <h3 className="text-2xl font-semibold text-blue-500 mb-4">Suggestions</h3>
        <ul className="list-disc list-inside text-white">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-lg">{suggestion}</li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-4 shadow-lg rounded-2xl">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Time Spent (Last 7 Days)</h3>
          <Line data={timeData} options={{ plugins: { legend: { display: false } } }} />
        </div>
        <div className="glass p-4 shadow-lg rounded-2xl">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Time by Category</h3>
          {tasks.length > 0 ? <Pie data={categoryData} /> : <p className="text-center text-gray-400">No data yet.</p>}
        </div>
        <div className="glass p-4 shadow-lg rounded-2xl">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Habit Streaks</h3>
          {habits.length > 0 ? <Bar data={streakData} /> : <p className="text-center text-gray-400">No habits yet.</p>}
        </div>
        <div className="glass p-4 shadow-lg rounded-2xl">
          <h3 className="text-lg font-semibold text-neon-green mb-4">Habit Streak Trends</h3>
          {habits.length > 0 ? <Line data={habitStreakTrendData} /> : <p className="text-center text-gray-400">No habits yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;