import React from "react";
import { Card, Row, Col, Icon } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import moment from "moment";

const { Meta } = Card;

const CardMovieComponent = ({ minValue, maxValue, movies }) => {
  return (
    <div>
      <Row gutter={16}>
        <TransitionGroup>
          {movies.slice(minValue, maxValue).map(movie => {
            return (
              <CSSTransition key={movie._id} timeout={300} classNames="fade">
                <Col lg={8} style={{ padding: "15px 0" }} key={movie._id}>
                  <Card
                    style={{ width: 240, margin: "0 auto" }}
                    cover={
                      <img
                        alt={movie.name}
                        src={`http://localhost:8000/images/${movie.logo}`}
                      />
                    }
                    actions={[<Link to={`/movie/${movie._id}`}><Icon type="eye" /></Link>, <Icon type="pay-circle" />]}
                  >
                    <Meta title={movie.name} />
                    <div className="price-box">
                      <i className="fas fa-money-check-alt cash" />
                      <span>{movie.price}B / 1 seat</span>
                    </div>
                    <div className="sound-box">
                      <i className="fas fa-bullhorn sound" />
                      <span>{movie.soundtrack.title}</span>
                    </div>
                    <div className="date-box">
                      <i className="fas fa-calendar-alt date" />
                      <span>{moment(movie.release_date).format("LL")}</span>
                    </div>
                  </Card>
                </Col>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </Row>
    </div>
  );
};

export default CardMovieComponent;
