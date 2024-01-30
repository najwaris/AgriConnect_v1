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
      <br />
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h2
          className={`text-[20px] leading-[1.2] 800px:text-[60px] text-teal-500 font-[600] capitalize mt-5`}
        >
          Best Collection for <br /> Fresh and Local Crops
        </h2>

        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#FFFFFF]">
          At AgriConnect, we bridge the gap between farmers and buyers, bringing
          fresh produce directly from the field to your table. We empower farmers to reach a wider audience
          and secure fair prices, while offering buyers access to high-quality, locally sourced products.
          Through our user-friendly platform, connecting with the heart of agriculture has never been easier.
        </p>

        <br />


        <h3
          className={`text-[20px] leading-[1.2] 800px:text-[60px] text-teal-500 font-[600] capitalize mt-5`}
        > Our Services:
        </h3>

        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#FFFFFF]">
          <ul className="list-disc">
            <li>Buy and sell locally sourced crops.</li>
            <li>Donate the defect yet still edible crops.</li>
          </ul>
        </p>

        <Link to="/bidding" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[14px]">
              Buy Now
            </span>
          </div>
        </Link>

        <Link to="/luckydraws" className="inline-block ml-10 mb-5">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[14px]">
              Join Lucky Draw
            </span>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Hero;