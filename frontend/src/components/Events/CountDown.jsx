import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";

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
  }, [data?.end_date]); // Add data?.end_date to the dependency array

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
      .patch(`${server}/bidding/end-bidding/${luckydrawId}`)
      .then((response) => {
        console.log("Bidding ended:", response.data);
        // Handle further actions after ending the bidding
      })
      .catch((error) => {
        console.error("Error ending bidding:", error);
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
        <span className="text-red text-[25px]">Time's Up!</span>
      )}
    </div>
  );
};

export default CountDown;