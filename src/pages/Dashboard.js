import React from "react";
import QuoteDisplay from "../components/QuoteDisplay";

const Dashboard = () => {
  return (
    <div className="p-6 ml-[20%]">
      <h1 className="text-3xl text-neon-green">Welcome to PeaZhub</h1> {/* Test text */}
      <QuoteDisplay />
    </div>
  );
};

export default Dashboard;