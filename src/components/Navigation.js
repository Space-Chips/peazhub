import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = ({ setGrindModeActive }) => {
  return (
    <div className="w-1/5 bg-gray-900 p-4 fixed h-full">
      <h1 className="text-2xl font-bold text-red-500 mb-6">PeaZhub</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink to="/" className="hover-neon-green">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/tasks" className="hover-neon-green">Tasks</NavLink>
          </li>
          <li>
            <NavLink to="/habits" className="hover-neon-green">Habits</NavLink>
          </li>
          <li>
            <NavLink to="/goals" className="hover-neon-green">Goals</NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className="hover-neon-green">Analytics</NavLink>
          </li>
        </ul>
      </nav>
      <button
        onClick={() => setGrindModeActive(true)}
        className="mt-6 w-full p-2 bg-red-500 rounded glow-red"
      >
        Grind Mode
      </button>
    </div>
  );
};

export default Navigation;