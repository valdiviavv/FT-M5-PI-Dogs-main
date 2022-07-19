import './CardList.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";

class CardList extends Component {
    render() {
        return(
          <div className="CardList">
              <h1>Card List</h1>
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

export default CardList;
