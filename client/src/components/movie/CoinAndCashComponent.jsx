import React from "react";
import PropTypes from "prop-types";
import { Button, Typography, Row, Col } from "antd";
import { setMoney } from "../../actions/money";
import { connect } from "react-redux";

const { Title } = Typography;

const CoinAndCashComponent = ({ updateMoney }) => {
  return (
    <div>
      <Title level={4}>Coin</Title>
      <Row>
        <Col lg={24}>
          <Button type="primary" shape="circle" onClick={() => updateMoney(1)}>
            1
          </Button>
          <Button
            type="primary"
            shape="circle"
            style={{ marginLeft: 15 }}
            onClick={() => updateMoney(2)}
          >
            2
          </Button>
          <Button
            type="primary"
            shape="circle"
            style={{ marginLeft: 15 }}
            onClick={() => updateMoney(5)}
          >
            5
          </Button>
          <Button
            type="primary"
            shape="circle"
            style={{ marginLeft: 15 }}
            onClick={() => updateMoney(10)}
          >
            10
          </Button>
        </Col>
      </Row>
      <Title level={4}>Cash</Title>
      <Row>
        <Col lg={24}>
          <Button type="primary" onClick={() => updateMoney(20)}>
            20
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 15 }}
            onClick={() => updateMoney(50)}
          >
            50
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 15 }}
            onClick={() => updateMoney(100)}
          >
            100
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 15 }}
            onClick={() => updateMoney(500)}
          >
            500
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 15 }}
            onClick={() => updateMoney(1000)}
          >
            1000
          </Button>
        </Col>
      </Row>
    </div>
  );
};

CoinAndCashComponent.propTypes = {
  updateMoney: PropTypes.func.isRequired
};

export default connect(
  null,
  { updateMoney: setMoney }
)(CoinAndCashComponent);
