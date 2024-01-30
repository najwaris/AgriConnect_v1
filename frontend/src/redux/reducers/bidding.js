import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  error: null,
  success: false,
  message: "",
};

export const biddingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("biddingCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("biddingCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.bidding = action.payload;
      state.success = true;
    })
    .addCase("biddingCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("getAllShopbiddingRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllShopbiddingRequestSuccess", (state, action) => {
      state.isLoading = false;
      state.biddings = action.payload;
      state.success = true;
    })
    .addCase("getAllShopbiddingRequestFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("deletebiddingRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deletebiddingRequestSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.success = true;
    })
    .addCase("deletebiddingRequestFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("getAllbiddingRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllbiddingRequestSuccess", (state, action) => {
      state.isLoading = false;
      state.allBiddings = action.payload;
    })
    .addCase("getAllbiddingRequestFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
