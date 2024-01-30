import React, { useState } from "react";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import CountDown from "../../Events/CountDown";
import { backend_url, server } from "../../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const { user } = useSelector((state) => state.user);
  //const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const handleChange = (e) => {
    const { value } = e.target;
    setBidPrice(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const biddingId = data._id; // or however you get the bidding ID
    const userId = user._id;

    try {
      const response = await axios.post(
        `${server}/bidding/submit-bid/${biddingId}`,
        {
          userId: userId,
          bidAmount: parseFloat(bidPrice),
        }
      );
      toast.success(response.status.message);
      window.location.reload(true);
      setBidPrice("");
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : "An error occurred"
      );
      // Handle errors (e.g., show an error message to the user)
    }
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
                  <Link to={`/shop/farmer/${data.shop._id}`}>
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  </Link>
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
                <h5 className="text-[16px] text-[black] mt-5">
                  {data.shop.address}
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.highestBid === 0
                      ? "RM " + data.minimumPrice
                      : "RM " + data.highestBid}
                  </h4>
                </div>

                <br />
                <br />

                <form onSubmit={handleSubmit}>
                  <label className="block mb-2 text-sm font-bold text-[30px] text-gray-900">
                    Your Bid Price:
                  </label>
                  <input
                    type="number"
                    name="bidPrice"
                    value={bidPrice}
                    onChange={handleChange}
                    placeholder="Enter your bid price"
                    className="appearance-none block w-full px-3 py-2 border border-teal-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-teal-500 sm:text-sm"
                    required
                  />

                  <br />

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
                  <CountDown data={data} />
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
