import './Details.css';
import React,{Component} from "react";

class Details extends Component {

    getDetailType(match) {
        if (match.url.includes("v1")) {
            return "read-only-api";
        } else {
            return "database-api";
        }
    }

    render() {
        const dogId = this.props.match.params.id;
        const detailType = this.getDetailType(this.props.match);
        return(
          <div className="Details">
              <h1>Details Dog '{dogId}'</h1>
              <p>Details from: {detailType}</p>
          </div>
        );
    }
}

export default Details;
