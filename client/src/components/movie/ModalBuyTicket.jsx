import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Input, Button, Row, Col, Typography } from "antd";
import { connect } from "react-redux";
import { setModalBuyTicket, setModalSuccess } from "../../actions/modal";
import { setMoney, deceaseMoney, setTotalAndChange } from "../../actions/money";
import ReserveServices from "../../services/reserve";

import CoinAndCashComponent from "./CoinAndCashComponent";

const { Text } = Typography;

class ModalBuyTicket extends Component {
  state = { loading: false };
  componentWillReceiveProps(nextProps) {
    if (nextProps.money !== this.props.money) {
      const change = nextProps.money - this.props.total;
      this.props.setTotalAndChange(this.props.total, change);
    }
  }

  handleOk = () => {
    this.props.setModalBuyTicket(false);
  };

  handleCancel = () => {
    this.props.setModalBuyTicket(false);
  };

  checkIsNumber = (rule, value, callback) => {
    const { price, money } = this.props;
    if (typeof value !== "undefined") {
      if (value !== "") {
        if (isNaN(value)) {
          callback("Wrong Total, Try Again !");
        } else {
          const total = value * price;
          const change = money - total;
          this.props.setTotalAndChange(total, change);
        }
      }
    } else {
      this.props.setTotalAndChange(0, money);
    }
    callback();
  };

  checkTotalSeatPriceIsLessThanMoney = (rule, value, callback) => {
    const { money, total } = this.props;
    if (total > money) {
      callback("Please insert more cash and coins !");
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(
      ["money", "seat", "email"],
      { force: true },
      (err, values) => {
        if (!err) {
          this.insertReserveTicketFunc(values);
        }
      }
    );
  };

  insertReserveTicketFunc = async ({ email, money, seat }) => {
    console.log(email);
    this.setState({
      loading: true
    });
    const { total, change, movieId } = this.props;
    const createdAt = new Date().toISOString();

    const data = {
      email: typeof email === "undefined" ? "" : email,
      price_total: total,
      money: money,
      change_total: change,
      people_total: seat,
      createdAt: createdAt,
      movieId: movieId
    };

    await ReserveServices.reserveTicket(data)
      .then(() => {
        this.setState(
          {
            loading: false
          },
          () => {
            this.props.form.resetFields();
            this.props.setModalBuyTicket(false);
            this.props.setModalSuccess(true);
          }
        );
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { loading } = this.state;
    const { open, price, money, total, change } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Modal
          title="Choose your total seat."
          visible={open}
          footer={null}
          onCancel={() => this.props.setModalBuyTicket(false, 0, "")}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="E-mail" extra="* Optional" required={false}>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Seats" extra={`1 seat / ${price} Bath`}>
              {getFieldDecorator("seat", {
                rules: [
                  { required: true, message: "Please input your seat!" },
                  {
                    validator: this.checkIsNumber
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Money">
              {getFieldDecorator("money", {
                initialValue: money,
                rules: [
                  { required: true, message: "Please input your money!" },
                  { validator: this.checkTotalSeatPriceIsLessThanMoney }
                ]
              })(<Input disabled />)}
            </Form.Item>
            <CoinAndCashComponent />
            <Row style={{ paddingTop: 30 }}>
              <Col lg={4}>
                <span className="ant-modal-title">Total:</span>
              </Col>
              <Col align="right">{`${total}B`}</Col>
            </Row>
            <Row>
              <Col lg={4}>
                <span className="ant-modal-title">Money:</span>
              </Col>
              <Col align="right">
                <Text
                  type={`${money < total ? "danger" : ""}`}
                >{`${money}B`}</Text>
              </Col>
            </Row>
            <Row style={{ paddingBottom: 30 }}>
              <Col lg={4}>
                <span className="ant-modal-title">Change:</span>
              </Col>
              <Col align="right">{`${change}B`}</Col>
            </Row>
            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Check Out
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

ModalBuyTicket.propTypes = {
  open: PropTypes.bool.isRequired,
  money: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  updateMoney: PropTypes.func.isRequired,
  setModalBuyTicket: PropTypes.func.isRequired,
  deceaseMoney: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  movieId: PropTypes.string.isRequired,
  setModalSuccess: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    open: state.modal.modalBuyTicket,
    money: state.money.money,
    price: state.modal.price,
    total: state.money.total,
    change: state.money.change,
    movieId: state.modal.movieId
  };
}

export default Form.create({ name: "modalbuyticket" })(
  connect(
    mapStateToProps,
    {
      setModalBuyTicket: setModalBuyTicket,
      updateMoney: setMoney,
      deceaseMoney: deceaseMoney,
      setTotalAndChange: setTotalAndChange,
      setModalSuccess: setModalSuccess
    }
  )(ModalBuyTicket)
);
