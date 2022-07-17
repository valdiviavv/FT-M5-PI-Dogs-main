import React, {Component} from "react";
import {Link} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
          <div>
              <Link to="/">Home</Link>
              <hr/>
          </div>
        );
    }
}

export default Nav;
