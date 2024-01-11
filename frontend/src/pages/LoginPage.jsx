import React, { useEffect } from "react";
import Login from "../components/Login/Login.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  //prevent going back to Login page using the url if already login
  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
