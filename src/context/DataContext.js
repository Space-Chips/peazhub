import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [habits, setHabits] = useState(() => JSON.parse(localStorage.getItem("habits")) || []);
  const [goals, setGoals] = useState(() => JSON.parse(localStorage.getItem("goals")) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [tasks, habits, goals]);

  const value = { tasks, setTasks, habits, setHabits, goals, setGoals };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};