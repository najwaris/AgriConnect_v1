import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import {FiShoppingBag} from "react-icons/fi";
import {BiMessageSquareDetail} from "react-icons/bi";
import { backend_url } from "../../../server";

const DashboardHeader = () => {
    const {seller } = useSelector((state) => state.seller);
    return (
      <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
        <div>
          <Link to="/dashboard">
            <span className="font-style: italic font-extrabold text-4xl text-teal-600">
              A
            </span>
            <span className="font-style: italic text-3xl ml-1">gri</span>
            <span className="font-style: italic font-extrabold text-4xl text-teal-600 ml-1">
              C
            </span>
            <span className="font-style: italic text-3xl ml-1">onnect</span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
          <Link to="/dashboard/luckydraws" className="800px:block hidden">
              <AiOutlineGift
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-biddings" className="800px:block hidden">
              <FiShoppingBag
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard/chatbot" className="800px:block hidden">
              <BiMessageSquareDetail
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
              </Link>
              <Link to={`/shop/${seller._id}`}>
              <img
                src={`${backend_url}${seller?.avatar}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    );
}

export default DashboardHeader