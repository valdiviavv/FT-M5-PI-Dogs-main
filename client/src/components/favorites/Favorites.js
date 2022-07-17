import './Favorites.css';
import React,{Component} from "react";
import {Link} from "react-router-dom";

class Favorites extends Component {
    render() {
        return(
          <div className="Favorites">
              <h1>Favorite Dogs</h1>
              <p>
                  <Link to="/details/2">Dog Details 2</Link>
              </p>
              <p>
                  <Link to="/details/4">Dog Details 4</Link>
              </p>
              <br/>
          </div>
        );
    }
}

export default Favorites;
