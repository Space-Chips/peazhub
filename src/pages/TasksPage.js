import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import { useData } from "../context/DataContext";

const TasksPage = () => {
  const { tasks, setTasks } = useData();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");

  const addTask = () => {
    if (title) {
      setTasks([...tasks, { id: Date.now(), title, category, completed: false, timeSpent: 0 }]);
      setTitle("");
    }
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 ml-[20%]">
      <h2 className="text-2xl font-bold text-neon-green mb-4">Tasks</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task"
          className="p-2 bg-gray-700 rounded text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="ml-2 p-2 bg-gray-700 rounded text-white"
        >
          <option>Work</option>
          <option>Fitness</option>
          <option>Personal Growth</option>
        </select>
        <button onClick={addTask} className="ml-2 p-2 bg-red-500 rounded glow-red">
          Add
        </button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;