import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

//navigation items is obtained from data in static , if want to change anything change to the items are there 

const NavBar = ({ active }) => {
  return (
    <div className={`${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <div className="flex">
            <Link
              to={i.url}
              className={`${
                active === index + 1 ? "text-emerald-950" : "text-[#fff]"
              } font-[500] px-6 cursor-pointer`}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NavBar;
