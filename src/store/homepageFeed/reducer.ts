import { PostsResponse } from "../../lib/model";
import { FetchState } from "../../util/fetchstate";
import { Action } from "../types";

export type HomepageFeedState = FetchState<PostsResponse>;

const initialState: HomepageFeedState = {
  status: "loading",
};

export default function homepageFeedSliceReducer(
  state: HomepageFeedState = initialState,
  action: Action
): HomepageFeedState {
  switch (action.type) {
    case "homepage_feed_fetching": {
      return {
        status: "loading",
      };
    }
    case "homepage_feed_fetched": {
      return {
        status: "success",
        data: action.payload,
      };
    }
    case "homepage_feed_error": {
      return {
        status: "error",
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
