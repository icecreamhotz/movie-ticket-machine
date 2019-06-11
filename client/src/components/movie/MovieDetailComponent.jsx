import React, { Component } from "react";
import { Row, Col, Layout, Typography, Button, Icon } from "antd";
import MovieServices from "../../services/movie";
import { Link } from "react-router-dom";
import moment from "moment";
import "./detail.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

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

    console.log(movie);

    this.setState({
      movie: movie,
      loading: false
    });
  };

  render() {
    const { movie, loading } = this.state;
    if (loading) return "loading";
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
                  <Button type="primary" icon="pay-circle" block>
                    BUY TICKET NOW
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
      </div>
    );
  }
}

export default MovieDetailComponent;
