import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as types from "./types";
import modalReducer from "./reducers/__mocks__/modal";
import moneyRecuder from "./reducers/__mocks__/money";

describe("test case 1", () => {
  const priceOfTicket = 100;
  const ticketTotal = 1;
  const moneyInsert = 100;
  let change;
  let calculateTotal;

  it("should return the initial state modal", () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalBuyTicket: false,
      modalSuccess: false,
      price: 0,
      movieId: ""
    });
  });

  it("should return the initial state money", () => {
    expect(moneyRecuder(undefined, {})).toEqual({
      money: 0,
      total: 0,
      change: 0
    });
  });

  it("shoud return movie select", () => {
    expect(
      modalReducer(
        { modalBuyTicket: false, modalSuccess: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_BUY_TICKET,
          modalBuyTicket: true,
          price: priceOfTicket,
          movieId: "3da4e5f6s4w48saswD4" // mock movie id like deadpool
        }
      )
    ).toEqual({
      modalBuyTicket: true,
      price: priceOfTicket,
      movieId: "3da4e5f6s4w48saswD4", // mock movie id like deadpool
      modalSuccess: false
    });
  });

  it("shoud return insert cash and coin with calculate", () => {
    expect(
      moneyRecuder(
        { money: 0, total: 0, change: 0 },
        {
          type: types.UPDATE_MONEY,
          money: moneyInsert
        }
      )
    ).toEqual({
      money: moneyInsert,
      total: 0,
      change: 0
    });

    calculateTotal = priceOfTicket * ticketTotal;
    change = moneyInsert - calculateTotal;

    expect(
      moneyRecuder(
        { money: moneyInsert, total: 0, change: 0 },
        {
          type: types.UPDATE_TOTAL_AND_CHANGE,
          total: calculateTotal,
          change: change // money minus price of ticket and multiply total
        }
      )
    ).toEqual({
      money: moneyInsert,
      change: change,
      total: calculateTotal
    });
  });

  it("shoud return success modal and get cash and coin when change", () => {
    expect(
      modalReducer(
        {
          modalBuyTicket: false,
          price: priceOfTicket,
          movieId: "", // mock movie id like deadpool
          modalSuccess: false
        },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: priceOfTicket,
      movieId: ""
    });

    // expect change correct cash and coins
    const cashAndCoin = calculateChangeCashAndCoin(change);
    expect(cashAndCoin[0]).toEqual(0);
    expect(cashAndCoin[1]).toEqual(0);
    expect(cashAndCoin[2]).toEqual(0);
    expect(cashAndCoin[3]).toEqual(0);
    expect(cashAndCoin[4]).toEqual(0);
    expect(cashAndCoin[5]).toEqual(0);
    expect(cashAndCoin[6]).toEqual(0);
    expect(cashAndCoin[7]).toEqual(0);
    expect(cashAndCoin[8]).toEqual(0);

    expect(
      modalReducer(
        { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: 0,
      movieId: ""
    });
  });

  expect(
    modalReducer(
      { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
      {
        type: types.UPDATE_MODAL_SUCCESSED,
        modalSuccess: true,
        modalBuyTicket: false,
        price: 0,
        movieId: ""
      }
    )
  ).toEqual({
    modalSuccess: true,
    modalBuyTicket: false,
    price: 0,
    movieId: ""
  });
});

