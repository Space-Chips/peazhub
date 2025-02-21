import React, { useState } from "react";
import { useData } from "../context/DataContext";

const HabitsPage = () => {
  const { habits, setHabits } = useData();
  const [title, setTitle] = useState("");

  const addHabit = () => {
    if (title) {
      setHabits([...habits, { id: Date.now(), title, streak: 0, lastCompleted: null }]);
      setTitle("");
    }
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((h) =>
        h.id === id
          ? {
              ...h,
              streak:
                h.lastCompleted && new Date(h.lastCompleted).toDateString() === new Date().toDateString()
                  ? h.streak
                  : h.streak + 1,
              lastCompleted: new Date().toISOString(),
            }
          : h
      )
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-neon-green">Habits</h2>
      <div className="glass p-6 shadow-lg flex items-center space-x-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a habit"
          className="p-2 bg-transparent border-b border-white/20 text-gray-200 flex-1"
        />
        <button onClick={addHabit} className="btn-glass bg-red-500/20 text-red-400">
          Add
        </button>
      </div>
      <div className="space-y-6">
        {habits.map((habit) => (
          <div key={habit.id} className="glass p-4 shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">{habit.title}</h3>
              <p className="text-sm text-gray-400">Streak: {habit.streak}</p>
            </div>
            <button onClick={() => toggleHabit(habit.id)} className="btn-glass bg-green-500/20 text-green-400">
              Done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitsPage;