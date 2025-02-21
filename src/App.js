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

  return (
    <DataProvider>
      <Router>
        <div className="flex min-h-screen bg-black text-white">
          {!grindModeActive && <Navigation setGrindModeActive={setGrindModeActive} />}
          <div className="flex-1">
            {grindModeActive ? (
              <GrindMode setGrindModeActive={setGrindModeActive} />
            ) : (
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/habits" element={<HabitsPage />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="*" element={<div className="p-6 ml-[20%]">Page Not Found</div>} /> {/* Fallback */}
              </Routes>
            )}
          </div>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;