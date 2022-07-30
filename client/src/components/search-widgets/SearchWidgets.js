import "./SearchWidgets.css";
import React, {Component} from "react";
import {connect} from "react-redux";
import {updateFilteredList, getTemperamentList} from "../../redux/actions";
import dogFields from "../common/dog-fields";
import TemperamentFilter from "../temperament-filter/TemperamentFilter";
import listUtils from "../common/list-utils";

class SearchWidgets extends Component {
    componentDidMount() {
        if (this.props.temperamentList.length === 0) {
            this.props.getTemperamentList();
        }
    }

    state = {
        sourceOption: 'all',
        temperamentOption: 'all',
        searchBreed: '',
        orderOption: 'default-order',
    };

    refreshFilteredList() {
        let newFilteredList;
        newFilteredList = this.getFilteredListByBreed();
        newFilteredList = this.getFilteredListBySource(newFilteredList);
        newFilteredList = this.getFilteredListByTemperament(newFilteredList)
        newFilteredList = this.getOrderedList(newFilteredList);
        const {currentPage, currentPageName} = this.props;
        const pageNumber = 1;
        const newCurrentPage = listUtils.getCurrentPage(currentPage, currentPageName, pageNumber);
        this.props.updateFilteredList(newFilteredList, newCurrentPage);
    }

    getFilteredListByBreed() {
        const {searchBreed} = this.state;
        if(this.props.dogList.length === 0) {
            return [];
        }
        else if(searchBreed === '') { //return the original list without filter.
            return this.props.dogList.slice();
        } else {
            return this.props.dogList.filter(item =>
                item.name.toLowerCase().includes(searchBreed.toLowerCase())
            );
        }
    }

    getFilteredListBySource(filteredList) {
        if(filteredList.length === 0) {
            return filteredList;
        }
        const {sourceOption} = this.state;
        if(sourceOption === 'all') { //return the received list without filter.
            return filteredList;
        } else {
            return this.getFilteredListByVersion(filteredList);
        }
    }

    getFilteredListByTemperament(filteredList) {
        if(filteredList.length === 0) {
            return filteredList;
        }
        const {temperamentOption} = this.state;
        if(temperamentOption === 'all') { //return the received list without filter.
            return filteredList;
        }
        return filteredList.filter(item =>
            dogFields.getTemperamentList(item).includes(temperamentOption)
        );
    }

    getFilteredListByVersion(filteredList) {
        if(filteredList.length === 0) {
            return filteredList;
        }
        const {sourceOption} = this.state;
        return filteredList.filter(item => item.apiVersion === sourceOption);
    }

    getOrderedList(filteredList) {
        if(filteredList.length === 0) {
            return filteredList;
        }
        const {orderOption} = this.state;
        switch (orderOption) {
            case 'a-z':
                return filteredList.sort((a, b) =>
                    (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            case 'z-a':
                return filteredList.sort((a, b) =>
                    (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1);
            case 'min-max':
                return filteredList.sort((a, b) => {
                    const aMin = dogFields.getMinWeight(a);
                    const bMin = dogFields.getMinWeight(b);
                    return aMin > bMin ? 1 : -1;
                });
            case 'max-min':
                return filteredList.sort((a, b) => {
                    const aMax = dogFields.getMaxWeight(a);
                    const bMax = dogFields.getMaxWeight(b);
                    return aMax > bMax ? -1 : 1;
                });
            default: //return the received list without filter.
                return filteredList;
        }
    }

    handleSearchChange(event){
        this.setState({searchBreed: event.target.value});
    }

    handleSourceChange(event) {
        this.setState({sourceOption: event.target.value})
    }

    handleTemperamentChange(event) {
        this.setState({temperamentOption: event.target.value})
    }

    handleOrderChange(event) {
        this.setState({orderOption: event.target.value})
    }

    onSubmitSearch(event) {
        event.preventDefault();
        this.refreshFilteredList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {sourceOption, temperamentOption, orderOption} = this.state;
        if (prevState.sourceOption !== sourceOption ||
            prevState.temperamentOption !== temperamentOption ||
            prevState.orderOption !== orderOption
        ) {
            this.refreshFilteredList();
        }
    }

    render() {
        return (
            <div className="SearchWidgets">
                <div>
                    <form onSubmit={e => this.onSubmitSearch(e)}>
                        <input placeholder="Breed name"
                               value={this.state.searchBreed}
                               onChange={e => this.handleSearchChange(e)}
                        />
                        <button type='submit'>Search</button>
                    </form>
                </div>

                <div>
                    <label htmlFor="source-filter">Filter by source:</label>
                    <select id="source-filter"
                            onChange={(e) => {this.handleSourceChange(e)}}
                            value={this.state.sourceOption}
                    >
                        <option value="all">All</option>
                        <option value="v1">Readonly API</option>
                        <option value="v2">Database API</option>
                    </select>
                </div>

                <TemperamentFilter
                    filterLabel="Filter by temperament:"
                    filterOnChange={(e) => this.handleTemperamentChange(e)}
                    filterSelectedOption={this.state.temperamentOption}
                    filterOptionList={this.props.temperamentList}
                />

                <div>
                    <label htmlFor="sort-list">Order by:</label>
                    <select id="sort-list"
                            onChange={(e) => {this.handleOrderChange(e)}}
                            value={this.state.orderOption}
                    >
                        <option value="default-order">Default order</option>
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
        filteredList: state.filteredList,
        temperamentList: state.temperamentList,
        currentPage: state.currentPage,
    };
}

export const mapDispatchToProps = {updateFilteredList, getTemperamentList};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWidgets);
