import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import GrindMode from "./components/GrindMode";
import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import HabitsPage from "./pages/HabitsPage";
import GoalsPage from "./pages/GoalsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { DataProvider } from "./context/DataContext";

const App = () => {
  const [grindModeActive, setGrindModeActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleGrindMode = (task) => {
    if (task) {
      setSelectedTask(task);
      setGrindModeActive(true);
    } else {
      console.log("No task provided, staying on current page.");
    }
  };

  return (
    <DataProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-black font-sans">
          {/* RELENTLESS Title */}
          {!grindModeActive && (
            <div className="fixed top-0 left-0 right-0 py-4 z-50">
              <h1 className="text-3xl font-bold text-white tracking-widest text-center">
                R E L E N T L E S S
              </h1>
            </div>
          )}
          {/* Main Content */}
          <div className="flex-1 p-6 pt-20">
            {grindModeActive && selectedTask ? (
              <GrindMode
                selectedTask={selectedTask}
                setGrindModeActive={setGrindModeActive}
              />
            ) : (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<TasksPage setGrindModeActive={handleGrindMode} />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Routes>
            )}
          </div>
          {/* Bottom Dock */}
          {!grindModeActive && (
            <Navigation setGrindModeActive={handleGrindMode} />
          )}
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;