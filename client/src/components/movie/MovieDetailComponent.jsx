import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Layout, Typography, Button, Icon } from "antd";
import MovieServices from "../../services/movie";
import { Link } from "react-router-dom";
import moment from "moment";
import ModalBuyTicket from "./ModalBuyTicket";
import ModalSuccess from "./ModalSuccess";
import "./detail.scss";
import { connect } from "react-redux";
import { setModalBuyTicket } from "../../actions/modal";
import ContentLoader from "react-content-loader";

const { Content } = Layout;
const { Title, Text } = Typography;

const DetailLoader = () => (
  <div className="movie-detail-wrapper">
    <div className="movie-detail">
      <div className="poster-wrapper" style={{ width: 175, height: 250 }}>
        <ContentLoader
          speed={2}
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
          height={250}
          width={175}
        >
          <rect x="0" y="0" rx="4" ry="4" width="175" height="250" />
        </ContentLoader>
      </div>
      <ContentLoader
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
        height={200}
        width={200}
      >
        <rect x="1" y="1" width="180" height="6" />
        <rect x="1" y="25" width="25" height="3" />
        <rect x="30" y="25" width="45" height="3" />
        <rect x="1" y="45" width="25" height="3" />
        <rect x="1" y="55" width="150" height="3" />
        <rect x="1" y="65" width="120" height="3" />
        <rect x="1" y="75" width="170" height="3" />
        <rect x="1" y="85" width="115" height="3" />
        <rect x="1" y="95" width="140" height="3" />
        <circle cx="4" cy="115" r="4" />
        <rect x="10" y="114" width="40" height="3" />
        <circle cx="4" cy="125" r="4" />
        <rect x="10" y="124" width="40" height="3" />
        <rect x="1" y="160" width="200" height="8" />
      </ContentLoader>
    </div>
  </div>
);

class MovieDetailComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: null,
      loading: true
    };
  }

  componentDidMount() {
    this.loadMovieDetailById();
  }

  loadMovieDetailById = async () => {
    const movie = await MovieServices.getMovieDetailById(
      this.props.match.params.id
    );

    this.setState({
      movie: movie,
      loading: false
    });
  };

  render() {
    const { movie, loading } = this.state;
    return (
      <div>
        <Content style={{ padding: 50 }}>
          <Link to="/">
            <div className="sound-box">
              <Icon type="left" style={{ marginBottom: 10, marginRight: 15 }} />
              <span>
                <Title level={4}>Back to homepage</Title>
              </span>
            </div>
          </Link>
          {!loading ? (
            <div className="movie-detail-wrapper">
              <div className="movie-detail">
                <div className="poster-wrapper">
                  <img
                    alt={movie.name}
                    src={`http://localhost:8000/images/${movie.logo}`}
                  />
                </div>
                <Row>
                  <Col lg={24}>
                    <Title>{movie.name}</Title>
                  </Col>
                  <Col lg={24} style={{ paddingTop: 15 }}>
                    Release Date : {moment(movie.release_date).format("LL")}
                  </Col>
                  <Col lg={24} style={{ paddingTop: 15 }}>
                    <Text>Description</Text>
                    <br />
                    <Text>{movie.description}</Text>
                  </Col>
                  <Col lg={24}>
                    <div className="price-box">
                      <i
                        className="fas fa-money-check-alt cash"
                        style={{ fontSize: 20 }}
                      />
                      <span>{movie.price} B / 1 seat</span>
                    </div>
                  </Col>
                  <Col lg={24}>
                    <div className="sound-box">
                      <i
                        className="fas fa-bullhorn sound"
                        style={{ fontSize: 20 }}
                      />
                      <span>{movie.soundtrack.title}</span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ paddingTop: 30 }}>
                    <Button
                      type="primary"
                      icon="pay-circle"
                      block
                      onClick={() =>
                        this.props.setModalBuyTicket(
                          true,
                          movie.price,
                          movie._id
                        )
                      }
                    >
                      BUY TICKET NOW
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          ) : (
            <DetailLoader />
          )}
        </Content>
        <ModalBuyTicket />
        <ModalSuccess />
      </div>
    );
  }
}

MovieDetailComponent.propTypes = {
  setModalBuyTicket: PropTypes.func.isRequired
};

export default connect(
  null,
  { setModalBuyTicket: setModalBuyTicket }
)(MovieDetailComponent);
