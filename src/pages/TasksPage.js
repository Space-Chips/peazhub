import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import { useData } from "../context/DataContext";

const TasksPage = ({ setGrindModeActive }) => {
  const { tasks, setTasks } = useData();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");

  const addTask = () => {
    if (title) {
      setTasks([...tasks, { id: Date.now(), title, category, priority, completed: false, timeSpent: 0 }]);
      setTitle("");
    }
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startGrindMode = (task) => {
    setGrindModeActive(task); // Pass the task to trigger Grind Mode
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-neon-green">Tasks</h2>
      <div className="glass p-6 shadow-lg flex items-center space-x-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          className="p-2 bg-transparent border-b border-white/20 text-gray-200 flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-transparent border-b border-white/20 text-gray-200"
        >
          <option>Work</option>
          <option>Fitness</option>
          <option>Personal Growth</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 bg-transparent border-b border-white/20 text-gray-200"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={addTask} className="btn-glass bg-red-500/20">
          Add
        </button>
      </div>
      <div className="space-y-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            startGrindMode={startGrindMode}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;