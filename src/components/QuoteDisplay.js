import React from "react";

const QuoteDisplay = ({ period }) => {
  const workQuotes = [
    // Provided Quotes
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
    "Every minute spent planning is an hour earned in execution.",
    // Additional Frank Underwood-Styled Quotes
    "Power is not given; it’s taken by those who refuse to bend.",
    "Weakness is a luxury I can’t afford—neither should you.",
    "The game doesn’t pause for your hesitation; it rewards the relentless.",
    "I don’t negotiate with mediocrity—I obliterate it.",
    "Success is the shadow cast by unrelenting effort.",
    "The timid ask for permission; the bold seize control.",
    "Time is a currency—spend it on dominance, not dreams.",
    "Failure is for those who stop; I only accelerate.",
    "The battlefield of success has no room for spectators.",
    "Ambition without action is a whisper in a storm—useless."
  ];

  const breakQuotes = [
    "Recharge now, conquer later.",
    "Take a breath, then dominate again.",
    "Rest is the fuel for relentless pursuit.",
    "Pause, reflect, then strike harder.",
    "A moment of calm before the storm of success.",
    "Step back to sharpen the blade of your will.",
    "Break now, so you can break records later.",
    "Rest is not retreat—it’s preparation for the next assault.",
    "Gather strength, then unleash havoc.",
    "A pause today fuels the empire of tomorrow."
  ];

  const quote =
    period === "work"
      ? workQuotes[Math.floor(Math.random() * workQuotes.length)]
      : breakQuotes[Math.floor(Math.random() * breakQuotes.length)];

  return <p className="text-gray-400 italic text-center mb-6">"{quote}"</p>;
};

export default QuoteDisplay;