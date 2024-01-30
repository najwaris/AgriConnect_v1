import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { CiSettings } from "react-icons/ci";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">

      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#009688"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[crimson]" : "text-[#009688]"
              }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-biddings" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "crimson" : "#009688"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[crimson]" : "text-[#009688]"
              }`}
          >
            All Biddings
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-bidding"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 3 ? "crimson" : "#009688"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[crimson]" : "text-[#009688]"
              }`}
          >
            Create New Bidding
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard/luckydraws" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 4 ? "crimson" : "#009688"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[crimson]" : "text-[#009688]"
              }`}
          >
            All luckyDraws
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-luckydraw"
          className="w-full flex items-center"
        >
          <VscNewFile
            size={30}
            color={`${active === 5 ? "crimson" : "#009688"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 5 ? "text-[crimson]" : "text-[#009688]"
              }`}
          >
            Create Lucky Draw
          </h5>
        </Link>
      </div>

      {/* <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 6 ? "crimson" : "#009688"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 6 ? "text-[crimson]" : "text-[#009688]"
              }`}
          >
            Settings
          </h5>
        </Link>
      </div> */}
    </div>
  );
};

export default DashboardSideBar;
