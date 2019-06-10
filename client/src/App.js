import React from "react";
import "./App.css";

import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HeaderComponent from "./components/layout/HeaderComponent";
import MovieComponent from "./components/movie/MovieComponent";

function App() {
  return (
    <Router>
      <div>
        <HeaderComponent />
        <Route path="/" exact component={MovieComponent} />
      </div>
    </Router>
  );
}

export default App;
