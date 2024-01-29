import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
  };
  
  export const luckydrawReducer = createReducer(initialState, (builder) => {
    builder
      .addCase('luckydrawCreateRequest', (state) => {
        state.isLoading = true;
      })
      .addCase('luckydrawCreateSuccess', (state, action) => {
        state.isLoading = false;
        state.luckydraw = action.payload;
        state.success = true;
      })
      .addCase('luckydrawCreateFail', (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase('getAllLuckydrawRequest', (state) => {
          state.isLoading = true;
        })
        .addCase('getAllLuckydrawRequestSuccess', (state, action) => {
          state.isLoading = false;
          state.luckydraws = action.payload;
          state.success = true;
        })
        .addCase('getAllLuckydrawRequestFail', (state, action) => {
          state.isLoading = false;
          state.luckydraws = action.payload;
          state.success = false;
        })
        .addCase('deleteluckydrawRequest', (state) => {
          state.isLoading = true;
        })
        .addCase('deleteluckydrawRequestSuccess', (state, action) => {
          state.isLoading = false;
          state.message = action.payload;
          state.success = true;
        })
        .addCase('deleteluckydrawRequestFail', (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.success = false;
        })
      .addCase('clearErrors', (state) => {
          state.error = null;
        });
  });