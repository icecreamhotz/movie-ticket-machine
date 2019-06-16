import {
  UPDATE_MODAL_BUY_TICKET,
  UPDATE_MODAL_SUCCESS,
  UPDATE_MODAL_SUCCESSED
} from "../types";

export default function modal(
  state = {
    modalBuyTicket: false,
    modalSuccess: false,
    price: 0,
    movieId: ""
  },
  action = {}
) {
  switch (action.type) {
    case UPDATE_MODAL_BUY_TICKET:
      return {
        ...state,
        modalBuyTicket: action.payload.status,
        price: action.payload.price,
        movieId: action.payload.movieId
      };
    case UPDATE_MODAL_SUCCESS:
      return {
        ...state,
        modalSuccess: action.payload.status
      };
    case UPDATE_MODAL_SUCCESSED:
      return {
        ...state,
        modalSuccess: action.payload.status,
        modalBuyTicket: false,
        price: 0,
        movieId: ""
      };
    default:
      return state;
  }
}
