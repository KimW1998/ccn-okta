import { State, Action } from "./types";

const initialState: State = {
  homepageFeed: { status: "idle" },
  user: {
    id: 147,
    name: "kim",
    email: "kim@email.com",
  },
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case "homepage_feed_fetching": {
      return {
        ...state,
        homepageFeed: {
          status: "loading",
        },
      };
    }
    case "homepage_feed_fetched": {
      return {
        ...state,
        homepageFeed: {
          status: "success",
          data: action.payload,
        },
      };
    }
    case "homepage_feed_error": {
      return {
        ...state,
        homepageFeed: {
          status: "error",
          error: action.payload,
        },
      };
    }
    case "login": {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    }
    case "logout": {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
}
