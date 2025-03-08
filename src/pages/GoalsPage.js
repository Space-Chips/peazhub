import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const GoalsPage = () => {
  const { goals, setGoals } = useData();
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const addGoal = () => {
    if (title && deadline) {
      setGoals([...goals, { id: Date.now(), title, deadline, completed: false }]);
      setTitle("");
      setDeadline("");
    }
  };

  const toggleGoalCompletion = (id) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: !goal.completed } : goal)));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const completedGoals = goals.filter((goal) => goal.completed).length;
  const totalGoals = goals.length;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-black font-sans p-6 pt-20">
      <h2 className="text-4xl font-bold text-neon-green text-center mb-8">Goals</h2>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-800 mb-10">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a goal"
            className="p-3 bg-transparent border-b border-gray-500 text-white flex-1 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-200"
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-3 bg-transparent border-b border-gray-500 text-white w-full md:w-32 focus:outline-none focus:border-blue-500 transition-all duration-200"
          />
          <button
            onClick={addGoal}
            className="p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md border border-gray-800 w-full md:w-auto text-red-400 font-semibold"
          >
            Add
          </button>
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-800 mb-10">
        <h3 className="text-2xl font-semibold text-blue-500 mb-4">Summary</h3>
        <p className="text-xl font-bold text-white">{completedGoals}/{totalGoals} Goals Completed</p>
      </div>
      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 shadow-md border border-gray-700 flex justify-between items-center transition-all duration-200 hover:bg-gray-800/90">
            <div>
              <h3 className="text-lg font-semibold text-white">{goal.title}</h3>
              <p className="text-sm text-gray-400">Due: {goal.deadline}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => toggleGoalCompletion(goal.id)}
                className="p-2 bg-green-500/10 rounded-full hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
                title={goal.completed ? "Mark as Incomplete" : "Mark as Complete"}
              >
                <FaCheckCircle size={16} color={goal.completed ? "#10B981" : "#9CA3AF"} />
              </button>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="p-2 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
                title="Delete Goal"
              >
                <FaTimesCircle size={16} color="#EF4444" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsPage;