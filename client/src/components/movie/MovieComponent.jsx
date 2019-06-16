import React, { Component } from "react";
import { Layout, Pagination, Row, Col, Typography, Select, Input } from "antd";
import MovieServices from "../../services/movie";
import CardMovieComponent from "./CardMovieComponent";
import { CSSTransition } from "react-transition-group";
import "./card.scss";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const choiceFilter = [
  "Default",
  "Sort by release date ascending.",
  "Sort by release date descending.",
  "Sort by price ascending.",
  "Sort by price descending."
];
const optionFilter = [];

for (let i = 0; i < choiceFilter.length; i++) {
  optionFilter.push(
    <Option key={i} value={i}>
      {choiceFilter[i]}
    </Option>
  );
}

class MovieComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true,
      minValue: 0,
      maxValue: 9,
      movieSearch: "",
      filterChoice: 0,
      current: 1,
      backupMovies: []
    };
  }

  componentDidMount() {
    this.loadAllMovies();
  }

  loadAllMovies = async () => {
    const movie = await MovieServices.getAllMovies();
    this.setState({
      movies: movie,
      loading: false,
      backupMovies: movie
    });
  };

  handleChangeSearchTextMovie = e => {
    const searchValue = e.target.value.toLowerCase();
    const movies = this.state.backupMovies;

    // regex
    const regexSpecialText = /[ !@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/;

    // detect special alphabet before searching
    if (regexSpecialText.test(searchValue)) {
      this.setState({ movieSearch: searchValue });
      return;
    }

    const filterMovie = this.searchTextMovie(searchValue, movies);

    this.setState({ movieSearch: searchValue, movies: filterMovie }, () =>
      // check filter is empty or not if not will search by name and filter too.
      this.filterMovieDataByTextAndChoice()
    );
  };

  searchTextMovie = (searchValue, movies) => {
    const regexText = new RegExp(`^.*${searchValue}.*$`, "i");
    const filterMovie = movies.filter(({ name }) =>
      name.toLowerCase().match(regexText)
    );
    return filterMovie;
  };

  handleChangeFilterChoice = value => {
    this.setState({ filterChoice: value, loading: true }, () =>
      // check filter without movie name
      this.filterMovieDataByChoice()
    );
  };

  handleChangePage = value => {
    const totalPerPage = 9;
    let minValue;
    let maxValue;
    if (value <= 1) {
      minValue = 0;
      maxValue = totalPerPage;
    } else {
      minValue = totalPerPage * (value - 1);
      maxValue = value * totalPerPage;
    }
    this.setState({
      minValue: minValue,
      maxValue: maxValue,
      current: value
    });
  };

  filterMovieDataByTextAndChoice = () => {
    const { movieSearch, backupMovies } = this.state;
    //check empty both or no
    let filterMovie = [];
    if (movieSearch === "") {
      // send backupmovies becuase need old data
      filterMovie = this.caseFilter(backupMovies);
    } else {
      // filter text movies
      filterMovie = this.searchTextMovie(movieSearch, backupMovies);
      // filter using case
      filterMovie = this.caseFilter(filterMovie);
    }

    this.setState({
      movies: filterMovie,
      minValue: 0,
      maxValue: 9,
      current: 1,
      loading: false
    });
  };

  filterMovieDataByChoice = () => {
    const { movies } = this.state;
    // send movies to arguments because need current data when has text seach
    const filterMovie = this.caseFilter(movies);
    this.setState({
      movies: filterMovie,
      minValue: 0,
      maxValue: 9,
      current: 1,
      loading: false
    });
  };

  caseFilter = filterMovie => {
    const { filterChoice } = this.state;
    let newFilterMovie = [];
    switch (filterChoice) {
      case 0:
        newFilterMovie = this.filterPreviousMovies(filterMovie);
        break;
      case 1:
        newFilterMovie = this.filterReleaseDateASC(filterMovie);
        break;
      case 2:
        newFilterMovie = this.filterReleaseDateDESC(filterMovie);
        break;
      case 3:
        newFilterMovie = this.filterPriceASC(filterMovie);
        break;
      case 4:
        newFilterMovie = this.filterPriceDESC(filterMovie);
        break;
      default:
        break;
    }
    return newFilterMovie;
  };

  filterPreviousMovies = movieSearch => {
    // filter _id using text or old data
    return movieSearch.sort(function(a, b) {
      // return if less than b
      if (a._id < b._id) {
        return -1;
      }
      // return if more than b
      if (a._id > b._id) {
        return 1;
      }
      // return if equal
      return 0;
    });
  };

  filterReleaseDateASC = movieSearch => {
    // filter release date by asc
    return movieSearch.sort((a, b) => {
      return new Date(a.release_date) - new Date(b.release_date);
    });
  };

  filterReleaseDateDESC = movieSearch => {
    // filter release date by desc
    return movieSearch.sort((a, b) => {
      return new Date(b.release_date) - new Date(a.release_date);
    });
  };

  filterPriceASC = movieSearch => {
    // filter price by asc
    return movieSearch.sort((a, b) => {
      return a.price - b.price;
    });
  };

  filterPriceDESC = movieSearch => {
    // filter price by desc
    return movieSearch.sort((a, b) => {
      return b.price - a.price;
    });
  };

  render() {
    const {
      movies,
      loading,
      minValue,
      maxValue,
      movieSearch,
      current
    } = this.state;
    return (
      <div>
        <Content style={{ padding: "0 50px" }}>
          <Row gutter={16} style={{ paddingTop: 30, paddingBottom: 15 }}>
            <Col lg={14}>
              <Title level={3}>Search movies</Title>
              <Input
                placeholder="Search movie like Godzilla, Dark Pheonix"
                value={movieSearch}
                onChange={this.handleChangeSearchTextMovie}
              />
            </Col>
            <Col lg={10}>
              <Title level={3}>Filter movies</Title>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select your choice.If you need to filter some data"
                onChange={this.handleChangeFilterChoice}
                defaultValue={"Default"}
              >
                {optionFilter}
              </Select>
            </Col>
          </Row>
          <CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames="fade"
          >
            <CardMovieComponent
              minValue={minValue}
              maxValue={maxValue}
              movies={movies}
              loading={loading}
            />
          </CSSTransition>
          <Row>
            <Col align="center">
              <Pagination
                defaultCurrent={current}
                defaultPageSize={maxValue}
                current={current}
                onChange={this.handleChangePage}
                total={movies.length}
              />
            </Col>
          </Row>
        </Content>
      </div>
    );
  }
}

export default MovieComponent;
