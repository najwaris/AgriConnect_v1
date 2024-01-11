import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import NavBar from "./NavBar";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [active, setActive] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[70px] 800:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
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
          <div className={`${styles.button}`}>
            <Link to="/shop-create">
              <h1 className="text-[#fff] flex items-center text-sm">
                Join our Farmers <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-green-600 h-[70px] `}
      >
        {/*navigation bar*/}
        <div className={`${styles.noramlFlex}`}>
          <NavBar active={activeHeading} />
        </div>
        <div>
          {/*Profile*/}
          <div className={`${styles.noramlFlex}`}>
            <div className="relative cursor-pointer mr-[50px]">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${backend_url}${user?.avatar}`}
                    alt=""
                    className="w-[45px] h-[45px] rounded-full"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
