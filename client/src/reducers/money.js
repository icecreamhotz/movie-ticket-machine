import {
  UPDATE_MONEY,
  UPDATE_DECEASE_MONEY,
  UPDATE_TOTAL_AND_CHANGE
} from "../types";

export default function money(
  state = { money: 0, total: 0, change: 0 },
  action = {}
) {
  switch (action.type) {
    case UPDATE_MONEY:
      return {
        ...state,
        money: action.payload + state.money
      };
    case UPDATE_DECEASE_MONEY:
      return {
        ...state,
        money: action.payload
      };
    case UPDATE_TOTAL_AND_CHANGE:
      return {
        ...state,
        total: action.payload.total,
        change: action.payload.change
      };
    default:
      return state;
  }
}
