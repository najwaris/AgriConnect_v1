import React, { useEffect } from "react";
import ShopCreate from "../components/Shop/ShopCreate";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state) => state.seller);

  //prevent going back to Login page using the url if already login
  useEffect(() => {
    if (isSeller === true) {
      navigate("/dashboard");
    }
  }, [isSeller]);

  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
