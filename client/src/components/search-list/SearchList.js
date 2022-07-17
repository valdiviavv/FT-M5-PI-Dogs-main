import './SearchList.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getDogList } from "../../redux/actions";

class SearchList extends Component {
    componentDidMount() {
        this.props.getDogList();
    }

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

const mapStateToProps = (state) => {
    console.log("Search list state: ", state);
    return {dogList: state.dogList }
}

export const mapDispatchToProps = {getDogList};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
