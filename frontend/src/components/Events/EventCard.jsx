import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";

const EventCard = () => {

    return (
        <div
            className={`w-full block bg-[#cbe5cb] rounded-lg lg:flex p-2 mb-12`}
        >
            <div className="w-full lg:-w[50%] m-auto">
                <img
                    src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
                    // src={data.image_Url[0].url}
                    alt=""
                />
            </div>

            <div className="w-full lg:[w-50%] flex flex-col justify-center">

                {/* <h2 className={`${styles.productTitle}`}>{data.name}</h2> */}
                <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>

                <p>
                    <br />
                    <b>Description:</b>
                    <br />
                    {/* {data.description} */}
                    Loreum ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat.
                </p>

                <br />

                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                            {/* {data.original_price}$ */}
                            1099$
                        </h5>
                        <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                            {/* {data.discount_price}$ */}
                            999$
                        </h5>
                    </div>
                    <span className="pr-3 font-[400] text-[17px] text-[#3f5f3f]">
                        {/* {data.total_sell} sold */}
                        120 sold
                    </span>
                </div>

                <CountDown />
                <br />

                <Link to="/BiddingPage" className="inline-block">
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