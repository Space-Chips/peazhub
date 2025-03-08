import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { FaFire, FaPlus, FaMinus } from "react-icons/fa";

const HabitsPage = () => {
  const { habits, setHabits } = useData();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addHabit = () => {
    if (title) {
      setHabits([...habits, { id: Date.now(), title, description, streak: 0, lastCompleted: null }]);
      setTitle("");
      setDescription("");
    }
  };

  const incrementStreak = (id) => {
    setHabits(
      habits.map((h) =>
        h.id === id
          ? {
              ...h,
              streak: h.streak + 1,
              lastCompleted: new Date().toISOString(),
            }
          : h
      )
    );
  };

  const decrementStreak = (id) => {
    setHabits(
      habits.map((h) =>
        h.id === id && h.streak > 0
          ? {
              ...h,
              streak: h.streak - 1,
              lastCompleted: new Date().toISOString(),
            }
          : h
      )
    );
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((h) =>
        h.id === id
          ? {
              ...h,
              lastCompleted: h.lastCompleted ? null : new Date().toISOString(),
            }
          : h
      )
    );
  };

  const totalHabits = habits.length;
  const totalStreaks = habits.reduce((sum, habit) => sum + habit.streak, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-black font-sans p-6 pt-20">
      <h2 className="text-4xl font-bold text-neon-green text-center mb-8">Habits</h2>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-800 mb-10">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a habit"
            className="p-3 bg-transparent border-b border-gray-500 text-white flex-1 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-200"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-3 bg-transparent border-b border-gray-500 text-white flex-1 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-200"
          />
          <button
            onClick={addHabit}
            className="p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md border border-gray-800 w-full md:w-auto text-red-400 font-semibold"
          >
            Add
          </button>
        </div>
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-800 mb-10">
        <h3 className="text-2xl font-semibold text-blue-500 mb-4">Summary</h3>
        <p className="text-xl font-bold text-white">{totalHabits} Habits</p>
        <p className="text-xl font-bold text-white">{totalStreaks} Total Streaks</p>
      </div>
      <div className="space-y-6">
        {habits.map((habit) => (
          <div key={habit.id} className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 shadow-md border border-gray-700 flex justify-between items-center transition-all duration-200 hover:bg-gray-800/90">
            <div>
              <h3 className="text-lg font-semibold text-white">{habit.title}</h3>
              <p className="text-sm text-gray-400">{habit.description}</p>
              <p className="text-sm text-gray-400">Streak: {habit.streak}</p>
              <p className="text-sm text-gray-400">Last Completed: {habit.lastCompleted ? new Date(habit.lastCompleted).toLocaleDateString() : "Never"}</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => incrementStreak(habit.id)}
                className="p-2 bg-green-500/10 rounded-full hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
                title="Increment Streak"
              >
                <FaPlus size={16} className="text-green-500" />
              </button>
              <button
                onClick={() => decrementStreak(habit.id)}
                className="p-2 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
                title="Decrement Streak"
              >
                <FaMinus size={16} className="text-red-500" />
              </button>
              <button
                onClick={() => toggleHabit(habit.id)}
                className="p-2 bg-green-500/10 rounded-full hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
                title="Toggle Habit"
              >
                <FaFire size={16} className="text-green-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitsPage;