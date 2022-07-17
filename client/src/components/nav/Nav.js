import './Nav.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
          <div className="Nav">
              <Link to="/">Home</Link>{" "}
              <Link to="/search-list">Search List</Link>
              <hr/>
          </div>
        );
    }
}

export default Nav;
