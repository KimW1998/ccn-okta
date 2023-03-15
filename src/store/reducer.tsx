import { combineReducers } from "redux";
import authSliceReducer from "./auth/reducer";
import { darkModeSliceReducer } from "./darkMode/reducer";
import homepageFeedSliceReducer from "./homepageFeed/reducer";

export const reducer = combineReducers({
  auth: authSliceReducer,
  homepageFeed: homepageFeedSliceReducer,
  darkMode: darkModeSliceReducer,
});
