import "./SearchWidgets.css";
import React, {Component} from "react";
import {connect} from "react-redux";
import {updateFilteredList} from "../../redux/actions";
import dogFields from "../common/dog-fields";

class SearchWidgets extends Component {

    state = {
        sourceOption: 'all',
        searchBreed: '',
        orderOption: 'a-z',
    };


    refreshFilteredList(sourceOption, orderOption) {
        let filteredList = this.getFilteredList(sourceOption);
        filteredList = this.getOrderedList(filteredList, orderOption);
        this.props.updateFilteredList(filteredList);
    }

    getFilteredList(sourceOption) {
        if(sourceOption === 'all') {
            return this.props.dogList.slice();
        } else {
            return this.getFilteredListByVersion(sourceOption);
        }
    }

    getFilteredListByVersion(versionFilter) {
        if(this.props.dogList.length === 0) {
            return [];
        }
        return this.props.dogList.filter(item => item.apiVersion === versionFilter);
    }

    getOrderedList(filteredList, orderOption) {
        let newOrderedList = filteredList.slice();
        switch (orderOption) {
            case 'a-z':
                return newOrderedList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            case 'z-a':
                return newOrderedList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1);
            case 'min-max':
                return newOrderedList.sort((a, b) => {
                    const aMin = dogFields.getMinWeight(a);
                    const bMin = dogFields.getMinWeight(b);
                    return aMin > bMin ? 1 : -1;
                });
            case 'max-min':
                return newOrderedList.sort((a, b) => {
                    const aMax = dogFields.getMaxWeight(a);
                    const bMax = dogFields.getMaxWeight(b);
                    return aMax > bMax ? -1 : 1;
                });
            default:
                return this.props.dogList.slice();
        }
    }

    handleSelectChange(event) {
        this.setState({sourceOption: event.target.value})
    }

    handleOrderChange(event) {
        this.setState({orderOption: event.target.value})
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {sourceOption, orderOption} = this.state;
        if (prevState.sourceOption !== sourceOption ||
            prevState.orderOption !== orderOption
        ) {
            this.refreshFilteredList(sourceOption, orderOption);
        }
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

                <div>
                    <label htmlFor="sort-list">Order by:</label>
                    <select id="sort-list"
                            onChange={(e) => {this.handleOrderChange(e)}}
                            value={this.state.orderOption}
                    >
                        <option value="a-z">Alphabet A-Z</option>
                        <option value="z-a">Alphabet Z-A</option>
                        <option value="min-max">Weight min-max</option>
                        <option value="max-min">Weight max-min</option>
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
