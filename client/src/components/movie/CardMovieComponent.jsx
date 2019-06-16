import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Icon } from "antd";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { setModalBuyTicket } from "../../actions/modal";
import ModalBuyTicket from "./ModalBuyTicket";
import ModalSuccess from "./ModalSuccess";
import ContentLoader from "react-content-loader";

const { Meta } = Card;

const CardMovieLoader = ({ _id }) => {
  return (
    <Col lg={8} style={{ height: 400 }} key={_id}>
      <ContentLoader
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        height={400}
        width={400}
      >
        <rect x="50" y="7" rx="4" ry="4" width="150" height="180" />
        <rect x="25" y="205" width="150" height="10" />
        <circle cx="30" cy="240" r="10" />
        <rect x="50" y="240" width="150" height="5" />
        <circle cx="30" cy="270" r="10" />
        <rect x="50" y="270" width="150" height="5" />
        <circle cx="30" cy="300" r="10" />
        <rect x="50" y="300" width="150" height="5" />
        <rect x="25" y="330" width="80" height="8" />
        <rect x="120" y="330" width="80" height="8" />
      </ContentLoader>
    </Col>
  );
};

let elementLoader = [];
for (let i = 0; i < 9; i++) {
  elementLoader.push(<CardMovieLoader key={i} _id={i} />);
}

const CardMovieComponent = ({
  minValue,
  maxValue,
  movies,
  loading,
  setModalBuyTicket
}) => {
  if (loading) return <Row>{elementLoader}</Row>;
  console.log(movies);
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
                    actions={[
                      <Link to={`/movie/${movie._id}`}>
                        <Icon type="eye" />
                      </Link>,
                      <Icon
                        type="pay-circle"
                        onClick={() =>
                          setModalBuyTicket(true, movie.price, movie._id)
                        }
                      />
                    ]}
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
      <ModalBuyTicket />
      <ModalSuccess />
    </div>
  );
};

CardMovieComponent.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
      soundtrack: PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    })
  ).isRequired,
  setModalBuyTicket: PropTypes.func.isRequired
  // loading: PropTypes.bool.isRequired
};

export default connect(
  null,
  { setModalBuyTicket: setModalBuyTicket }
)(CardMovieComponent);
