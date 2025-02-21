import React, { useState, useEffect } from "react";

const TaskCard = ({ task, updateTask, deleteTask, startGrindMode }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(task.timeSpent || 0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeSpent((prev) => {
          const newTime = prev + 1;
          updateTask({ ...task, timeSpent: newTime });
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, task, updateTask]);

  return (
    <div className="glass p-4 shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-200">{task.title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-blue-400">{task.category}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${task.priority === "High" ? "priority-high" : task.priority === "Medium" ? "priority-medium" : "priority-low"}`}>
            {task.priority}
          </span>
        </div>
        <p className="text-sm text-gray-400">
          {Math.floor(timeSpent / 3600)}h {Math.floor((timeSpent % 3600) / 60)}m {timeSpent % 60}s
        </p>
      </div>
      <div className="space-x-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`btn-glass ${isRunning ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={() => startGrindMode(task)} className="btn-glass bg-neon-green/20 text-neon-green">
          Grind Now
        </button>
        <button onClick={() => deleteTask(task.id)} className="btn-glass bg-red-500/20 text-red-400">
          Delete
        </button>
      </div>
    </div>
  );
};


export default TaskCard;