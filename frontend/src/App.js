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
  FAQPage,
  AboutUs,
} from "./routes/Routes.js";
import Store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import { ShopHomePage, ShopDashboardPage, ShopCreateBidding, ShopAllBiddings, ShopCreateLuckydraw, ShopAllLuckydraws } from "./routes/ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.js";


const App = () => {
  
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);

  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path ="/faq" element={<FAQPage />} />
            <Route path ="/aboutus" element={<AboutUs />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route path="/bidding" element={<BiddingPage />} />
            <Route path="/luckyDraws" element={<LuckyDrawPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute >
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
                <SellerProtectedRoute  >
                  <ShopHomePage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <SellerProtectedRoute  >
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-create-bidding"
              element={
                <SellerProtectedRoute  >
                  <ShopCreateBidding />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-biddings"
              element={
                <SellerProtectedRoute  >
                  <ShopAllBiddings />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard-create-luckydraw"
              element={
                <SellerProtectedRoute  >
                  <ShopCreateLuckydraw />
                </SellerProtectedRoute>
              }
            />
            <Route
              path="/dashboard/luckydraws"
              element={
                <SellerProtectedRoute  >
                  <ShopAllLuckydraws />
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
  );
};

export default App;
