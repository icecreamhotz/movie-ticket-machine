import React, { Component } from "react";
import { Layout } from "antd";
import MovieServices from "../../services/movie";
import CardMovieComponent from "./CardMovieComponent";

const { Content } = Layout;

class MovieComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true
    };
  }

  componentDidMount() {
    this.loadAllMovies();
  }

  loadAllMovies = async () => {
    const movie = await MovieServices.getAllMovies();
    this.setState({
      movies: movie,
      loading: false
    });
  };

  render() {
    const { movies, loading } = this.state;
    if (loading) return "loading";
    return (
      <div>
        <Content style={{ padding: "0 50px" }}>
          <CardMovieComponent movies={movies} />
        </Content>
      </div>
    );
  }
}

export default MovieComponent;
