import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";

const CountDown2 = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function endLuckyDrawAndSelectWinner() {
    const luckydrawId = data._id; // Ensure this is the correct ID

    // First, call the endpoint to end the lucky draw
    axios
      .patch(`${server}/luckydraw/end-luckydraw/${data._id}`)
      .then(() => {
        // After successfully ending the lucky draw, select the winner
        selectWinner();
      })
      .catch((error) => {
        console.error("Error ending lucky draw:", error);
        // Handle errors
      });
  }

  function selectWinner() {
    const luckydrawId = data._id; // Ensure this is the correct ID

    // Call the endpoint to select a winner
    axios
      .post(`${server}/luckydraw/select-winner/${data._id}`)
      .then((response) => {
        console.log("Winner selected:", response.data);
        // Handle further actions after selecting winner
      })
      .catch((error) => {
        console.error("Error selecting winner:", error);
        // Handle errors
      });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.keys(newTimeLeft).length === 0) {
        clearInterval(interval);
        endLuckyDrawAndSelectWinner();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.end_date]); // Add data.end_date as a dependency

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

  // function selectWinner() {
  //   const luckydrawId = data._id; // Ensure this is the correct ID
  //   axios
  //     .post(`${server}/luckydraw/select-winner/${luckydrawId}`)
  //     .then((response) => {
  //       console.log("Winner selected:", response.data);
  //       // Handle further actions after selecting winner
  //     })
  //     .catch((error) => {
  //       console.error("Error selecting winner:", error);
  //       // Handle errors
  //     });
  // }

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

export default CountDown2;
