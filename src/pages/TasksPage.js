import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable, closestCenter } from "@dnd-kit/core";
import { FaCheck, FaTrash, FaDumbbell } from "react-icons/fa";
import { useData } from "../context/DataContext";

const TasksPage = ({ setGrindModeActive }) => {
  const { tasks, setTasks } = useData();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");

  // Migrate old tasks without 'board' property on mount
  useEffect(() => {
    const migratedTasks = tasks.map((task) => {
      if (!task.board) {
        let board = "toDo"; // Default for old tasks
        if (task.completed) {
          board = "done";
        } else if (task.timeSpent > 0) {
          board = "doing";
        }
        return { ...task, board };
      }
      return task;
    });
    if (migratedTasks.some((t, i) => t.board !== tasks[i]?.board)) {
      setTasks(migratedTasks);
    }
  }, [tasks, setTasks]);

  // Add a new task
  const addTask = () => {
    if (title) {
      const newTask = {
        id: Date.now().toString(),
        title,
        category,
        priority,
        completed: false,
        timeSpent: 0,
        board: "toDo",
      };
      setTasks([...tasks, newTask]);
      setTitle("");
    }
  };

  // Update an existing task
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Start Grind Mode with a task
  const startGrindMode = (task) => {
    setGrindModeActive(task);
  };

  // Format time for display
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + "h " : ""}${m > 0 ? m + "m " : ""}${s}s`;
  };

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      console.log("Dropped outside a board");
      return;
    }

    const sourceBoard = active.data.current.board;
    const destBoard = over.id;

    if (sourceBoard === destBoard) {
      console.log("Dropped in the same board, no change");
      return;
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === active.id) {
        const updatedTask = { ...task, board: destBoard };
        if (destBoard === "done") {
          updatedTask.completed = true;
        } else if (destBoard === "toDo") {
          updatedTask.completed = false;
          updatedTask.timeSpent = 0;
        } else if (destBoard === "doing") {
          updatedTask.completed = false;
          updatedTask.timeSpent = updatedTask.timeSpent || 1;
        }
        return updatedTask;
      }
      return task;
    });

    console.log("Updated tasks:", updatedTasks);
    setTasks(updatedTasks);
  };

  // Derive boards from tasks, falling back for old data
  const boards = {
    toDo: tasks.filter((t) => t.board === "toDo" || (!t.board && !t.completed && (!t.timeSpent || t.timeSpent === 0))),
    doing: tasks.filter((t) => t.board === "doing" || (!t.board && !t.completed && t.timeSpent > 0)),
    done: tasks.filter((t) => t.board === "done" || (!t.board && t.completed)),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black font-sans">
      <div className="p-6 pt-20">
        {/* Task Input Form */}
        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/10 mb-10">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a task"
              className="p-3 bg-transparent border-b border-white/20 text-white flex-1 placeholder-white/50 focus:outline-none focus:border-yellow-400 transition-all duration-200"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 bg-transparent border-b border-white/20 text-white w-full md:w-32 focus:outline-none focus:border-yellow-400 transition-all duration-200"
            >
              <option>Work</option>
              <option>Fitness</option>
              <option>Personal Growth</option>
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-3 bg-transparent border-b border-white/20 text-white w-full md:w-32 focus:outline-none focus:border-yellow-400 transition-all duration-200"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <button
              onClick={addTask}
              className="p-3 bg-yellow-500/10 rounded-xl hover:bg-yellow-500/20 transition-all duration-200 backdrop-blur-md border border-white/10 w-full md:w-auto text-yellow-400 font-semibold"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* Task Boards */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
        </DndContext>
      </div>
    </div>
  );
};

// Board Component (Droppable Area)
const Board = ({ id, title, tasks, updateTask, deleteTask, startGrindMode, formatTime }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/10"
    >
      <h2 className="text-xl font-semibold text-yellow-400 mb-4">{title}</h2>
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

// Task Card Component (Draggable Item)
const TaskCard = ({ task, updateTask, deleteTask, startGrindMode, formatTime }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { board: task.board },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 1000,
      }
    : { zIndex: 1 };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-gray-800/70 backdrop-blur-md rounded-lg p-4 shadow-md border border-white/10 flex justify-between items-center transition-all duration-200 hover:bg-gray-800/90 ${
        isDragging ? "opacity-75" : "opacity-100"
      }`}
    >
      <div>
        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
        <div className="flex items-center space-x-2">
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
        <p className="text-sm text-gray-400">{formatTime(task.timeSpent || 0)}</p>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => startGrindMode(task)}
          className="p-2 bg-yellow-500/10 rounded-full hover:bg-yellow-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
          title="Start Grinding"
        >
          <FaDumbbell size={16} color="#FBBF24" />
        </button>
        <button
          onClick={() => updateTask({ ...task, completed: !task.completed })}
          className="p-2 bg-yellow-500/10 rounded-full hover:bg-yellow-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
          title={task.completed ? "Mark as Incomplete" : "Mark as Complete"}
        >
          <FaCheck size={16} color={task.completed ? "#E5E7EB" : "#FBBF24"} />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
          title="Delete Task"
        >
          <FaTrash size={16} color="#EF4444" />
        </button>
      </div>
    </div>
  );
};

export default TasksPage;