import './SearchList.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";

class SearchList extends Component {
    render() {
        return (
          <div className="SearchList">
              <h1>Search List</h1>
              <p>
                  <Link to="/details/1">Dog Details 1</Link>
              </p>
              <p>
                  <Link to="/details/2">Dog Details 2</Link>
              </p>
              <p>
                  <Link to="/details/3">Dog Details 3</Link>
              </p>
              <br/>
          </div>
        );
    }
}

export default SearchList;
