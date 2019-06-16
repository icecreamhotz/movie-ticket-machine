import { combineReducers } from "redux";

import modal from "./reducers/modal";
import money from "./reducers/money";

export default combineReducers({
  modal,
  money
});
