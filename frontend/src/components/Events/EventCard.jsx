import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";

const EventCard = ({active,data}) => {

    return (
        <div
            className={`w-full block bg-[#FFFFFF] rounded-lg ${active ? "unset" : "mb-12"} lg:flex p-2 mb-12`}
        >
            <div className="w-full lg:-w[70%] m-auto">
                <img
                    src= {`${backend_url}${data.images[0]}`}
                    alt=""
                />
            </div>

            <div className="w-full lg:[w-50%] flex flex-col justify-center">

                {/* <h2 className={`${styles.productTitle}`}>{data.name}</h2> */}
                <h2 className={`${styles.productTitle}`}>{data.name}</h2>

                <p>
                    <br />
                    <b>Description:</b>
                    <br />
                     {data.description} 
                </p>

                <br />

                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                           {data.highestBidding}
                        </h5>
                    </div>
                </div>

                <CountDown data={data}/>
                <br />

                <Link to="/bidding" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[16px]">
                            Join Bidding
                        </span>
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default EventCard;