import React, { useState } from "react";
import { backend_url } from "../../server";

const Biddingcard = ({ data }) => {
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  return (
    <div className="w-full h-auto bg-white rounded-lg shadow-sm p-3 relative cursor-pointer flex px-5">
      <div className="flex-none">
        <img
          src={
            data.images?.length > 0
              ? `${backend_url}${data.images[0]}`
              : "defaultImageURL"
          }
          alt={data.name}
          className="w-[150px] h-[150px] object-contain rounded-lg"
        />
      </div>
      <div className="flex-grow ml-3">
        <h3 className="text-lg font-bold">{data.name}</h3>
        <p className="text-sm text-gray-600">{data.description}</p>
        <div className="mt-2">
          <span className="text-lg font-semibold">
            Your Bid: RM {data.highestBid}
          </span>
        </div>
        <div className="mt-3">
          <h4 className="text-md font-bold">Contact Seller for Pickup:</h4>
          <p className="text-sm font-semibold">Seller: {data.shop.name}</p>
          <p className="text-sm font-semibold">
            Phone: +(60){data.shop.phoneNumber}
          </p>
          <p className="text-sm font-semibold">Email: {data.shop.email}</p>
          <p className="text-sm font-semibold">
            Shop Address: {data.shop.address}
          </p>
          <br />
          <p className="text-sm font-semibold">Status: {data.Orderstatus}</p>
        </div>
      </div>
    </div>
  );
};

export default Biddingcard;
