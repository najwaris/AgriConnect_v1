import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";

const ShopDashboardPage = () => {
  const seller = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <span className="font-style: italic font-extrabold text-4xl text-green-600">
            A
          </span>
          <span className="font-style: italic text-3xl ml-1">gri</span>
          <span className="font-style: italic font-extrabold text-4xl text-green-600 ml-1">
            C
          </span>
          <span className="font-style: italic text-3xl ml-1">onnect</span>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <AiOutlineGift
            color="#555"
            size={30}
            className="mx-5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
