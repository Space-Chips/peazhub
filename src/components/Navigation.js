import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTasks,
  FaCalendarCheck,
  FaBullseye,
  FaChartBar,
  FaDumbbell,
} from "react-icons/fa";

const Navigation = ({ setGrindModeActive }) => {
  const navigate = useNavigate();

  const handleGrindModeClick = () => {
    navigate("/tasks");
    // Optionally, setGrindModeActive(true) here if you want to trigger Grind Mode directly
  };

  const navItems = [
    { path: "/", icon: <FaHome size={28} />, title: "Dashboard" },
    { path: "/tasks", icon: <FaTasks size={28} />, title: "Tasks" },
    { path: "/habits", icon: <FaCalendarCheck size={28} />, title: "Habits" },
    { path: "/goals", icon: <FaBullseye size={28} />, title: "Goals" },
    { path: "/analytics", icon: <FaChartBar size={28} />, title: "Analytics" },
    { onClick: handleGrindModeClick, icon: <FaDumbbell size={28} />, title: "Grind Mode" },
  ];

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center">
      <div className="bg-gray-900/50 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl py-4 px-8 max-w-xl w-full">
        <div className="flex justify-around items-center">
          {navItems.map((item, index) =>
            item.path ? (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `p-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                    isActive ? "text-green-400 bg-green-500/30" : "text-white hover:bg-green-500/20"
                  }`
                }
                title={item.title}
              >
                {item.icon}
              </NavLink>
            ) : (
              <button
                key={index}
                onClick={item.onClick}
                className="p-4 rounded-full text-white hover:bg-green-500/20 transition-all duration-300 transform hover:scale-125"
                title={item.title}
              >
                {item.icon}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};


export default Navigation;