import './Nav.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
          <div className="Nav">
              <Link to="/">Home</Link>{" "}
              <Link to="/search-list">Search List</Link>{" "}
              <Link to="/create">Create Dog</Link>{" "}
              <Link to="/favorites">Favorites</Link>{" "}
              <Link to="/about">About</Link>
          </div>
        );
    }
}

export default Nav;
