import {
  UPDATE_MONEY,
  UPDATE_DECEASE_MONEY,
  UPDATE_TOTAL_AND_CHANGE
} from "../types";

export const setMoney = money => {
  return {
    type: UPDATE_MONEY,
    payload: money
  };
};

export const deceaseMoney = money => {
  return {
    type: UPDATE_DECEASE_MONEY,
    payload: money
  };
};

export const setTotalAndChange = (total, change) => {
  return {
    type: UPDATE_TOTAL_AND_CHANGE,
    payload: {
      total: total,
      change: change
    }
  };
};
