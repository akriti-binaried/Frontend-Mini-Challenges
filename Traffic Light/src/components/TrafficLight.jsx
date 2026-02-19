import React, { useEffect, useState } from "react";

const TrafficLight = () => {
  const timings = {
    red: 5,
    green: 3,
    yellow: 2,
  };

  const sequence = ["red", "green", "yellow"];

  const [currentLight, setCurrentLight] = useState("red");
  const [timeLeft, setTimeLeft] = useState(timings["red"]);

  useEffect(() => {
    if (timeLeft === 0) {
      const currentIndex = sequence.indexOf(currentLight);
      const nextLight = sequence[(currentIndex + 1) % sequence.length];

      setCurrentLight(nextLight);
      setTimeLeft(timings[nextLight]);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [timeLeft, currentLight]);

  const getLightStyle = (color) => {
    const base =
      "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full transition-all duration-500";

    const colors = {
      red:
        currentLight === "red"
          ? "bg-red-600"
          : "bg-gray-400",
      yellow:
        currentLight === "yellow"
          ? "bg-yellow-400"
          : "bg-gray-400",
      green:
        currentLight === "green"
          ? "bg-green-600 "
          : "bg-gray-400",
    };

    return `${base} ${colors[color]}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      
      
      <div className="bg-black p-6 rounded-3xl flex flex-col items-center gap-5 w-24 sm:w-32 md:w-36">
        
        <div className={getLightStyle("red")}></div>

        <div className={getLightStyle("yellow")}></div>

        <div className={getLightStyle("green")}></div>

      </div>

      
      <div className="mt-6 text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
        {timeLeft} Seconds
      </div>

    </div>
  );
};

export default TrafficLight;
