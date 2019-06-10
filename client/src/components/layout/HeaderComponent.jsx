import React, { Component } from "react";
import { Layout } from "antd";
import logo from "../../resource/images/logo.png";
import { NavLink, Link } from "react-router-dom";

import "./header.scss";

const { Content } = Layout;

class HeaderComponent extends Component {
  render() {
    return (
      <nav>
        <Content style={{ background: "gray", padding: "0 50px" }}>
          <div
            className="thinknet-header"
            style={{ paddingTop: 24, paddingBottom: 12, minHeight: 100 }}
          >
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="thinknet-header-menu">
              <ul className="thinknet-header-ul">
                <li>
                  <NavLink to="/" exact activeClassName="active">
                    Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/receipt" exact activeClassName="active">
                    Receipt
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="social">
              <span className="fab fa-facebook" />
              <span className="fab fa-twitter" />
              <span className="fab fa-pinterest" />
            </div>
          </div>
        </Content>
      </nav>
    );
  }
}

export default HeaderComponent;
