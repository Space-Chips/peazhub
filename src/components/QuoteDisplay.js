import React from "react";

const quotes = [
  "While others sleep, I work. While others talk, I deliver. Mediocrity is for those who accept it.",
  "Your potential means nothing. Your output means everything.",
  "Discipline isn't a choice, it's the only path that leads to power.",
  "The difference between success and failure? I don't recognize the option of failure.",
  "Don't tell me about your dreams. Show me your calendar, your calluses, and your results.",
  "Work until your signature becomes an autograph worth paying for.",
  "Your competition isn't the problem. Your willingness to settle for average is.",
  "The world is full of talented failures. Talent without relentless work is worthless.",
  "Don't count the hours. Make the hours count. Then double them.",
  "Comfort is the poison that kills ambition. Choose discomfort every time.",
  "There are no weekends or holidays on the road to exceptional.",
  "The marketplace has no sympathy for your excuses, only respect for your results.",
  "Rest when you're successful, not when you're tired.",
  "Your best today should embarrass you tomorrow. Constant evolution is non-negotiable.",
  "Most create a to-do list. The successful create a to-dominate list.",
  "Don't aspire to have a seat at the table. Aspire to own the table.",
  "The work you avoid today is the success someone else will claim tomorrow.",
  "The moment you become satisfied is the moment your competition surpasses you.",
  "The greatest barrier between you and success is the comfort of mediocrity.",
  "Every minute spent planning is an hour earned in execution."
];

const QuoteDisplay = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <p className="text-xl italic text-neon-green">"{quote}"</p>
  );
};

export default QuoteDisplay;