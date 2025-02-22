import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaTasks, FaPlay, FaCheck, FaTimes, FaSpotify } from "react-icons/fa";
import QuoteDisplay from "./QuoteDisplay";
import { useData } from "../context/DataContext";

const GrindMode = ({ selectedTask, setGrindModeActive }) => {
  const { tasks, setTasks } = useData();
  const [mode, setMode] = useState(null);
  const [sessions, setSessions] = useState(1);
  const [currentSession, setCurrentSession] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(selectedTask.timeSpent || 0);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Work");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");

  const modes = {
    Standard: { focus: 25 * 60, break: 5 * 60 },
    Eisenhower: { focus: 25 * 60, break: 5 * 60 },
    Monk: { focus: 90 * 60, break: 30 * 60 },
    Sprint: { focus: 15 * 60, break: 5 * 60 },
    DeepWork: { focus: 120 * 60, break: 40 * 60 },
    Flow: { focus: 52 * 60, break: 17 * 60 },
  };

  const sessionDuration = mode ? modes[mode].focus : 0;
  const totalTime = sessionDuration * sessions;
  const sessionProgress = sessionDuration ? (1 - timeLeft / sessionDuration) * 100 : 0;
  const overallProgress = totalTime
    ? ((currentSession - 1) * sessionDuration + (sessionDuration - timeLeft)) / totalTime * 100
    : 0;

  // Initialize timeLeft when mode changes
  useEffect(() => {
    if (mode && !isRunning && timeLeft === 0) {
      setTimeLeft(modes[mode].focus);
    }
  }, [mode]);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          setTimeSpent((prev) => {
            const newTime = prev + 1;
            setTasks((prevTasks) =>
              prevTasks.map((t) => (t.id === selectedTask.id ? { ...t, timeSpent: newTime } : t))
            );
            return newTime;
          });
          return prev - 1;
        }
        if (currentSession < sessions) {
          setCurrentSession((prev) => prev + 1);
          return modes[mode].focus;
        }
        setIsRunning(false);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, currentSession, sessions, selectedTask, setTasks]);

  const startGrind = () => {
    if (!mode) return;
    if (timeLeft === 0) setTimeLeft(modes[mode].focus);
    setIsRunning(true);
  };

  const completeTask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === selectedTask.id ? { ...t, completed: true } : t))
    );
    setGrindModeActive(false);
  };

  const addTask = () => {
    if (newTaskTitle) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTaskTitle,
          category: newTaskCategory,
          priority: newTaskPriority,
          completed: false,
          timeSpent: 0,
        },
      ]);
      setNewTaskTitle("");
    }
  };

  const playSpotify = () => {
    // Simulate Spotify playback (requires OAuth token and Web Playback SDK for full implementation)
    console.log("Playing motivational playlist on Spotify...");
    // Example: Fetch a playlist (requires Spotify API setup)
    // const token = "YOUR_SPOTIFY_ACCESS_TOKEN"; // Replace with actual token
    // fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DX9gG9wbF8eCL", {
    //   headers: { Authorization: `Bearer ${token}` },
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log("Playing:", data.name))
    //   .catch((err) => console.error("Spotify Error:", err));
    alert("Spotify integration triggered! Add OAuth and Web Playback SDK for full playback.");
  };

  if (!mode) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="glass p-8 shadow-lg text-center w-2/3">
          <h2 className="text-2xl font-bold text-neon-green mb-6">Choose Grind Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button onClick={() => setMode("Standard")} className="btn-glass bg-neon-green/20">
              Standard (25m)
            </button>
            <button onClick={() => setMode("Eisenhower")} className="btn-glass bg-neon-green/20">
              Eisenhower (25m)
            </button>
            <button onClick={() => setMode("Monk")} className="btn-glass bg-neon-green/20">
              Monk (1:30h)
            </button>
            <button onClick={() => setMode("Sprint")} className="btn-glass bg-neon-green/20">
              Sprint (15m)
            </button>
            <button onClick={() => setMode("DeepWork")} className="btn-glass bg-neon-green/20">
              Deep Work (2h)
            </button>
            <button onClick={() => setMode("Flow")} className="btn-glass bg-neon-green/20">
              Flow (52m)
            </button>
          </div>
          <div className="mb-6">
            <label className="text-gray-200 mr-4">Sessions (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={sessions}
              onChange={(e) => setSessions(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
              className="p-2 bg-transparent border-b border-white/20 text-gray-200 w-16"
            />
          </div>
          <button onClick={() => setGrindModeActive(false)} className="btn-glass bg-red-500/20">
            <FaTimes className="inline mr-2" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="glass p-8 shadow-lg text-center w-2/3">
        <h2 className="text-2xl font-bold text-neon-green mb-4">{mode} Grind</h2>
        <div className="flex justify-center space-x-4 mb-6">
          <button onClick={() => setMode("Standard")} className="btn-glass bg-neon-green/20">
            Standard
          </button>
          <button onClick={() => setMode("Eisenhower")} className="btn-glass bg-neon-green/20">
            Eisenhower
          </button>
          <button onClick={() => setMode("Monk")} className="btn-glass bg-neon-green/20">
            Monk
          </button>
          <button onClick={() => setMode("Sprint")} className="btn-glass bg-neon-green/20">
            Sprint
          </button>
          <button onClick={() => setMode("DeepWork")} className="btn-glass bg-neon-green/20">
            Deep Work
          </button>
          <button onClick={() => setMode("Flow")} className="btn-glass bg-neon-green/20">
            Flow
          </button>
        </div>
        <p className="text-lg font-semibold text-gray-200 mb-2">{selectedTask.title}</p>
        <div className="flex justify-center space-x-2 mb-4">
          <span className="text-sm text-blue-400">{selectedTask.category}</span>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              selectedTask.priority === "High"
                ? "priority-high"
                : selectedTask.priority === "Medium"
                ? "priority-medium"
                : "priority-low"
            }`}
          >
            {selectedTask.priority}
          </span>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <div>
            <CircularProgressbar
              value={sessionProgress}
              text={`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
              styles={buildStyles({
                pathColor: "#10B981",
                textColor: "#E5E7EB",
                trailColor: "rgba(255, 255, 255, 0.1)",
                textSize: "16px",
              })}
            />
            <p className="text-sm text-gray-400 mt-2">Session {currentSession}/{sessions}</p>
          </div>
          <div>
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
            <p className="text-sm text-gray-400 mt-2">Overall Progress</p>
          </div>
        </div>
        <div className="flex justify-center space-x-2 mb-6">
          {Array.from({ length: sessions }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i < currentSession ? "bg-neon-green" : "bg-gray-500/20"}`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-400 mb-6">
          Total Time: {Math.floor(timeSpent / 3600)}h {Math.floor((timeSpent % 3600) / 60)}m {timeSpent % 60}s
        </p>
        <QuoteDisplay />
        <div className="space-y-4">
          <button
            onClick={() => setShowTaskPopup(true)}
            className="btn-glass bg-blue-500/20 flex items-center justify-center"
          >
            <FaTasks className="mr-2" /> Manage Tasks
          </button>
          <button
            onClick={playSpotify}
            className="btn-glass bg-spotify-green/20 flex items-center justify-center"
          >
            <FaSpotify className="mr-2" /> Play Music
          </button>
          {!isRunning ? (
            <button
              onClick={startGrind}
              className="btn-glass bg-green-500/20 flex items-center justify-center"
            >
              <FaPlay className="mr-2" /> Start Grinding
            </button>
          ) : (
            <button
              onClick={completeTask}
              className="btn-glass bg-green-500/20 flex items-center justify-center"
            >
              <FaCheck className="mr-2" /> Complete Task
            </button>
          )}
          <button
            onClick={() => setGrindModeActive(false)}
            className="btn-glass bg-red-500/20 flex items-center justify-center"
          >
            <FaTimes className="mr-2" /> Exit Grind Mode
          </button>
        </div>
      </div>

      {showTaskPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="glass p-6 shadow-lg w-1/2">
            <h3 className="text-xl font-bold text-neon-green mb-4">Task Management</h3>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <span className={task.completed ? "line-through text-gray-400" : "text-gray-200"}>
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
                    className="form-checkbox h-5 w-5 text-neon-green"
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
                className="p-2 bg-transparent border-b border-white/20 text-gray-200 w-full mb-2"
              />
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="p-2 bg-transparent border-b border-white/20 text-gray-200 w-full mb-2"
              >
                <option>Work</option>
                <option>Fitness</option>
                <option>Personal Growth</option>
              </select>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="p-2 bg-transparent border-b border-white/20 text-gray-200 w-full mb-2"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button onClick={addTask} className="btn-glass bg-red-500/20 w-full">
                Add Task
              </button>
            </div>
            <button
              onClick={() => setShowTaskPopup(false)}
              className="btn-glass bg-red-500/20 w-full"
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