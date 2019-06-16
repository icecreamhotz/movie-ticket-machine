import {
  UPDATE_MONEY,
  UPDATE_DECEASE_MONEY,
  UPDATE_TOTAL_AND_CHANGE
} from "../../types";

const initialState = {
  money: 0,
  total: 0,
  change: 0
};
export default function money(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_MONEY:
      return {
        ...state,
        money: action.money
      };
    case UPDATE_DECEASE_MONEY:
      return {
        ...state,
        money: action.money
      };
    case UPDATE_TOTAL_AND_CHANGE:
      return {
        ...state,
        total: action.total,
        change: action.change
      };
    default:
      return state;
  }
}
