import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import NavBar from "./NavBar";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import { productData, categoriesData } from "../../static/data";
import { AiOutlineSearch } from "react-icons/ai";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData && productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };



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

          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Products"
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-teal-500 border-[2px] rounded-md"
            />

            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />

            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;
                    const Product_name = d.replace(/\s+/g, "-");

                    return (
                      <Link to={`/product/${Product_name}}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
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
          } transition hidden 800px:flex items-center justify-between w-full bg-teal-600 h-[70px] `}
      >

        {/* navitems */}
        <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
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
