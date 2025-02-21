import React, { useState } from "react";
import { useData } from "../context/DataContext";

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

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-neon-green">Goals</h2>
      <div className="glass p-6 shadow-lg flex items-center space-x-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a goal"
          className="p-2 bg-transparent border-b border-white/20 text-gray-200 flex-1"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 bg-transparent border-b border-white/20 text-gray-200"
        />
        <button onClick={addGoal} className="btn-glass bg-red-500/20 text-red-400">
          Add
        </button>
      </div>
      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className="glass p-4 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-200">{goal.title}</h3>
            <p className="text-sm text-gray-400">Due: {goal.deadline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsPage;