import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navigation = ({ setGrindModeActive }) => {
  const navigate = useNavigate();

  const handleGrindModeClick = () => {
    // Redirect to Tasks page instead of setting grindModeActive directly
    navigate("/tasks");
  };

  return (
    <div className="w-1/5 p-6 fixed h-full glass flex flex-col">
      <h1 className="text-2xl font-bold text-neon-green mb-8">PeaZhub</h1>
      <nav className="flex-1">
        <ul>
          <li>
            <NavLink to="/" className="glass-hover block px-4 py-2">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className="glass-hover block px-4 py-2">Tasks</NavLink>
          </li>
          <li>
            <NavLink to="/habits" className="glass-hover block px-4 py-2">Habits</NavLink>
          </li>
          <li>
            <NavLink to="/goals" className="glass-hover block px-4 py-2">Goals</NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className="glass-hover block px-4 py-2">Analytics</NavLink>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleGrindModeClick}
        className="btn-glass bg-red-500/20 text-black"
      >
        Grind Mode
      </button>
    </div>
  );
};

export default Navigation;