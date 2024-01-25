import axios from "axios";
import { server } from "../../server";

// create product
export const createBidding =
  (
    name,
    description,
    category,
    tags,
    minimumPrice,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "biddingCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/bidding/create-bidding`,
        {
          name,
          description,
          category,
          tags,
          minimumPrice,
          shopId,
          images,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "biddingCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "biddingCreateFail",
        payload: error.response.data.message,
      });
    }
  };
