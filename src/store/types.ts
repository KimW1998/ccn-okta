import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Post, PostsResponse } from "../lib/model";

import { AuthState, User } from "./auth/reducer";
import { DarkModeState } from "./darkMode/reducer";
import { HomepageFeedState } from "./homepageFeed/reducer";

export type State = {
  auth: AuthState;
  darkMode: DarkModeState;
  homepageFeed: HomepageFeedState;
};

export type Action =
  | {
      type: "add_post";
      payload: Post;
    }
  | {
      type: "login";
      payload: {
        token: string;
        user: User;
      };
    }
  | {
      type: "logout";
    }
  | {
      type: "homepage_feed_fetching";
    }
  | {
      type: "homepage_feed_fetched";
      payload: PostsResponse;
    }
  | {
      type: "homepage_feed_error";
      payload: any;
    }
  | {
      type: "toggle_dark_mode";
    };

// Although this type is often called ThunkResult, it's what
//  we use to type the thunk itself, but allows for the thunk
//  to return a result of type R. Not very important right now.
export type ThunkResult<R = any> = ThunkAction<R, State, void, Action>;

// Use this type like this:
//  const dispatch = useDispatch<AppDispatch>();
export type AppDispatch = ThunkDispatch<State, void, Action>;
