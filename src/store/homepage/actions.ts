import axios from "axios";
import { ThunkResult } from "../types";

export const fetchDataFromTag = (tag: string): ThunkResult => {
  return async (dispatch, getState) => {
    dispatch({
      type: "homepage_feed_fetching",
    });
    try {
      const res = await axios.get(
        `https://coders-network-api-okta.herokuapp.com/posts?tag=${tag}`
      );
      dispatch({
        type: "homepage_feed_fetched",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "homepage_feed_error",
        payload: error,
      });
    }
  };
};
