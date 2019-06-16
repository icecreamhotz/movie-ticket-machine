import {
  UPDATE_MODAL_BUY_TICKET,
  UPDATE_MODAL_SUCCESS,
  UPDATE_MODAL_SUCCESSED
} from "../types";

export const setModalBuyTicket = (status, price, movieId) => {
  return {
    type: UPDATE_MODAL_BUY_TICKET,
    payload: { status: status, price: price, movieId: movieId }
  };
};

export const setModalSuccess = status => {
  return {
    type: UPDATE_MODAL_SUCCESS,
    payload: { status: status }
  };
};

export const setModalSuccessed = status => {
  return {
    type: UPDATE_MODAL_SUCCESSED,
    payload: { status: status }
  };
};
