import React from "react";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { AiOutlineShopping, AiOutlineGift } from "react-icons/ai";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span className={`pl-3 ${active === 1 ? "text-[red]" : ""}`}>
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <AiOutlineShopping size={20} color={active === 2 ? "red" : ""} />
        <span className={`pl-3 ${active === 2 ? "text-[red]" : ""}`}>
          Biddings
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <AiOutlineGift size={20} color={active === 3 ? "red" : ""} />
        <span className={`pl-3 ${active === 3 ? "text-[red]" : ""}`}>
          Lucky Draws
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || logoutHandler()}
      >
        <RiLogoutBoxRLine size={20} color={active === 4 ? "red" : ""} />
        <span className={`pl-3 ${active === 4 ? "text-[red]" : ""}`}>
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
