import React, { useEffect, useState } from "react";

const CountDown = ({ data }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isTimerCompleted, setIsTimerCompleted] = useState(false);
    const [hasCountdownStarted, setHasCountdownStarted] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        const newTimeLeft = calculateTimeLeft();
        setTimeLeft(newTimeLeft);
  
        if (Object.keys(newTimeLeft).length > 0) {
          setHasCountdownStarted(true);
        }
  
        if (hasCountdownStarted && Object.keys(newTimeLeft).length === 0 && !isTimerCompleted) {
          setIsTimerCompleted(true);
          console.log("done, Time up!");
        }
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [timeLeft, isTimerCompleted, hasCountdownStarted]);
  

  function calculateTimeLeft() {
    const difference = +new Date(data?.end_date) - +new Date();
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
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up!</span>
      )}
    </div>
  );
};

export default CountDown;
