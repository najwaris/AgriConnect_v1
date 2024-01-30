import React, { useEffect, useState } from "react";
import { server } from "../../server";
import axios from "axios";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(interval);
        setStatusEnded();
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

  function setStatusEnded() {
    const luckydrawId = data._id; // Ensure this is the correct ID
    axios
      .post(`${server}/bidding/end-bidding/${luckydrawId}`)
      .then((response) => {
        console.log("Winner selected:", response.data);
        // Handle further actions after selecting winner
      })
      .catch((error) => {
        console.error("Error selecting winner:", error);
        // Handle errors
      });
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
