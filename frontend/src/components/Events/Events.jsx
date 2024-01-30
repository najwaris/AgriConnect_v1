import React from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { allBiddings, isLoading } = useSelector((state) => state.biddings);
  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1 className="text-teal-600">Ongoing Bidding</h1>
          </div>

          <div className="w-full grid">
            {allBiddings.length !== 0 && (
              <EventCard data={allBiddings && allBiddings[0]} />
            )}
            <h4>{allBiddings?.length === 0 && "No ongoing bidding!"}</h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
