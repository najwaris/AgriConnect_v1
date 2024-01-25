import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user";
import {sellerReducer} from "./reducers/seller";
import { biddingReducer } from "./reducers/bidding";

const Store = configureStore({
  reducer: {
    user : userReducer,
    seller :sellerReducer,
    biddings :biddingReducer,
  },
});

export default Store;