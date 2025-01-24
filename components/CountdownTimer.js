import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("February 14, 2025 00:00:00").getTime();
    const currentTime = new Date().getTime();
    const difference = targetDate - currentTime;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) return null;
    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="text-4xl font-bold text-pink-500">{timeLeft[interval]}</span>
        <span className="capitalize text-gray-500">{interval}</span>
      </div>
    );
  });

  return (
    <div className="text-center mt-2 bg-pink-50 py-8 px-5 rounded-lg shadow-lg max-w-[320px]">
      <h2 className="text-2xl font-semibold text-pink-600">
        Countdown to Valentine's Day 💕
      </h2>
      <div className="flex justify-center gap-4 mt-6">
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    </div>
  );
};

export default CountdownTimer;
