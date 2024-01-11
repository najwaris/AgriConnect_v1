import React, { useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  BiddingPage,
  LuckyDrawPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
} from "./Routes.js";
import Store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute.js";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./SellerProtectedRoute.js";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const { isLoading, isSeller} = useSelector((state) => state.seller);

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  return (
    <>
      {loading || isLoading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route path="/bidding" element={<BiddingPage />} />
            <Route path="/luckyDraws" element={<LuckyDrawPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            {/*Shop routes*/}
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route
              path="/shop/:id"
              element={
                <SellerProtectedRoute isSeller={isSeller} >
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/seller/activation/:activation_token"
              element={<SellerActivationPage />}
            />
          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
