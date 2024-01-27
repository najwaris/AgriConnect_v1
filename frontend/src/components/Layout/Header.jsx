import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowDownIoIosArrowForward, IoIosArrowForward } from "react-icons/io";
import DropDown from "./DropDown";
import NavBar from "./NavBar";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { BiMenuAltLeft } from "react-icons/bi";
import { categoriesData } from "../../static/data";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

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
        className={`${active === true ? "shadow-sm top-0 left-0 z-10" : null
          } transition hidden 800px:flex items-center justify-between w-full bg-green-600 h-[70px] `}
      >
        {/* categories
        <div onClick={() => setDropDown(!DropDown)}>
          <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button
              className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
            >
              All Categories
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-4 cursor-pointer"
              onClick={() => setDropDown(!DropDown)}
            />
            {DropDown ? (
              <DropDown
                categoriesData={categoriesData}
                DropDown={setDropDown}
              />
            ) : null}
          </div>
        </div> */}

        {/* navitems */}
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
