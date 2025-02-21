import React from "react";

const quotes = [
  "The road to power is paved with hypocrisy, and casualties. Never regret.",
  "I have zero tolerance for betrayal, which they will soon indelibly learn.",
  "Success is a mixture of preparation and luck. I make my own luck.",
  "Power is the old stone building that stands for centuries.",
  "You don’t beg for success. You take it.",
];

const QuoteDisplay = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <div className="text-center py-10">
      <p className="text-3xl italic text-neon-green">"{quote}"</p>
    </div>
  );
};

export default QuoteDisplay;