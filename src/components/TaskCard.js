import React, { useState, useEffect } from "react";

const TaskCard = ({ task, updateTask, deleteTask }) => {
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
    <div className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{task.title}</h3>
        <span className="text-sm text-blue-500">{task.category}</span>
        <p className="text-sm">
          {Math.floor(timeSpent / 3600)}h {Math.floor((timeSpent % 3600) / 60)}m {timeSpent % 60}s
        </p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`p-1 rounded ${isRunning ? "bg-red-500" : "bg-green-500"}`}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={() => deleteTask(task.id)} className="p-1 bg-red-500 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;