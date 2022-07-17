import './Favorites.css';
import React,{Component} from "react";
import {Link} from "react-router-dom";

class Favorites extends Component {
    render() {
        return(
          <div className="Favorites">
              <h1>Favorite Dogs</h1>
              <p>
                  <Link to="/v1/details/2">Dog Details 2a</Link>
              </p>
              <p>
                  <Link to="/v2/details/4">Dog Details 4b</Link>
              </p>
              <br/>
          </div>
        );
    }
}

export default Favorites;
