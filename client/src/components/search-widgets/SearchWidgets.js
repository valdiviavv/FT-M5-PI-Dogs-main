import "./SearchWidgets.css";
import React, {Component} from "react";
import {connect} from "react-redux";
import {updateFilteredList} from "../../redux/actions";

class SearchWidgets extends Component {

    state = {sourceOption: 'all', searchBreed: ''};

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
        this.setState({sourceOption: event.target.value})
        this.updateFilteredList(event.target.value);
    }

    onSubmitSearch(event) {
        event.preventDefault();
        if(this.state.searchBreed === '') {
            this.updateFilteredList(this.state.sourceOption);
            return;
        }
        const newFilteredList = this.props.filteredList.filter(item =>
            item.name.toLowerCase().includes(this.state.searchBreed.toLowerCase())
        );
        this.props.updateFilteredList(newFilteredList);
    }

    render() {
        return (
            <div className="SearchWidgets">
                <div>
                    <form onSubmit={e => this.onSubmitSearch(e)}>
                        <input placeholder="Breed name"
                               value={this.state.searchBreed}
                               onChange={e => this.setState({searchBreed: e.target.value})}
                        />
                        <button type='submit'>Search</button>
                    </form>
                </div>
                <div>
                    <label htmlFor="source-filter">Choose source:</label>
                    <select id="source-filter"
                            onChange={(e) => {this.handleSelectChange(e)}}
                            value={this.state.sourceOption}
                    >
                        <option value="all">All</option>
                        <option value="v1">Readonly API</option>
                        <option value="v2">Database API</option>
                    </select>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dogList: state.dogList,
        filteredList: state.filteredList
    };
}

export const mapDispatchToProps = {updateFilteredList};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWidgets);
