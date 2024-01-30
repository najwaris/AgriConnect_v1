import React, { useState } from "react";
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard2 from "../ProductDetailsCard/ProductDetailsCard2";
import { backend_url } from "../../../server";
import CountDown2 from "../../Events/CountDown2";

const ProductCard2 = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
          <img
            src={
              data.images?.length > 0 ? `${backend_url}${data.images[0]}` : null
            }
            alt=""
            className="w-full h-[170px] object-contain"
          />

        <Link to="/">
          <h5 className={"${styles.shop_name}"}>{data.shop.name}</h5>
        </Link>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
            <AiOutlineStar
              className="mr-2 cursor-pointer"
              size={20}
              color="#F6BA00"
            />
          </div>

          <div className="py-2 flex items-center justify-between">
          <span className="font-[400] text-[17px] text-black">
              Do not miss Out !
            </span>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.participants.length} Joined
            </span>
          </div>

        {/* side options */}

        <div>
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Join Donation"
          />

          {open ? <ProductDetailsCard2 setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard2;
