import './SearchList.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";

class SearchList extends Component {
    render() {
        return (
          <div className="SearchList">
              <h1>Search List</h1>
              <p>
                  <Link to="/v1/details/1">Dog Details 1a</Link>
              </p>
              <p>
                  <Link to="/v1/details/2">Dog Details 2a</Link>
              </p>
              <p>
                  <Link to="/v2/details/1">Dog Details 1b</Link>
              </p>
              <br/>
          </div>
        );
    }
}

export default SearchList;
