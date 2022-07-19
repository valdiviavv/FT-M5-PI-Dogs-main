import "./SearchWidgets.css";
import React, {Component} from "react";
import {connect} from "react-redux";
import {updateFilteredList} from "../../redux/actions";

class SearchWidgets extends Component {

    updateFilteredList(filterOption) {
        let filteredList;
        if(filterOption === 'all') {
            filteredList = this.props.dogList;
        } else {
            filteredList = this.getFilteredListByVersion(filterOption);
        }
        this.props.updateFilteredList(filteredList);
    }

    getFilteredListByVersion(versionFilter) {
        if(this.props.dogList.length === 0) {
            return [];
        }
        return this.props.dogList.filter(item => item.apiVersion === versionFilter);
    }

    handleSelectChange(event) {
        console.log("select : ", event.target.value);
        this.updateFilteredList(event.target.value);
    }

    render() {
        return (
            <div className="SearchWidgets">
                <p>Search Widgets</p>
                <label htmlFor="source-filter">Choose source:</label>
                <select id="source-filter" onChange={(e) => {this.handleSelectChange(e)}}>
                    <option value="all">All</option>
                    <option value="v1">Readonly API</option>
                    <option value="v2">Database API</option>
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

export const mapDispatchToProps = {updateFilteredList};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWidgets);
