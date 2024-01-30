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
  ChatbotUserPage,
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
import {
  ShopHomePage,
  ShopPage,
  ShopDashboardPage,
  ShopCreateBidding,
  ShopAllBiddings,
  ShopCreateLuckydraw,
  ShopAllLuckydraws,
  ChatbotPage,
} from "./routes/ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.js";
import { getAllBiddings } from "./redux/actions/bidding.js";
import { useDispatch } from "react-redux";
import { getAllLuckydraws } from "./redux/actions/luckydraw.js";
import ProductDetailsCard from "./components/Route/ProductDetailsCard/ProductDetailsCard.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllBiddings());
    Store.dispatch(getAllLuckydraws());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/bidding" element={<BiddingPage />} />
        <Route path="/luckyDraws" element={<LuckyDrawPage />} />
        <Route path="/chatbotUser" element={<ChatbotUserPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/*Shop routes*/}
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/shop/farmer/:id" element={<ShopPage />} />
        <Route path="/biddings/:id" element={<ProductDetailsCard />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard/chatbot"
          element={
            <SellerProtectedRoute>
              <ChatbotPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-bidding"
          element={
            <SellerProtectedRoute>
              <ShopCreateBidding />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-biddings"
          element={
            <SellerProtectedRoute>
              <ShopAllBiddings />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-luckydraw"
          element={
            <SellerProtectedRoute>
              <ShopCreateLuckydraw />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard/luckydraws"
          element={
            <SellerProtectedRoute>
              <ShopAllLuckydraws />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        {/* <Route path="/product/:id" element={<ProductDetailsPage />} /> */}
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
