import React, { useState, useEffect } from "react";

const GrindMode = ({ setGrindModeActive }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <p className="text-6xl font-bold">
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </p>
      <button
        onClick={() => setGrindModeActive(false)}
        className="mt-8 p-2 bg-red-500 rounded glow-red"
      >
        Exit
      </button>
    </div>
  );
};

export default GrindMode;