import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {

  return (

    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">

        <div className="flex items-start">
          <img
            src="https://vectorlogo4u.com/wp-content/uploads/2018/10/Mardi-Logo-Vector.png"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>

        <div className="flex items-start">
          <img
            src="https://vectorlogo4u.com/wp-content/uploads/2019/09/FAMA-Logo-Vector.png"
            style={{ width: "150px", objectFit: "contain" }}
            alt=""
          />
        </div>

        <div className="flex items-start">
          <img
            src="https://vectorlogo4u.com/wp-content/uploads/2018/08/Jabatan-pertanian-malaysia-vector.png"
            style={{ width: "150px", objectFit: "contain" }}
            alt=""
          />
        </div>

        <div className="flex items-start">
          <img
            src="https://vectorlogo4u.com/wp-content/uploads/2020/11/kada-vector-logo-01.png"
            style={{ width: "150px", objectFit: "contain" }}
            alt=""
          />
        </div>

        <div className="flex items-start">
          <img
            src="https://vectorlogo4u.com/wp-content/uploads/2018/08/Lembaga-Pertubuhan-peladang-vector.png"
            style={{ width: "150px", objectFit: "contain" }}
            alt=""
          />
        </div>

      </div>
    </div>
  );
};

export default Sponsored;