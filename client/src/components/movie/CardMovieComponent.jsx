import React from "react";
import { Card, Row, Col, Icon } from "antd";
import "./card.scss";

const { Meta } = Card;

const CardMovieComponent = ({ movies }) => {
  return (
    <div>
      <Row gutter={16}>
        {movies.map(movie => {
          return (
            <Col lg={8} style={{ padding: "15px 0" }}>
              <Card
                hoverable
                style={{ width: 240, margin: "0 auto" }}
                cover={
                  <img
                    alt="example"
                    src={`http://localhost:8000/images/${movie.logo}`}
                  />
                }
                actions={[<Icon type="eye" />, <Icon type="pay-circle" />]}
              >
                <Meta title={movie.name} />
                <div className="price-box">
                  <i class="fas fa-money-check-alt cash" />
                  <span>{movie.price}B / 1 seat</span>
                </div>
                <div className="sound-box">
                  <i class="fas fa-bullhorn sound" />
                  <span>{movie.soundtrack.title}</span>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default CardMovieComponent;
