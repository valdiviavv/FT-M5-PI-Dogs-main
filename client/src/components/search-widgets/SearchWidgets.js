import "./SearchWidgets.css";
import React, {Component} from "react";
import {connect} from "react-redux";

class SearchWidgets extends Component {
    render() {
        return (
            <div className="SearchWidgets">
                <p>Search Widgets</p>
                <label htmlFor="source-filter">Choose source:</label>

                <select id="source-filter">
                    <option value="all">All</option>
                    <option value="database-api">Database API</option>
                    <option value="readonly-api">Readonly API</option>
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Search Widgets state : ", state);
    return {
        dogList: state.dogList,
        filteredList: state.filteredList
    };
}

export default connect(mapStateToProps)(SearchWidgets);
