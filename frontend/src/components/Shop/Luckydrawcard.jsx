import React from "react";
import { backend_url, server } from "../../server";
import axios from "axios";

const Luckydrawcard = ({ data }) => {
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  const handleCompleteClick = async () => {
    try {
      const response = await axios.patch(
        `${server}/luckydraw/luckydraw-complete/${data._id}`
      );
      console.log("Order Completed:", response.data);
      window.location.reload(true);
      // Handle success (e.g., refresh data, show message)
    } catch (error) {
      console.error(
        "Error completing order:",
        error.response ? error.response.data : error
      );
    }
  };
  const handleCancelClick = async () => {
    try {
      const response = await axios.patch(
        `${server}/luckydraw/luckydraw-cancel/${data._id}`
      );
      console.log("Order Cancelled:", response.data);
      window.location.reload(true);
      // Handle success
    } catch (error) {
      console.error(
        "Error cancelling order:",
        error.response ? error.response.data : error
      );
      // Handle error
    }
  };
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
        <div className="mt-3">
          <h4 className="text-md font-bold">Winner Details:</h4>
          <p className="text-sm font-semibold">Winner: {data.winner.name}</p>
          <p className="text-sm font-semibold">
            Phone: +(60){data.winner.phoneNumber}
          </p>
          <p className="text-sm font-semibold">Email: {data.winner.email}</p>
          <br />
          <p className="text-sm font-semibold">
            Status:{" "}
            {!data.Orderstatus || data.Orderstatus === "Pending Pickup"
              ? "Pending Pickup"
              : data.Orderstatus}
          </p>
          {data.Orderstatus === "Pending Pickup" && (
            <>
              <button
                onClick={handleCompleteClick}
                className="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Complete
              </button>
              <button
                onClick={handleCancelClick}
                className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Complete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Luckydrawcard;
