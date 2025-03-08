import React, { useState, useEffect } from "react";
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
  const [grindModeActive, setGrindModeActive] = useState(null);

  useEffect(() => {
    console.log("grindModeActive updated to:", grindModeActive);
    console.log("Should render GrindMode:", !!grindModeActive); // Log if GrindMode should show
  }, [grindModeActive]);

  const handleSetGrindModeActive = (task) => {
    console.log("setGrindModeActive called with:", task);
    setGrindModeActive(task);
  };

  return (
    <DataProvider>
      <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-black font-sans">
          {!grindModeActive && (
            <div className="fixed top-0 left-0 right-0 py-4 z-50">
              <h1 className="text-3xl font-bold text-white tracking-widest text-center">
                R E L E N T L E S S
              </h1>
            </div>
          )}
          <div className="flex-1 p-6 pt-20">
            {grindModeActive ? (
              <GrindMode
                selectedTask={grindModeActive}
                setGrindModeActive={setGrindModeActive}
              />
            ) : (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/tasks"
                  element={<TasksPage setGrindModeActive={handleSetGrindModeActive} />}
                />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
              </Routes>
            )}
          </div>
          {!grindModeActive && <Navigation />}
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;