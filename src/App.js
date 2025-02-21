import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
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
    }
    // If no task, Navigation will handle redirection
  };

  return (
    <DataProvider>
      <Router>
        <div className="flex min-h-screen">
          {!grindModeActive && <Navigation setGrindModeActive={handleGrindMode} />}
          <div className="flex-1 container">
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
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;