describe("test case 2", () => {
  const priceOfTicket = 182;
  const ticketTotal = 1;
  const moneyInsert = 200;
  let change;
  let calculateTotal;

  it("should return the initial state modal", () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalBuyTicket: false,
      modalSuccess: false,
      price: 0,
      movieId: ""
    });
  });

  it("should return the initial state money", () => {
    expect(moneyRecuder(undefined, {})).toEqual({
      money: 0,
      total: 0,
      change: 0
    });
  });

  it("shoud return movie select", () => {
    expect(
      modalReducer(
        { modalBuyTicket: false, modalSuccess: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_BUY_TICKET,
          modalBuyTicket: true,
          price: priceOfTicket,
          movieId: "3da4e5f6s4w48saswD4" // mock movie id like deadpool
        }
      )
    ).toEqual({
      modalBuyTicket: true,
      price: priceOfTicket,
      movieId: "3da4e5f6s4w48saswD4", // mock movie id like deadpool
      modalSuccess: false
    });
  });

  it("shoud return insert cash and coin with calculate", () => {
    expect(
      moneyRecuder(
        { money: 0, total: 0, change: 0 },
        {
          type: types.UPDATE_MONEY,
          money: moneyInsert
        }
      )
    ).toEqual({
      money: moneyInsert,
      total: 0,
      change: 0
    });

    calculateTotal = priceOfTicket * ticketTotal;
    change = moneyInsert - calculateTotal;

    expect(
      moneyRecuder(
        { money: moneyInsert, total: 0, change: 0 },
        {
          type: types.UPDATE_TOTAL_AND_CHANGE,
          total: calculateTotal,
          change: change // money minus price of ticket and multiply total
        }
      )
    ).toEqual({
      money: moneyInsert,
      change: change,
      total: calculateTotal
    });
  });

  it("shoud return success modal and get cash and coin when change", () => {
    expect(
      modalReducer(
        {
          modalBuyTicket: false,
          price: priceOfTicket,
          movieId: "", // mock movie id like deadpool
          modalSuccess: false
        },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: priceOfTicket,
      movieId: ""
    });

    // expect change correct cash and coins
    const cashAndCoin = calculateChangeCashAndCoin(change);
    expect(cashAndCoin[0]).toEqual(0);
    expect(cashAndCoin[1]).toEqual(0);
    expect(cashAndCoin[2]).toEqual(0);
    expect(cashAndCoin[3]).toEqual(0);
    expect(cashAndCoin[4]).toEqual(0);
    expect(cashAndCoin[5]).toEqual(1);
    expect(cashAndCoin[6]).toEqual(1);
    expect(cashAndCoin[7]).toEqual(1);
    expect(cashAndCoin[8]).toEqual(1);

    expect(
      modalReducer(
        { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: 0,
      movieId: ""
    });
  });

  expect(
    modalReducer(
      { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
      {
        type: types.UPDATE_MODAL_SUCCESSED,
        modalSuccess: true,
        modalBuyTicket: false,
        price: 0,
        movieId: ""
      }
    )
  ).toEqual({
    modalSuccess: true,
    modalBuyTicket: false,
    price: 0,
    movieId: ""
  });
});

