import './Details.css';
import React,{Component} from "react";

class Details extends Component {
    render() {
        const dogId = this.props.match.params.id;
        return(
          <div className="Details">
              <h1>Details Dog '{dogId}'</h1>
          </div>
        );
    }
}

export default Details;
