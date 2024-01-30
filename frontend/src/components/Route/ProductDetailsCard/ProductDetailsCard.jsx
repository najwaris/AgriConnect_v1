import React, { useState } from "react";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import CountDown from "../../Events/CountDown";
import { backend_url } from "../../../server";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  //const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const handleChange = (e) => {
    const { value } = e.target;
    setBidPrice(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the bidding form submission here
    console.log("Bidding form submitted with price:", bidPrice);
    // Reset the bidPrice state if needed
    setBidPrice("");
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={`${backend_url}${data.images[0]}`} alt="" />
                <div className="flex">
                  <img
                    src={`${backend_url}${data.shop.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>

                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.total_sell}) Sold out
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.minimumPrice ? "RM" + data.minimumPrice : null}
                  </h4>
                </div>

                <br />
                <br />

                <form onSubmit={handleSubmit}>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your Bid Price:
                  </label>
                  <input
                    type="number"
                    name="bidPrice"
                    value={bidPrice}
                    onChange={handleChange}
                    placeholder="Enter your bid price"
                    required
                  />

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold contained rounded px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                  >
                    Submit Bid
                  </button>
                </form>

                <br />
                <br />

                <div>
                  <CountDown data={data}/>
                </div>

                <div
                  className={
                    "${styles.button} mt-6 rounded-[4px] h-11 flex items-center"
                  }
                >
                  <span className="text-[#fff] flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