describe("test case 3", () => {
  const priceOfTicket = 355;
  const ticketTotal = 3;
  const moneyInsert = 2000;
  let change;
  let calculateTotal;

  it("should return the initial state modal", () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalBuyTicket: false,
      modalSuccess: false,
      price: 0,
      movieId: ""
    });
  });

  it("should return the initial state money", () => {
    expect(moneyRecuder(undefined, {})).toEqual({
      money: 0,
      total: 0,
      change: 0
    });
  });

  it("shoud return movie select", () => {
    expect(
      modalReducer(
        { modalBuyTicket: false, modalSuccess: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_BUY_TICKET,
          modalBuyTicket: true,
          price: priceOfTicket,
          movieId: "3da4e5f6s4w48saswD4" // mock movie id like deadpool
        }
      )
    ).toEqual({
      modalBuyTicket: true,
      price: priceOfTicket,
      movieId: "3da4e5f6s4w48saswD4", // mock movie id like deadpool
      modalSuccess: false
    });
  });

  it("shoud return insert cash and coin with calculate", () => {
    expect(
      moneyRecuder(
        { money: 0, total: 0, change: 0 },
        {
          type: types.UPDATE_MONEY,
          money: moneyInsert
        }
      )
    ).toEqual({
      money: moneyInsert,
      total: 0,
      change: 0
    });

    calculateTotal = priceOfTicket * ticketTotal;
    change = moneyInsert - calculateTotal;

    expect(
      moneyRecuder(
        { money: moneyInsert, total: 0, change: 0 },
        {
          type: types.UPDATE_TOTAL_AND_CHANGE,
          total: calculateTotal,
          change: change // money minus price of ticket and multiply total
        }
      )
    ).toEqual({
      money: moneyInsert,
      change: change,
      total: calculateTotal
    });
  });

  it("shoud return success modal and get cash and coin when change", () => {
    expect(
      modalReducer(
        {
          modalBuyTicket: false,
          price: priceOfTicket,
          movieId: "", // mock movie id like deadpool
          modalSuccess: false
        },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: priceOfTicket,
      movieId: ""
    });

    // expect change correct cash and coins
    const cashAndCoin = calculateChangeCashAndCoin(change);
    expect(cashAndCoin[0]).toEqual(0);
    expect(cashAndCoin[1]).toEqual(1);
    expect(cashAndCoin[2]).toEqual(4);
    expect(cashAndCoin[3]).toEqual(0);
    expect(cashAndCoin[4]).toEqual(1);
    expect(cashAndCoin[5]).toEqual(1);
    expect(cashAndCoin[6]).toEqual(1);
    expect(cashAndCoin[7]).toEqual(0);
    expect(cashAndCoin[8]).toEqual(0);

    expect(
      modalReducer(
        { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: 0,
      movieId: ""
    });
  });

  expect(
    modalReducer(
      { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
      {
        type: types.UPDATE_MODAL_SUCCESSED,
        modalSuccess: true,
        modalBuyTicket: false,
        price: 0,
        movieId: ""
      }
    )
  ).toEqual({
    modalSuccess: true,
    modalBuyTicket: false,
    price: 0,
    movieId: ""
  });
});

describe("test case 4", () => {
  const priceOfTicket = 182;
  const ticketTotal = 4;
  const moneyInsert = 1000;
  let change;
  let calculateTotal;

  it("should return the initial state modal", () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalBuyTicket: false,
      modalSuccess: false,
      price: 0,
      movieId: ""
    });
  });

  it("should return the initial state money", () => {
    expect(moneyRecuder(undefined, {})).toEqual({
      money: 0,
      total: 0,
      change: 0
    });
  });

  it("shoud return movie select", () => {
    expect(
      modalReducer(
        { modalBuyTicket: false, modalSuccess: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_BUY_TICKET,
          modalBuyTicket: true,
          price: priceOfTicket,
          movieId: "3da4e5f6s4w48saswD4" // mock movie id like deadpool
        }
      )
    ).toEqual({
      modalBuyTicket: true,
      price: priceOfTicket,
      movieId: "3da4e5f6s4w48saswD4", // mock movie id like deadpool
      modalSuccess: false
    });
  });

  it("shoud return insert cash and coin with calculate", () => {
    expect(
      moneyRecuder(
        { money: 0, total: 0, change: 0 },
        {
          type: types.UPDATE_MONEY,
          money: moneyInsert
        }
      )
    ).toEqual({
      money: moneyInsert,
      total: 0,
      change: 0
    });

    calculateTotal = priceOfTicket * ticketTotal;
    change = moneyInsert - calculateTotal;

    expect(
      moneyRecuder(
        { money: moneyInsert, total: 0, change: 0 },
        {
          type: types.UPDATE_TOTAL_AND_CHANGE,
          total: calculateTotal,
          change: change // money minus price of ticket and multiply total
        }
      )
    ).toEqual({
      money: moneyInsert,
      change: change,
      total: calculateTotal
    });
  });

  it("shoud return success modal and get cash and coin when change", () => {
    expect(
      modalReducer(
        {
          modalBuyTicket: false,
          price: priceOfTicket,
          movieId: "", // mock movie id like deadpool
          modalSuccess: false
        },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: priceOfTicket,
      movieId: ""
    });

    // expect change correct cash and coins
    const cashAndCoin = calculateChangeCashAndCoin(change);
    expect(cashAndCoin[0]).toEqual(0);
    expect(cashAndCoin[1]).toEqual(0);
    expect(cashAndCoin[2]).toEqual(2);
    expect(cashAndCoin[3]).toEqual(1);
    expect(cashAndCoin[4]).toEqual(1);
    expect(cashAndCoin[5]).toEqual(0);
    expect(cashAndCoin[6]).toEqual(0);
    expect(cashAndCoin[7]).toEqual(1);
    expect(cashAndCoin[8]).toEqual(0);

    expect(
      modalReducer(
        { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: 0,
      movieId: ""
    });
  });

  expect(
    modalReducer(
      { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
      {
        type: types.UPDATE_MODAL_SUCCESSED,
        modalSuccess: true,
        modalBuyTicket: false,
        price: 0,
        movieId: ""
      }
    )
  ).toEqual({
    modalSuccess: true,
    modalBuyTicket: false,
    price: 0,
    movieId: ""
  });
});

describe("test case 5", () => {
  const priceOfTicket = 167;
  const ticketTotal = 1;
  const moneyInsert = 1000;
  let change;
  let calculateTotal;

  it("should return the initial state modal", () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalBuyTicket: false,
      modalSuccess: false,
      price: 0,
      movieId: ""
    });
  });

  it("should return the initial state money", () => {
    expect(moneyRecuder(undefined, {})).toEqual({
      money: 0,
      total: 0,
      change: 0
    });
  });

  it("shoud return movie select", () => {
    expect(
      modalReducer(
        { modalBuyTicket: false, modalSuccess: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_BUY_TICKET,
          modalBuyTicket: true,
          price: priceOfTicket,
          movieId: "3da4e5f6s4w48saswD4" // mock movie id like deadpool
        }
      )
    ).toEqual({
      modalBuyTicket: true,
      price: priceOfTicket,
      movieId: "3da4e5f6s4w48saswD4", // mock movie id like deadpool
      modalSuccess: false
    });
  });

  it("shoud return insert cash and coin with calculate", () => {
    expect(
      moneyRecuder(
        { money: 0, total: 0, change: 0 },
        {
          type: types.UPDATE_MONEY,
          money: moneyInsert
        }
      )
    ).toEqual({
      money: moneyInsert,
      total: 0,
      change: 0
    });

    calculateTotal = priceOfTicket * ticketTotal;
    change = moneyInsert - calculateTotal;

    expect(
      moneyRecuder(
        { money: moneyInsert, total: 0, change: 0 },
        {
          type: types.UPDATE_TOTAL_AND_CHANGE,
          total: calculateTotal,
          change: change // money minus price of ticket and multiply total
        }
      )
    ).toEqual({
      money: moneyInsert,
      change: change,
      total: calculateTotal
    });
  });

  it("shoud return success modal and get cash and coin when change", () => {
    expect(
      modalReducer(
        {
          modalBuyTicket: false,
          price: priceOfTicket,
          movieId: "", // mock movie id like deadpool
          modalSuccess: false
        },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: priceOfTicket,
      movieId: ""
    });

    // expect change correct cash and coins
    const cashAndCoin = calculateChangeCashAndCoin(change);
    expect(cashAndCoin[0]).toEqual(0);
    expect(cashAndCoin[1]).toEqual(1);
    expect(cashAndCoin[2]).toEqual(3);
    expect(cashAndCoin[3]).toEqual(0);
    expect(cashAndCoin[4]).toEqual(1);
    expect(cashAndCoin[5]).toEqual(1);
    expect(cashAndCoin[6]).toEqual(0);
    expect(cashAndCoin[7]).toEqual(1);
    expect(cashAndCoin[8]).toEqual(1);

    expect(
      modalReducer(
        { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: 0,
      movieId: ""
    });
  });

  expect(
    modalReducer(
      { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
      {
        type: types.UPDATE_MODAL_SUCCESSED,
        modalSuccess: true,
        modalBuyTicket: false,
        price: 0,
        movieId: ""
      }
    )
  ).toEqual({
    modalSuccess: true,
    modalBuyTicket: false,
    price: 0,
    movieId: ""
  });
});

describe("test case 6", () => {
  const priceOfTicket = 355;
  const ticketTotal = 5;
  const moneyInsert = 5000;
  let change;
  let calculateTotal;

  it("should return the initial state modal", () => {
    expect(modalReducer(undefined, {})).toEqual({
      modalBuyTicket: false,
      modalSuccess: false,
      price: 0,
      movieId: ""
    });
  });

  it("should return the initial state money", () => {
    expect(moneyRecuder(undefined, {})).toEqual({
      money: 0,
      total: 0,
      change: 0
    });
  });

  it("shoud return movie select", () => {
    expect(
      modalReducer(
        { modalBuyTicket: false, modalSuccess: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_BUY_TICKET,
          modalBuyTicket: true,
          price: priceOfTicket,
          movieId: "3da4e5f6s4w48saswD4" // mock movie id like deadpool
        }
      )
    ).toEqual({
      modalBuyTicket: true,
      price: priceOfTicket,
      movieId: "3da4e5f6s4w48saswD4", // mock movie id like deadpool
      modalSuccess: false
    });
  });

  it("shoud return insert cash and coin with calculate", () => {
    expect(
      moneyRecuder(
        { money: 0, total: 0, change: 0 },
        {
          type: types.UPDATE_MONEY,
          money: moneyInsert
        }
      )
    ).toEqual({
      money: moneyInsert,
      total: 0,
      change: 0
    });

    calculateTotal = priceOfTicket * ticketTotal;
    change = moneyInsert - calculateTotal;

    expect(
      moneyRecuder(
        { money: moneyInsert, total: 0, change: 0 },
        {
          type: types.UPDATE_TOTAL_AND_CHANGE,
          total: calculateTotal,
          change: change // money minus price of ticket and multiply total
        }
      )
    ).toEqual({
      money: moneyInsert,
      change: change,
      total: calculateTotal
    });
  });

  it("shoud return success modal and get cash and coin when change", () => {
    expect(
      modalReducer(
        {
          modalBuyTicket: false,
          price: priceOfTicket,
          movieId: "", // mock movie id like deadpool
          modalSuccess: false
        },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: priceOfTicket,
      movieId: ""
    });

    // expect change correct cash and coins
    const cashAndCoin = calculateChangeCashAndCoin(change);
    expect(cashAndCoin[0]).toEqual(3);
    expect(cashAndCoin[1]).toEqual(0);
    expect(cashAndCoin[2]).toEqual(2);
    expect(cashAndCoin[3]).toEqual(0);
    expect(cashAndCoin[4]).toEqual(1);
    expect(cashAndCoin[5]).toEqual(0);
    expect(cashAndCoin[6]).toEqual(1);
    expect(cashAndCoin[7]).toEqual(0);
    expect(cashAndCoin[8]).toEqual(0);

    expect(
      modalReducer(
        { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
        {
          type: types.UPDATE_MODAL_SUCCESS,
          modalSuccess: true
        }
      )
    ).toEqual({
      modalSuccess: true,
      modalBuyTicket: false,
      price: 0,
      movieId: ""
    });
  });

  expect(
    modalReducer(
      { modalSuccess: true, modalBuyTicket: false, price: 0, movieId: "" },
      {
        type: types.UPDATE_MODAL_SUCCESSED,
        modalSuccess: true,
        modalBuyTicket: false,
        price: 0,
        movieId: ""
      }
    )
  ).toEqual({
    modalSuccess: true,
    modalBuyTicket: false,
    price: 0,
    movieId: ""
  });
});

// this function for calculate cash and coin.
const calculateChangeCashAndCoin = change => {
  let cash = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
  let changeCash = [];

  if (change >= 0) {
    cash.forEach((value, index) => {
      const getCash = parseInt(cash[index]);
      changeCash[index] = parseInt(change / getCash);
      change = change - changeCash[index] * getCash;
    });
  }

  return changeCash;
};
