import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import QuoteDisplay from "./QuoteDisplay";
import { useData } from "../context/DataContext";

const GrindMode = ({ selectedTask, setGrindModeActive }) => {
  const { setTasks } = useData();
  const [mode, setMode] = useState(null);
  const [sessions, setSessions] = useState(1);
  const [currentSession, setCurrentSession] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeSpent, setTimeSpent] = useState(selectedTask.timeSpent || 0);

  const modes = {
    Standard: { focus: 25 * 60, break: 5 * 60 },
    Eisenhower: { focus: 25 * 60, break: 5 * 60 },
    Monk: { focus: 50 * 60, break: 0 },
  };

  const sessionDuration = modes[mode]?.focus || 0;
  const totalTime = sessionDuration * sessions;
  const sessionProgress = (1 - timeLeft / sessionDuration) * 100;
  const overallProgress = ((currentSession - 1) * sessionDuration + (sessionDuration - timeLeft)) / totalTime * 100;

  useEffect(() => {
    if (mode && !timeLeft) {
      setTimeLeft(modes[mode].focus);
    }

    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
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
          return 0;
        });
      }, 1000);
    } else if (timeLeft === 0 && currentSession < sessions) {
      setCurrentSession((prev) => prev + 1);
      setTimeLeft(modes[mode].focus);
    } else if (timeLeft === 0 && currentSession === sessions) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, currentSession, sessions, selectedTask, setTasks]);

  const startGrind = () => setIsRunning(true);

  if (!mode) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="glass p-8 shadow-lg text-center w-1/2">
          <h2 className="text-2xl font-bold text-neon-green mb-6">Choose Grind Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button onClick={() => setMode("Standard")} className="btn-glass bg-neon-green/20 text-neon-green">
              Standard (25m)
            </button>
            <button onClick={() => setMode("Eisenhower")} className="btn-glass bg-neon-green/20 text-neon-green">
              Eisenhower (25m)
            </button>
            <button onClick={() => setMode("Monk")} className="btn-glass bg-neon-green/20 text-neon-green">
              Monk Mode (50m)
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
          <button onClick={() => setGrindModeActive(false)} className="btn-glass bg-red-500/20 text-red-400">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="glass p-8 shadow-lg text-center w-1/2">
        <h2 className="text-2xl font-bold text-neon-green mb-4">{mode} Grind</h2>
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
        <p className="text-sm text-gray-400 mb-6">
          Total Time: {Math.floor(timeSpent / 3600)}h {Math.floor((timeSpent % 3600) / 60)}m {timeSpent % 60}s
        </p>
        <QuoteDisplay />
        {!isRunning && timeLeft === modes[mode].focus && (
          <button onClick={startGrind} className="mt-6 btn-glass bg-green-500/20 text-green-400">
            Start Grinding
          </button>
        )}
        <button
          onClick={() => setGrindModeActive(false)}
          className="mt-6 btn-glass bg-red-500/20 text-red-400"
        >
          Exit Grind Mode
        </button>
      </div>
    </div>
  );
};

export default GrindMode;