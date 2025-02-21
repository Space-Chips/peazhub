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
    <div className="p-6 ml-[20%]">
      <h2 className="text-2xl font-bold text-neon-green mb-4">Habits</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a habit"
          className="p-2 bg-gray-700 rounded text-white"
        />
        <button onClick={addHabit} className="ml-2 p-2 bg-red-500 rounded glow-red">
          Add
        </button>
      </div>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="bg-gray-800 p-4 rounded-lg shadow flex justify-between">
            <div>
              <h3 className="text-lg font-bold">{habit.title}</h3>
              <p className="text-sm">Streak: {habit.streak}</p>
            </div>
            <button onClick={() => toggleHabit(habit.id)} className="p-1 bg-green-500 rounded">
              Complete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitsPage;