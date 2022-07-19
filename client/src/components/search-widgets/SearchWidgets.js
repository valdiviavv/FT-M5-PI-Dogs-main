import "./SearchWidgets.css";
import React, {Component} from "react";

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

export default SearchWidgets;
