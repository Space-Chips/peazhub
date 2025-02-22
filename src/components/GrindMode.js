import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  FaTasks,
  FaPlay,
  FaPause,
  FaCheck,
  FaTimes,
  FaSpotify,
  FaForward,
} from "react-icons/fa";
import QuoteDisplay from "./QuoteDisplay";
import { useData } from "../context/DataContext";

const GrindMode = ({ selectedTask: initialTask, setGrindModeActive }) => {
  const { tasks, setTasks } = useData();
  const [selectedTask, setSelectedTask] = useState(initialTask);
  const [mode, setMode] = useState(null);
  const [customWork, setCustomWork] = useState(25);
  const [customBreak, setCustomBreak] = useState(5);
  const [sessions, setSessions] = useState(1);
  const [currentSession, setCurrentSession] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState("work");
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Work");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");

  const modes = {
    Standard: { work: 25 * 60, break: 5 * 60 },
    Eisenhower: { work: 25 * 60, break: 5 * 60 },
    Monk: { work: 90 * 60, break: 30 * 60 },
    Sprint: { work: 15 * 60, break: 5 * 60 },
    DeepWork: { work: 120 * 60, break: 40 * 60 },
    Flow: { work: 52 * 60, break: 17 * 60 },
    Custom: { work: customWork * 60, break: customBreak * 60 },
  };

  const sessionDuration = mode ? modes[mode][currentPeriod] : 0;
  const totalWorkTime = mode ? modes[mode].work * sessions : 0;
  const sessionProgress = sessionDuration ? (1 - timeLeft / sessionDuration) * 100 : 0;
  const overallProgress = totalWorkTime
    ? ((currentSession - 1) * modes[mode].work + (currentPeriod === "work" ? modes[mode].work - timeLeft : 0)) / totalWorkTime * 100
    : 0;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + "h " : ""}${m > 0 ? m + "m " : ""}${s}s`;
  };

  useEffect(() => {
    if (!isRunning && mode && timeLeft === 0) {
      setTimeLeft(modes[mode].work);
    }
  }, [mode, isRunning]);

  useEffect(() => {
    if (!isRunning || isPaused || !mode) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (currentPeriod === "work" && currentSession < sessions) {
            setCurrentPeriod("break");
            return modes[mode].break;
          } else if (currentPeriod === "break") {
            setCurrentSession((prev) => prev + 1);
            setCurrentPeriod("work");
            return modes[mode].work;
          } else {
            setIsRunning(false);
            setCurrentPeriod("done");
            return 0;
          }
        }
        if (currentPeriod === "work" && selectedTask) {
          setTasks((prev) =>
            prev.map((t) =>
              t.id === selectedTask.id ? { ...t, timeSpent: (t.timeSpent || 0) + 1 } : t
            )
          );
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeLeft, mode, currentSession, sessions, currentPeriod, selectedTask]);

  const startGrind = () => {
    if (!mode) return;
    if (timeLeft === 0) setTimeLeft(modes[mode].work);
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseGrind = () => setIsPaused(true);
  const resumeGrind = () => setIsPaused(false);

  const skipToNext = () => {
    setTimeLeft(0);
  };

  const completeTask = () => {
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? { ...t, completed: true } : t))
      );
    }
    setGrindModeActive(false);
  };

  const addTask = () => {
    if (newTaskTitle) {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        category: newTaskCategory,
        priority: newTaskPriority,
        completed: false,
        timeSpent: 0,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  const playSpotify = () => {
    console.log("Playing motivational playlist on Spotify...");
    alert("Spotify playback simulated. Full integration requires OAuth and SDK setup.");
  };

  if (!mode) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 font-sans">
        <div className="p-10 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl text-white w-11/12 max-w-2xl border border-white/10">
          <h2 className="text-4xl font-bold mb-8 text-green-400 tracking-tight">Choose Your Grind Mode</h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            {Object.keys(modes).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="p-4 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-all duration-300 backdrop-blur-md border border-white/10 text-white font-semibold"
              >
                {m}{" "}
                {m === "Custom"
                  ? `(${customWork}m/${customBreak}m)`
                  : `(${modes[m].work / 60}m/${modes[m].break / 60}m)`}
              </button>
            ))}
          </div>
          {mode === "Custom" && (
            <div className="mb-8 flex space-x-6">
              <input
                type="number"
                min="1"
                value={customWork}
                onChange={(e) => setCustomWork(Math.max(1, parseInt(e.target.value) || 1))}
                className="p-3 bg-transparent border-b border-white/20 text-white w-24 placeholder-white/50 focus:outline-none focus:border-green-400 transition-all duration-200"
                placeholder="Work (min)"
              />
              <input
                type="number"
                min="1"
                value={customBreak}
                onChange={(e) => setCustomBreak(Math.max(1, parseInt(e.target.value) || 1))}
                className="p-3 bg-transparent border-b border-white/20 text-white w-24 placeholder-white/50 focus:outline-none focus:border-green-400 transition-all duration-200"
                placeholder="Break (min)"
              />
            </div>
          )}
          <div className="mb-8 flex items-center space-x-4">
            <label className="text-white font-medium">Sessions (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={sessions}
              onChange={(e) => setSessions(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
              className="p-3 bg-transparent border-b border-white/20 text-white w-16 placeholder-white/50 focus:outline-none focus:border-green-400 transition-all duration-200"
            />
          </div>
          <button
            onClick={() => setGrindModeActive(false)}
            className="p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-all duration-300 backdrop-blur-md border border-white/10 w-full text-red-400 font-semibold flex items-center justify-center"
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black font-sans">
      <div className="p-10 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl text-white w-11/12 max-w-4xl border border-white/10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-green-400 tracking-tight">{mode} Grind</h2>
          <div className="flex flex-wrap gap-2">
            {Object.keys(modes).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setTimeLeft(modes[m].work);
                  setCurrentPeriod("work");
                }}
                className={`px-3 py-1 rounded-lg text-sm backdrop-blur-md border border-white/10 ${
                  mode === m ? "bg-green-500/20" : "bg-green-500/10"
                } hover:bg-green-500/20 transition-all duration-200 text-white font-medium`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-16 mb-10">
          <div className="w-52">
            <CircularProgressbar
              value={sessionProgress}
              text={formatTime(timeLeft)}
              styles={buildStyles({
                pathColor: currentPeriod === "work" ? "#10B981" : "#3B82F6",
                textColor: "#E5E7EB",
                trailColor: "rgba(255, 255, 255, 0.1)",
                textSize: "16px",
              })}
            />
            <p className="text-center text-sm text-white/80 mt-2">
              {currentPeriod === "work" ? "Work" : "Break"}
            </p>
          </div>
          <div className="w-52">
            <CircularProgressbar
              value={overallProgress}
              text={`${Math.round(overallProgress)}%`}
              styles={buildStyles({
                pathColor: "#EF4444",
                textColor: "#E5E7EB",
                trailColor: "rgba(255, 255, 255, 0.1)",
                textSize: "16px",
              })}
            />
            <p className="text-center text-sm text-white/80 mt-2">Overall</p>
          </div>
        </div>
        <div className="flex justify-center space-x-2 mb-8">
          {Array.from({ length: sessions }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i + 1 < currentSession
                  ? "bg-green-500"
                  : i + 1 === currentSession
                  ? "bg-green-500 animate-pulse"
                  : "bg-gray-500/50"
              }`}
            />
          ))}
        </div>
        <p className="text-xl mb-6 text-center text-white font-medium">
          {currentPeriod === "work"
            ? `Focusing on: ${selectedTask.title}`
            : "Break Time - Stretch or Recharge!"}
        </p>
        <QuoteDisplay period={currentPeriod} />
        <div className="flex justify-center space-x-6 mt-8">
          <button
            onClick={() => setShowTaskPopup(true)}
            className="p-4 bg-blue-500/10 rounded-full hover:bg-blue-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
            title="Manage Tasks"
          >
            <FaTasks size={22} color="#E5E7EB" />
          </button>
          <button
            onClick={playSpotify}
            className="p-4 bg-green-500/10 rounded-full hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
            title="Play Music"
          >
            <FaSpotify size={22} color="#E5E7EB" />
          </button>
          {!isRunning ? (
            <button
              onClick={startGrind}
              className="p-4 bg-green-500/10 rounded-full hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
              title="Start Grinding"
            >
              <FaPlay size={22} color="#E5E7EB" />
            </button>
          ) : isPaused ? (
            <button
              onClick={resumeGrind}
              className="p-4 bg-green-500/10 rounded-full hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
              title="Resume"
            >
              <FaPlay size={22} color="#E5E7EB" />
            </button>
          ) : (
            <button
              onClick={pauseGrind}
              className="p-4 bg-yellow-500/10 rounded-full hover:bg-yellow-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
              title="Pause"
            >
              <FaPause size={22} color="#E5E7EB" />
            </button>
          )}
          <button
            onClick={skipToNext}
            className="p-4 bg-purple-500/10 rounded-full hover:bg-purple-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
            title="Skip to Next"
          >
            <FaForward size={22} color="#E5E7EB" />
          </button>
          <button
            onClick={completeTask}
            className="p-4 bg-green-500/10 rounded-full hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
            title="Complete Task"
          >
            <FaCheck size={22} color="#E5E7EB" />
          </button>
          <button
            onClick={() => setGrindModeActive(false)}
            className="p-4 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md border border-white/10"
            title="Exit Grind Mode"
          >
            <FaTimes size={22} color="#E5E7EB" />
          </button>
        </div>
      </div>

      {showTaskPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="p-8 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl w-1/2 max-h-[80vh] overflow-y-auto border border-white/10">
            <h3 className="text-2xl font-bold text-green-400 mb-6 tracking-tight">Task Management</h3>
            <div className="space-y-4 mb-6">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <span
                    className={task.completed ? "line-through text-gray-400" : "text-white cursor-pointer"}
                    onClick={() => setSelectedTask(task)}
                  >
                    {task.title} ({task.category}, {task.priority})
                  </span>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() =>
                      setTasks((prev) =>
                        prev.map((t) =>
                          t.id === task.id ? { ...t, completed: !t.completed } : t
                        )
                      )
                    }
                    className="form-checkbox h-5 w-5 text-green-400 bg-transparent border-white/20"
                  />
                </div>
              ))}
            </div>
            <div className="mb-6">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="New task title"
                className="p-3 bg-transparent border-b border-white/20 text-white w-full mb-4 placeholder-white/50 focus:outline-none focus:border-green-400 transition-all duration-200"
              />
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="p-3 bg-transparent border-b border-white/20 text-white w-full mb-4 focus:outline-none focus:border-green-400 transition-all duration-200"
              >
                <option>Work</option>
                <option>Fitness</option>
                <option>Personal Growth</option>
              </select>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="p-3 bg-transparent border-b border-white/20 text-white w-full mb-4 focus:outline-none focus:border-green-400 transition-all duration-200"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button
                onClick={addTask}
                className="p-3 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-all duration-200 backdrop-blur-md border border-white/10 w-full text-green-400 font-semibold"
              >
                Add Task
              </button>
            </div>
            <button
              onClick={() => setShowTaskPopup(false)}
              className="p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-all duration-200 backdrop-blur-md border border-white/10 w-full text-red-400 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrindMode;