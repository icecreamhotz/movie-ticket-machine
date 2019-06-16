import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { setModalSuccess, setModalSuccessed } from "../../actions/modal";
import { setTotalAndChange, deceaseMoney } from "../../actions/money";
import { connect } from "react-redux";
import { Modal, Typography } from "antd";
import { Redirect } from "react-router-dom";

const { Title } = Typography;

const ModalSuccess = ({
  open,
  change,
  setModalSuccess,
  setModalSuccessed,
  setTotalAndChange,
  deceaseMoney
}) => {
  const [active, setActive] = useState(false);
  const cashAndCoins = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
  let changeWord = [];
  let changeCashAndCoins = [];
  let currentChange = change;
  if (change > 0) {
    cashAndCoins.forEach((value, index) => {
      const cash = parseInt(value);
      changeCashAndCoins[index] = parseInt(currentChange / cash);
      currentChange = currentChange - changeCashAndCoins[index] * cash;
      if (changeCashAndCoins[index] > 0) {
        changeWord = [
          ...changeWord,
          `${value >= 20 ? "Cash: " : "Coin :"}${value} x ${
            changeCashAndCoins[index]
          }`
        ];
      }
    });
  }

  const memoizedHandleClick = useCallback(
    () => {
      setModalSuccessed(false);
      setTotalAndChange(0, 0);
      deceaseMoney(0);
      setActive(true);
    },
    [deceaseMoney, setModalSuccessed, setTotalAndChange] // Tells React to memoize regardless of arguments.
  );

  if (active) return <Redirect to="/receipt" />;

  return (
    <div>
      <Modal
        title="Buy Ticket Success."
        visible={open}
        onOk={() => memoizedHandleClick()}
        onCancel={() => memoizedHandleClick()}
      >
        <Title level={4}>
          Success ! Transaction has doned.
          <br />
          <h6>*If you field your email please check in inbox email.</h6>
        </Title>
        <Title level={4}>
          {changeWord.length > 0
            ? "Please get the change\n"
            : "Your have not a change, We hope to serve you again next time."}
        </Title>
        {changeWord.length > 0 &&
          changeWord.map((item, key) => {
            return (
              <span key={key}>
                {item}
                <br />
              </span>
            );
          })}
      </Modal>
    </div>
  );
};

ModalSuccess.propTypes = {
  open: PropTypes.bool.isRequired,
  change: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    open: state.modal.modalSuccess,
    change: state.money.change
  };
}

export default connect(
  mapStateToProps,
  {
    setModalSuccess: setModalSuccess,
    setModalSuccessed: setModalSuccessed,
    setTotalAndChange: setTotalAndChange,
    deceaseMoney: deceaseMoney
  }
)(ModalSuccess);
