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
  FaPalette,
  FaLock,
} from "react-icons/fa";
import { useData } from "../context/DataContext";

// Placeholder for QuoteDisplay
const QuoteDisplay = ({ period, theme }) => {
  const quotes = {
    work: "Make America Great Again - Work Hard!",
    break: "Freedom is taking a break, patriot!",
    freedom: "Lock in, patriot - no distractions, pure focus!",
  };
  return (
    <p className={`text-lg italic ${theme?.textColorMuted || "text-gray-500"} text-center mb-6`}>
      "{quotes[period] || "Keep pushing forward, American style."}"
    </p>
  );
};

// Theme definitions (fully defined as before)
const themes = {
  Basic: {
    name: "Basic",
    gradientFrom: "from-gray-800",
    gradientTo: "to-gray-900",
    cardBg: "bg-gray-900/60",
    primaryColor: "text-green-400",
    primaryBgLight: "bg-green-500/10",
    primaryBgMedium: "bg-green-500/20",
    secondaryColor: "text-blue-400",
    secondaryBgLight: "bg-blue-500/10",
    secondaryBgMedium: "bg-blue-500/20",
    accentColor: "text-purple-400",
    accentBgLight: "bg-purple-500/10",
    accentBgMedium: "bg-purple-500/20",
    dangerColor: "text-red-400",
    dangerBgLight: "bg-red-500/10",
    dangerBgMedium: "bg-red-500/20",
    warningColor: "text-yellow-400",
    warningBgLight: "bg-yellow-500/10",
    warningBgMedium: "bg-yellow-500/20",
    borderColor: "border-white/10",
    textColor: "text-white",
    textColorMuted: "text-white/80",
    progressColors: {
      work: "#10B981",
      break: "#3B82F6",
      overall: "#EF4444",
    },
  },
  Cyberpunk: {
    name: "Cyberpunk",
    gradientFrom: "from-purple-900",
    gradientTo: "to-fuchsia-900",
    cardBg: "bg-slate-900/70",
    primaryColor: "text-cyan-400",
    primaryBgLight: "bg-cyan-500/10",
    primaryBgMedium: "bg-cyan-500/20",
    secondaryColor: "text-fuchsia-400",
    secondaryBgLight: "bg-fuchsia-500/10",
    secondaryBgMedium: "bg-fuchsia-500/20",
    accentColor: "text-yellow-400",
    accentBgLight: "bg-yellow-500/10",
    accentBgMedium: "bg-yellow-500/20",
    dangerColor: "text-red-500",
    dangerBgLight: "bg-red-500/10",
    dangerBgMedium: "bg-red-500/20",
    warningColor: "text-orange-400",
    warningBgLight: "bg-orange-500/10",
    warningBgMedium: "bg-orange-500/20",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-50",
    textColorMuted: "text-cyan-100/70",
    progressColors: {
      work: "#06B6D4",
      break: "#D946EF",
      overall: "#FACC15",
    },
  },
  Patriotic: {
    name: "American Patriotism",
    gradientFrom: "from-red-700",
    gradientTo: "to-blue-900",
    cardBg: "bg-white/80",
    primaryColor: "text-red-600",
    primaryBgLight: "bg-red-600/20",
    primaryBgMedium: "bg-red-600/40",
    secondaryColor: "text-blue-700",
    secondaryBgLight: "bg-blue-700/20",
    secondaryBgMedium: "bg-blue-700/40",
    accentColor: "text-white",
    accentBgLight: "bg-white/20",
    accentBgMedium: "bg-white/40",
    dangerColor: "text-red-800",
    dangerBgLight: "bg-red-800/20",
    dangerBgMedium: "bg-red-800/40",
    warningColor: "text-yellow-600",
    warningBgLight: "bg-yellow-600/20",
    warningBgMedium: "bg-yellow-600/40",
    borderColor: "border-blue-700/30",
    textColor: "text-blue-900",
    textColorMuted: "text-blue-700/70",
    progressColors: {
      work: "#DC2626",
      break: "#1D4ED8",
      overall: "#FFFFFF",
    },
  },
  Nature: {
    name: "Nature",
    gradientFrom: "from-green-900",
    gradientTo: "to-emerald-900",
    cardBg: "bg-emerald-950/70",
    primaryColor: "text-emerald-400",
    primaryBgLight: "bg-emerald-500/10",
    primaryBgMedium: "bg-emerald-500/20",
    secondaryColor: "text-amber-400",
    secondaryBgLight: "bg-amber-500/10",
    secondaryBgMedium: "bg-amber-500/20",
    accentColor: "text-teal-400",
    accentBgLight: "bg-teal-500/10",
    accentBgMedium: "bg-teal-500/20",
    dangerColor: "text-rose-400",
    dangerBgLight: "bg-rose-500/10",
    dangerBgMedium: "bg-rose-500/20",
    warningColor: "text-amber-400",
    warningBgLight: "bg-amber-500/10",
    warningBgMedium: "bg-amber-500/20",
    borderColor: "border-emerald-500/20",
    textColor: "text-emerald-50",
    textColorMuted: "text-emerald-100/70",
    progressColors: {
      work: "#10B981",
      break: "#78716C",
      overall: "#F59E0B",
    },
  },
  Midnight: {
    name: "Midnight",
    gradientFrom: "from-slate-900",
    gradientTo: "to-indigo-950",
    cardBg: "bg-slate-950/80",
    primaryColor: "text-indigo-400",
    primaryBgLight: "bg-indigo-500/10",
    primaryBgMedium: "bg-indigo-500/20",
    secondaryColor: "text-violet-400",
    secondaryBgLight: "bg-violet-500/10",
    secondaryBgMedium: "bg-violet-500/20",
    accentColor: "text-sky-400",
    accentBgLight: "bg-sky-500/10",
    accentBgMedium: "bg-sky-500/20",
    dangerColor: "text-rose-400",
    dangerBgLight: "bg-rose-500/10",
    dangerBgMedium: "bg-rose-500/20",
    warningColor: "text-amber-400",
    warningBgLight: "bg-amber-500/10",
    warningBgMedium: "bg-amber-500/20",
    borderColor: "border-indigo-500/20",
    textColor: "text-slate-100",
    textColorMuted: "text-slate-300/70",
    progressColors: {
      work: "#6366F1",
      break: "#A78BFA",
      overall: "#38BDF8",
    },
  },
};

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
  const [showThemePopup, setShowThemePopup] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Work");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [currentTheme, setCurrentTheme] = useState("Basic");
  const [freedomModeActive, setFreedomModeActive] = useState(false);
  const [blockedSites, setBlockedSites] = useState([
    "youtube.com",
    "facebook.com",
    "twitter.com",
    "instagram.com",
    "tiktok.com",
  ]);
  const [customSite, setCustomSite] = useState("");

  const modes = {
    Standard: { work: 25 * 60, break: 5 * 60 },
    Eisenhower: { work: 25 * 60, break: 5 * 60 },
    Monk: { work: 90 * 60, break: 30 * 60 },
    Sprint: { work: 15 * 60, break: 5 * 60 },
    DeepWork: { work: 120 * 60, break: 40 * 60 },
    Flow: { work: 52 * 60, break: 17 * 60 },
    Freedom: { work: 50 * 60, break: 10 * 60 },
    Custom: { work: customWork * 60, break: customBreak * 60 },
  };

  const theme = themes[currentTheme] || themes.Basic;
  const sessionDuration = mode ? modes[mode][currentPeriod] : 0;
  const totalWorkTime = mode ? modes[mode].work * sessions : 0;
  const sessionProgress = sessionDuration ? (1 - timeLeft / sessionDuration) * 100 : 0;
  const overallProgress = totalWorkTime
    ? ((currentSession - 1) * modes[mode].work +
        (currentPeriod === "work" ? modes[mode].work - timeLeft : 0)) /
      totalWorkTime *
      100
    : 0;

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + "h " : ""}${m > 0 ? m + "m " : ""}${s}s`;
  };

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
              t.id === selectedTask.id
                ? {
                    ...t,
                    timeSpent: (t.timeSpent || 0) + 1,
                    sessions: [
                      ...(t.sessions || []),
                      { timestamp: new Date().toISOString(), duration: 1 },
                    ],
                  }
                : t
            )
          );
        }
        return prev - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeLeft, mode, currentSession, sessions, currentPeriod, selectedTask, setTasks]);
  const startGrind = () => {
    if (!mode) return;
    if (timeLeft === 0) setTimeLeft(modes[mode].work);
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseGrind = () => setIsPaused(true);
  const resumeGrind = () => setIsPaused(false);

  const skipToNext = () => {
    if (freedomModeActive) return;
    setTimeLeft(0);
  };

  const completeTask = () => {
    if (freedomModeActive) return;
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? { ...t, completed: true } : t))
      );
    }
    setGrindModeActive(null);
  };

  const addTask = () => {
    if (newTaskTitle) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        category: newTaskCategory,
        priority: newTaskPriority,
        completed: false,
        timeSpent: 0,
        board: "toDo",
      };
      setTasks((prev) => [...prev, newTask]);
      setNewTaskTitle("");
      setShowTaskPopup(false);
    }
  };

  const playSpotify = () => {
    if (freedomModeActive) return;
    console.log("Playing patriotic playlist on Spotify...");
    alert("Spotify playback simulated - Imagine 'Sweet Home Alabama'!");
  };

  const addBlockedSite = () => {
    if (customSite && !blockedSites.includes(customSite)) {
      setBlockedSites((prev) => [...prev, customSite]);
      setCustomSite("");
    }
  };

  const removeBlockedSite = (site) => {
    setBlockedSites((prev) => prev.filter((s) => s !== site));
  };

  const simulateWebsiteAccess = (site) => {
    if (freedomModeActive && blockedSites.includes(site)) {
      alert(`Access to ${site} is blocked during Freedom mode! Stay focused, patriot!`);
    } else {
      alert(`Navigating to ${site} (simulated - no actual navigation occurs).`);
    }
  };

  const trumpImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/120px-Donald_Trump_official_portrait.jpg";
  const eagleImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bald_Eagle_%28Haliaeetus_leucocephalus%29_%2814038914085%29.jpg/120px-Bald_Eagle_%28Haliaeetus_leucocephalus%29_%2814038914085%29.jpg";

  if (!mode) {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} font-sans`}
        style={
          currentTheme === "Patriotic"
            ? {
                backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
              }
            : {}
        }
      >
        <div
          className={`p-10 ${theme.cardBg} backdrop-blur-xl rounded-2xl shadow-2xl ${theme.textColor} w-11/12 max-w-2xl border ${theme.borderColor}`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-4xl font-bold ${theme.primaryColor} tracking-tight`}>
              {currentTheme === "Patriotic" ? (
                <span>
                  Choose Your <span className="text-white">American</span> Grind Mode{" "}
                  <img src={eagleImage} alt="Eagle" className="inline w-8 h-8" />
                </span>
              ) : (
                "Choose Your Grind Mode"
              )}
            </h2>
            <button
              onClick={() => setShowThemePopup(true)}
              className={`p-2 ${theme.accentBgLight} rounded-lg hover:${theme.accentBgMedium} transition-all duration-200 ${theme.borderColor}`}
              title="Change Theme"
            >
              <FaPalette size={20} className={theme.accentColor} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            {Object.keys(modes).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`p-4 ${theme.primaryBgLight} rounded-xl hover:${theme.primaryBgMedium} transition-all duration-300 backdrop-blur-md border ${theme.borderColor} ${theme.textColor} font-semibold`}
              >
                {m}{" "}
                {m === "Custom"
                  ? `(${customWork}m/${customBreak}m)`
                  : `(${modes[m].work / 60}m/${modes[m].break / 60}m)`}
                {m === "Freedom" && (
                  <FaLock className="inline ml-2" size={16} />
                )}
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
                className={`p-3 bg-transparent border-b border-white/20 ${theme.textColor} w-24 placeholder-white/50 focus:outline-none focus:border-${theme.primaryColor.replace(
                  "text-",
                  ""
                )} transition-all duration-200`}
                placeholder="Work (min)"
              />
              <input
                type="number"
                min="1"
                value={customBreak}
                onChange={(e) => setCustomBreak(Math.max(1, parseInt(e.target.value) || 1))}
                className={`p-3 bg-transparent border-b border-white/20 ${theme.textColor} w-24 placeholder-white/50 focus:outline-none focus:border-${theme.primaryColor.replace(
                  "text-",
                  ""
                )} transition-all duration-200`}
                placeholder="Break (min)"
              />
            </div>
          )}
          <div className="mb-8 flex items-center space-x-4">
            <label className={`${theme.textColor} font-medium`}>Sessions (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={sessions}
              onChange={(e) => setSessions(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
              className={`p-3 bg-transparent border-b border-white/20 ${theme.textColor} w-16 placeholder-white/50 focus:outline-none focus:border-${theme.primaryColor.replace(
                "text-",
                ""
              )} transition-all duration-200`}
            />
          </div>
          {mode === "Freedom" && (
            <div className="mb-8">
              <h3 className={`text-xl font-semibold ${theme.primaryColor} mb-4`}>Blocked Websites</h3>
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  value={customSite}
                  onChange={(e) => setCustomSite(e.target.value)}
                  placeholder="Add site (e.g., reddit.com)"
                  className={`p-3 bg-transparent border-b border-white/20 ${theme.textColor} w-full placeholder-white/50 focus:outline-none focus:border-${theme.primaryColor.replace(
                    "text-",
                    ""
                  )} transition-all duration-200`}
                />
                <button
                  onClick={addBlockedSite}
                  className={`p-3 ${theme.primaryBgLight} rounded-xl hover:${theme.primaryBgMedium} transition-all duration-200 ${theme.borderColor} ${theme.primaryColor}`}
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {blockedSites.map((site) => (
                  <li key={site} className="flex justify-between items-center">
                    <span>{site}</span>
                    <button
                      onClick={() => removeBlockedSite(site)}
                      className={`${theme.dangerColor} hover:${theme.dangerBgLight} p-1 rounded`}
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => setGrindModeActive(null)}
            className={`p-3 ${theme.dangerBgLight} rounded-xl hover:${theme.dangerBgMedium} transition-all duration-300 backdrop-blur-md border ${theme.borderColor} w-full ${theme.dangerColor} font-semibold flex items-center justify-center`}
            style={
              currentTheme === "Patriotic"
                ? { backgroundImage: `url(${trumpImage})`, backgroundSize: "cover" }
                : {}
            }
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
        </div>

        {showThemePopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div
              className={`p-8 ${theme.cardBg} backdrop-blur-xl rounded-2xl shadow-2xl w-1/2 max-h-[80vh] overflow-y-auto border ${theme.borderColor}`}
            >
              <h3 className={`text-2xl font-bold ${theme.primaryColor} mb-6 tracking-tight`}>
                Choose Theme
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.keys(themes).map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => setCurrentTheme(themeName)}
                    className={`p-4 ${
                      currentTheme === themeName
                        ? theme.primaryBgMedium
                        : theme.primaryBgLight
                    } rounded-xl hover:${theme.primaryBgMedium} transition-all duration-200 backdrop-blur-md border ${
                      theme.borderColor
                    } ${theme.textColor} font-semibold`}
                  >
                    {themes[themeName].name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowThemePopup(false)}
                className={`p-3 ${theme.dangerBgLight} rounded-xl hover:${theme.dangerBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor} w-full ${theme.dangerColor} font-semibold`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {freedomModeActive && (
        <div
          className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center`}
          style={{ pointerEvents: "auto" }}
        >
          <div className={`text-center ${theme.textColor}`}>
            <h2 className={`text-4xl font-bold ${theme.primaryColor} mb-4`}>
              Freedom Mode Active <FaLock className="inline ml-2" size={24} />
            </h2>
            <p className="text-xl mb-6">
              Stay focused, patriot! Distractions like {blockedSites.join(", ")} are blocked.
            </p>
            <p className="text-lg italic">
              "You can't leave until the mission is complete!"
            </p>
          </div>
        </div>
      )}
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gradient-to-b ${theme.gradientFrom} ${theme.gradientTo} font-sans ${
          freedomModeActive ? "pointer-events-none" : ""
        }`}
        style={
          currentTheme === "Patriotic"
            ? {
                backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
              }
            : {}
        }
      >
        <div
          className={`p-10 ${theme.cardBg} backdrop-blur-xl rounded-2xl shadow-2xl ${theme.textColor} w-11/12 max-w-4xl border ${theme.borderColor}`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-4xl font-bold ${theme.primaryColor} tracking-tight`}>
              {currentTheme === "Patriotic" ? (
                <span>
                  {mode} Grind{" "}
                  <img src={eagleImage} alt="Eagle" className="inline w-8 h-8 ml-2" />
                </span>
              ) : (
                `${mode} Grind`
              )}
              {mode === "Freedom" && freedomModeActive && (
                <FaLock className="inline ml-2" size={24} />
              )}
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowThemePopup(true)}
                disabled={freedomModeActive}
                className={`p-2 ${theme.accentBgLight} rounded-lg hover:${theme.accentBgMedium} transition-all duration-200 ${theme.borderColor} ${
                  freedomModeActive ? "opacity-50 cursor-not-allowed" : ""
                }`}
                title="Change Theme"
              >
                <FaPalette size={20} className={theme.accentColor} />
              </button>
              {Object.keys(modes).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setTimeLeft(modes[m].work);
                    setCurrentPeriod("work");
                  }}
                  disabled={freedomModeActive}
                  className={`px-3 py-1 rounded-lg text-sm backdrop-blur-md border ${theme.borderColor} ${
                    mode === m ? theme.primaryBgMedium : theme.primaryBgLight
                  } hover:${theme.primaryBgMedium} transition-all duration-200 ${theme.textColor} font-medium ${
                    freedomModeActive ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center space-x-16 mb-10">
            <div className="w-52 relative">
              <CircularProgressbar
                value={sessionProgress}
                text={formatTime(timeLeft)}
                styles={buildStyles({
                  pathColor:
                    currentPeriod === "work" ? theme.progressColors.work : theme.progressColors.break,
                  textColor: theme.textColor.replace("text-", "#"),
                  trailColor: "rgba(255, 255, 255, 0.1)",
                  textSize: "16px",
                })}
              />
              {currentTheme === "Patriotic" && (
                <img
                  src={eagleImage}
                  alt="Eagle"
                  className="absolute top-0 left-0 w-12 h-12 -mt-6 -ml-6"
                />
              )}
              <p className={`text-center text-sm ${theme.textColorMuted} mt-2`}>
                {currentPeriod === "work" ? "Work" : "Break"}
              </p>
            </div>
            <div className="w-52">
              <CircularProgressbar
                value={overallProgress}
                text={`${Math.round(overallProgress)}%`}
                styles={buildStyles({
                  pathColor: theme.progressColors.overall,
                  textColor: theme.textColor.replace("text-", "#"),
                  trailColor: "rgba(255, 255, 255, 0.1)",
                  textSize: "16px",
                })}
              />
              <p className={`text-center text-sm ${theme.textColorMuted} mt-2`}>Overall</p>
            </div>
          </div>
          <div className="flex justify-center space-x-2 mb-8">
            {Array.from({ length: sessions }, (_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i + 1 < currentSession
                    ? theme.primaryColor.replace("text-", "bg-")
                    : i + 1 === currentSession
                    ? `${theme.primaryColor.replace("text-", "bg-")} animate-pulse`
                    : "bg-gray-500/50"
                }`}
              />
            ))}
          </div>
          <p className={`text-xl mb-6 text-center ${theme.textColor} font-medium`}>
            {currentPeriod === "work"
              ? `Focusing on: ${selectedTask ? selectedTask.title : "No Task Selected"}`
              : "Break Time - Stretch or Recharge, Patriot!"}
            {freedomModeActive && " (Distractions Blocked)"}
          </p>
          <QuoteDisplay period={freedomModeActive ? "freedom" : currentPeriod} theme={currentTheme} />
          {mode === "Freedom" && (
            <div className="mb-6">
              <p className={`text-sm ${theme.textColorMuted} text-center`}>
                Blocked Sites: {blockedSites.join(", ")}
              </p>
              <div className="flex justify-center space-x-4 mt-2">
                {blockedSites.slice(0, 3).map((site) => (
                  <button
                    key={site}
                    onClick={() => simulateWebsiteAccess(site)}
                    className={`p-2 ${theme.dangerBgLight} rounded-lg hover:${theme.dangerBgMedium} transition-all duration-200 ${theme.borderColor} ${theme.dangerColor}`}
                  >
                    Test {site}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-center space-x-6 mt-8">
            <button
              onClick={() => setShowTaskPopup(true)}
              disabled={freedomModeActive}
              className={`p-4 ${theme.secondaryBgLight} rounded-full hover:${theme.secondaryBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor} ${
                freedomModeActive ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Manage Tasks"
              style={
                currentTheme === "Patriotic"
                  ? { backgroundImage: `url(${trumpImage})`, backgroundSize: "cover" }
                  : {}
              }
            >
              <FaTasks size={22} className={theme.textColor} />
            </button>
            <button
              onClick={playSpotify}
              disabled={freedomModeActive}
              className={`p-4 ${theme.primaryBgLight} rounded-full hover:${theme.primaryBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor} ${
                freedomModeActive ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Play Music"
              style={
                currentTheme === "Patriotic"
                  ? { backgroundImage: `url(${trumpImage})`, backgroundSize: "cover" }
                  : {}
              }
            >
              <FaSpotify size={22} className={theme.textColor} />
            </button>
            {!isRunning ? (
              <button
                onClick={startGrind}
                className={`p-4 ${theme.primaryBgLight} rounded-full hover:${theme.primaryBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor}`}
                title="Start Grinding"
                style={
                  currentTheme === "Patriotic"
                    ? { backgroundImage: `url(${trumpImage})`, backgroundSize: "cover" }
                    : {}
                }
              >
                <FaPlay size={22} className={theme.textColor} />
              </button>
            ) : isPaused ? (
              <button
                onClick={resumeGrind}
                className={`p-4 ${theme.primaryBgLight} rounded-full hover:${theme.primaryBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor}`}
                title="Resume"
                style={
                  currentTheme === "Patriotic"
                    ? { backgroundImage: `url(${trumpImage})`, backgroundSize: "cover" }
                    : {}
                }
              >
                <FaPlay size={22} className={theme.textColor} />
              </button>
            ) : (
              <button
                onClick={pauseGrind}
                className={`p-4 ${theme.warningBgLight} rounded-full hover:${theme.warningBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor}`}
                title="Pause"
                style={
                  currentTheme === "Patriotic"
                    ? { backgroundImage: `url(${trumpImage})`, backgroundSize: "cover" }
                    : {}
                }
              >
                <FaPause size={22} className={theme.textColor} />
              </button>
            )}
            <button
              onClick={skipToNext}
              disabled={freedomModeActive}
              className={`p-4 ${theme.accentBgLight} rounded-full hover:${theme.accentBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor} ${
                freedomModeActive ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Skip to Next"
              style={
                currentTheme === "Patriotic"
                  ? { backgroundImage: `url(${trumpImage})`, backgroundSize: "cover" }
                  : {}
              }
            >
              <FaForward size={22} className={theme.textColor} />
            </button>
            <button
              onClick={completeTask}
              disabled={freedomModeActive}
              className={`p-4 ${theme.primaryBgLight} rounded-full hover:${theme.primaryBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor} ${
                freedomModeActive ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Complete Task"
              style={
                currentTheme === "Patriotic"
                  ? { backgroundImage: `url(${trumpImage})`, backgroundSize: "cover" }
                  : {}
              }
            >
              <FaCheck size={22} className={theme.textColor} />
            </button>
            <button
              onClick={() => setGrindModeActive(null)}
              disabled={freedomModeActive}
              className={`p-4 ${theme.dangerBgLight} rounded-full hover:${theme.dangerBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor} ${
                freedomModeActive ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Exit Grind Mode"
              style={
                currentTheme === "Patriotic"
                  ? { backgroundImage: `url(${trumpImage})`, backgroundSize: "cover" }
                  : {}
              }
            >
              <FaTimes size={22} className={theme.textColor} />
            </button>
          </div>
        </div>

        {showTaskPopup && !freedomModeActive && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div
              className={`p-8 ${theme.cardBg} backdrop-blur-xl rounded-2xl shadow-2xl w-1/2 max-h-[80vh] overflow-y-auto border ${theme.borderColor}`}
            >
              <h3 className={`text-2xl font-bold ${theme.primaryColor} mb-6 tracking-tight`}>
                Task Management
              </h3>
              <div className="space-y-4 mb-6">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <span
                      className={
                        task.completed
                          ? `line-through ${theme.textColorMuted}`
                          : `${theme.textColor} cursor-pointer`
                      }
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
                      className={`form-checkbox h-5 w-5 ${theme.primaryColor.replace(
                        "text-",
                        ""
                      )} bg-transparent border-white/20`}
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
                  className={`p-3 bg-transparent border-b border-white/20 ${theme.textColor} w-full mb-4 placeholder-white/50 focus:outline-none focus:border-${theme.primaryColor.replace(
                    "text-",
                    ""
                  )} transition-all duration-200`}
                />
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className={`p-3 bg-transparent border-b border-white/20 ${theme.textColor} w-full mb-4 focus:outline-none focus:border-${theme.primaryColor.replace(
                    "text-",
                    ""
                  )} transition-all duration-200`}
                >
                  <option>Work</option>
                  <option>Fitness</option>
                  <option>Personal Growth</option>
                </select>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className={`p-3 bg-transparent border-b border-white/20 ${theme.textColor} w-full mb-4 focus:outline-none focus:border-${theme.primaryColor.replace(
                    "text-",
                    ""
                  )} transition-all duration-200`}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <button
                  onClick={addTask}
                  className={`p-3 ${theme.primaryBgLight} rounded-xl hover:${theme.primaryBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor} w-full ${theme.primaryColor} font-semibold`}
                >
                  Add Task
                </button>
              </div>
              <button
                onClick={() => setShowTaskPopup(false)}
                className={`p-3 ${theme.dangerBgLight} rounded-xl hover:${theme.dangerBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor} w-full ${theme.dangerColor} font-semibold`}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showThemePopup && !freedomModeActive && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div
              className={`p-8 ${theme.cardBg} backdrop-blur-xl rounded-2xl shadow-2xl w-1/2 max-h-[80vh] overflow-y-auto border ${theme.borderColor}`}
            >
              <h3 className={`text-2xl font-bold ${theme.primaryColor} mb-6 tracking-tight`}>
                Choose Theme
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.keys(themes).map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => setCurrentTheme(themeName)}
                    className={`p-4 ${
                      currentTheme === themeName
                        ? theme.primaryBgMedium
                        : theme.primaryBgLight
                    } rounded-xl hover:${theme.primaryBgMedium} transition-all duration-200 backdrop-blur-md border ${
                      theme.borderColor
                    } ${theme.textColor} font-semibold`}
                  >
                    {themes[themeName].name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowThemePopup(false)}
                className={`p-3 ${theme.dangerBgLight} rounded-xl hover:${theme.dangerBgMedium} transition-all duration-200 backdrop-blur-md border ${theme.borderColor} w-full ${theme.dangerColor} font-semibold`}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GrindMode;