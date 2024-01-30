import React, { useState } from "react";
import { AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import CountDown2 from "../../Events/CountDown2.jsx";
import { backend_url, server } from "../../../server.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ProductDetailsCard2 = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const { user } = useSelector((state) => state.user);

  const handleMessageSubmit = () => {};

  const handleClick = async (e) => {
    e.preventDefault();

    const luckydrawId = data._id; // Replace with your actual luckydraw ID from the component's data
    const userId = user._id; // Replace with the actual user ID

    try {
      const response = await axios.post(
        `${server}/luckydraw/add-participant/${luckydrawId}`,
        {
          userId: userId,
        }
      );
      toast.success(response.status.message);
      window.location.reload(true);
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : "An error occurred"
      );
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
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                  </div>
                </div>
                <Link to={`/shop/farmer/${data.shop._id}`}>
                  <div
                    className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  >
                    <span className="text-[#fff] flex items-center">
                      View Farmer Shop
                    </span>
                  </div>
                </Link>
                <h5 className="text-[16px] mt-5 ">{data.shop.address}</h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>

                <br />
                <br />

                <form>
                  <button
                    type="button"
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold contained rounded px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={handleClick}
                  >
                    Join Donation
                  </button>
                </form>

                <br />
                <br />

                <div>
                  <CountDown2 data={data} />
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

export default ProductDetailsCard2;
