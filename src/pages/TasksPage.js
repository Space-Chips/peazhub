import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash, FaDumbbell, FaTag } from "react-icons/fa";
import { useData } from "../context/DataContext";
import GrindMode from "../components/GrindMode"; // Import GrindMode component

const TasksPage = () => {
  const { tasks, setTasks } = useData();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [grindModeActive, setGrindModeActive] = useState(null); // State to manage grind mode

  useEffect(() => {
    const migratedTasks = tasks.map((task) => {
      if (!task.board) {
        let board = "toDo";
        if (task.completed) board = "done";
        else if (task.timeSpent > 0) board = "doing";
        return { ...task, board };
      }
      return task;
    });
    if (migratedTasks.some((t, i) => t.board !== tasks[i]?.board)) {
      setTasks(migratedTasks);
    }
  }, [tasks, setTasks]);

  const addTask = () => {
    if (title) {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        category,
        priority,
        completed: false,
        timeSpent: 0,
        board: "toDo",
      };
      setTasks([...tasks, newTask]);
      setTitle("");
      setDescription("");
    }
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startGrindMode = (task) => {
    setGrindModeActive(task); // Set the active task for grind mode
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + "h " : ""}${m > 0 ? m + "m " : ""}${s}s`;
  };

  const boards = {
    toDo: tasks.filter((t) => t.board === "toDo" || (!t.board && !t.completed && (!t.timeSpent || t.timeSpent === 0))),
    doing: tasks.filter((t) => t.board === "doing" || (!t.board && !t.completed && t.timeSpent > 0)),
    done: tasks.filter((t) => t.board === "done" || (!t.board && t.completed)),
  };

  if (grindModeActive) {
    return <GrindMode selectedTask={grindModeActive} setGrindModeActive={setGrindModeActive} />; // Render GrindMode component
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-black font-sans">
      <div className="p-6 pt-20">
        <h1 className="text-4xl font-bold text-white tracking-widest text-center mb-8">
          T A S K S
        </h1>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-800 mb-10">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a task"
              className="p-3 bg-transparent border-b border-gray-500 text-white flex-1 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-200"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="p-3 bg-transparent border-b border-gray-500 text-white flex-1 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-200"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 bg-transparent border-b border-gray-500 text-white w-full md:w-32 focus:outline-none focus:border-blue-500 transition-all duration-200"
            >
              <option>Work</option>
              <option>School</option>
              <option>Fitness</option>
              <option>Personal Growth</option>
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-3 bg-transparent border-b border-gray-500 text-white w-full md:w-32 focus:outline-none focus:border-blue-500 transition-all duration-200"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button
              onClick={addTask}
              className="p-3 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-all duration-200 backdrop-blur-md border border-gray-800 w-full md:w-auto text-blue-500 font-semibold"
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Board
            id="toDo"
            title="To Do"
            tasks={boards.toDo}
            updateTask={updateTask}
            deleteTask={deleteTask}
            startGrindMode={startGrindMode}
            formatTime={formatTime}
          />
          <Board
            id="doing"
            title="Doing"
            tasks={boards.doing}
            updateTask={updateTask}
            deleteTask={deleteTask}
            startGrindMode={startGrindMode}
            formatTime={formatTime}
          />
          <Board
            id="done"
            title="Done"
            tasks={boards.done}
            updateTask={updateTask}
            deleteTask={deleteTask}
            startGrindMode={startGrindMode}
            formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  );
};

const Board = ({ id, title, tasks, updateTask, deleteTask, startGrindMode, formatTime }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-800">
      <h2 className="text-xl font-semibold text-blue-500 mb-4">{title}</h2>
      <div className="space-y-4 min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            startGrindMode={startGrindMode}
            formatTime={formatTime}
          />
        ))}
      </div>
    </div>
  );
};

const TaskCard = ({ task, updateTask, deleteTask, startGrindMode, formatTime }) => {
  return (
    <div className="bg-gray-800/70 backdrop-blur-md rounded-lg p-4 shadow-md border border-gray-700 flex justify-between items-center transition-all duration-200 hover:bg-gray-800/90">
      <div>
        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
        <p className="text-sm text-gray-400">{task.description}</p>
        <div className="flex items-center space-x-2 mt-2">
          <FaTag className="text-gray-400" />
          <span className="text-sm text-blue-400">{task.category}</span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              task.priority === "High"
                ? "bg-red-500/20 text-red-400"
                : task.priority === "Medium"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {task.priority}
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-2">{formatTime(task.timeSpent || 0)}</p>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => startGrindMode(task)}
          className="p-2 bg-blue-500/10 rounded-full hover:bg-blue-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
          title="Start Grinding"
        >
          <FaDumbbell size={16} color="#3B82F6" />
        </button>
        <button
          onClick={() => updateTask({ ...task, completed: !task.completed })}
          className="p-2 bg-blue-500/10 rounded-full hover:bg-blue-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
          title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
        >
          <FaCheck size={16} color={task.completed ? "#9CA3AF" : "#3B82F6"} />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md border border-gray-700"
          title="Delete Task"
        >
          <FaTrash size={16} color="#EF4444" />
        </button>
      </div>
    </div>
  );
};

export default TasksPage;