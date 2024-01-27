import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/originals/3e/b9/b9/3eb9b9b4c46c868b340aca63f43e646e.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#FFCC66] font-[600] capitalize`}
        >
          Best Collection for <br /> Fresh and Local Crops
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#FFFF00]">
          At AgriConnect, we bridge the gap between farmers and buyers, bringing
          fresh produce directly from the field to your table. We empower farmers to reach a wider audience
          and secure fair prices, while offering buyers access to high-quality, locally sourced products.
          Through our user-friendly platform, connecting with the heart of agriculture has never been easier.
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;