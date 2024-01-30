import axios from "axios";
import { server } from "../../server";

// create product
export const createBidding = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "biddingCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/bidding/create-bidding`,
      newForm,
      config
    );

    dispatch({
      type: "biddingCreateSuccess",
      payload: data.bidding,
    });
  } catch (error) {
    dispatch({
      type: "biddingCreateFail",
      payload: error.response.data.message,
    });
  }
};

//get All Biddings
export const getAllBiddingsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllShopbiddingRequest",
    });

    const { data } = await axios.get(
      `${server}/bidding/get-all-biddings/${id}`
    );

    dispatch({
      type: "getAllShopbiddingRequestSuccess",
      payload: data.biddings,
    });
  } catch (error) {
    dispatch({
      type: "getAllShopbiddingRequestFail",
      payload: error.response.data.message,
    });
  }
};

//delete bidding of a shop
export const deleteBidding = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletebiddingRequest",
    });

    const { data } = await axios.delete(
      `${server}/bidding/delete-shop-bidding/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deletebiddingRequestSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletebiddingRequestFail",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllBiddings = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllbiddingRequest",
    });

    const { data } = await axios.get(`${server}/bidding/get-all-biddings`);
    dispatch({
      type: "getAllbiddingRequestSuccess",
      payload: data.biddings,
    });
  } catch (error) {
    let errorMessage = "An unexpected error occurred";
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    dispatch({
      type: "getAllbiddingRequestFail",
      payload: errorMessage,
    });
  }
};
