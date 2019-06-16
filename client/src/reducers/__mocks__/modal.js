import {
  UPDATE_MODAL_BUY_TICKET,
  UPDATE_MODAL_SUCCESS,
  UPDATE_MODAL_SUCCESSED
} from "../../types";

const initialState = {
  modalBuyTicket: false,
  modalSuccess: false,
  price: 0,
  movieId: ""
};

export default function modal(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_MODAL_BUY_TICKET:
      return {
        ...state,
        modalBuyTicket: action.modalBuyTicket,
        price: action.price,
        movieId: action.movieId
      };
    case UPDATE_MODAL_SUCCESS:
      return {
        ...state,
        modalSuccess: action.modalSuccess
      };
    case UPDATE_MODAL_SUCCESSED:
      return {
        ...state,
        modalSuccess: action.modalSuccess,
        modalBuyTicket: false,
        price: 0,
        movieId: ""
      };
    default:
      return state;
  }
}
