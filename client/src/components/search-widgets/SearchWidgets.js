import "./SearchWidgets.css";
import React, {Component} from "react";
import {connect} from "react-redux";
import {updateFilteredList, getTemperamentList, updateFilterOptions} from "../../redux/actions";
import dogFields from "../common/dog-fields";
import TemperamentFilter from "../temperament-filter/TemperamentFilter";
import listUtils from "../common/list-utils";

class SearchWidgets extends Component {
    componentDidMount() {
        if (this.props.temperamentList.length === 0) {
            this.props.getTemperamentList();
        }
    }

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
        const {searchBreed} = this.props.filterOptions;
        if(this.props.dogList.length === 0) {
            return [];
        }
        else if(searchBreed.length === 0) { //return the original list without filter.
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
        const {sourceOption} = this.props.filterOptions;
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
        const {temperamentOption} = this.props.filterOptions;
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
        const {sourceOption} = this.props.filterOptions;
        return filteredList.filter(item => item.apiVersion === sourceOption);
    }

    getOrderedList(filteredList) {
        if(filteredList.length === 0) {
            return filteredList;
        }
        const {orderOption} = this.props.filterOptions;
        switch (orderOption) {
            case 'a-z':
                return filteredList.sort((a, b) =>
                    (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            case 'z-a':
                return filteredList.sort((a, b) =>
                    (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 1);
            case 'weight-min-max':
                return filteredList.sort((a, b) => {
                    const aMin = dogFields.getMinWeight(a);
                    const bMin = dogFields.getMinWeight(b);
                    return aMin > bMin ? 1 : -1;
                });
            case 'weight-max-min':
                return filteredList.sort((a, b) => {
                    const aMax = dogFields.getMaxWeight(a);
                    const bMax = dogFields.getMaxWeight(b);
                    return aMax > bMax ? -1 : 1;
                });
            case 'height-min-max':
                return filteredList.sort((a, b) => {
                    const aMin = dogFields.getMinHeight(a);
                    const bMin = dogFields.getMinHeight(b);
                    return aMin > bMin ? 1 : -1;
                });
            case 'height-max-min':
                return filteredList.sort((a, b) => {
                    const aMax = dogFields.getMaxHeight(a);
                    const bMax = dogFields.getMaxHeight(b);
                    return aMax > bMax ? -1 : 1;
                });
            default: //return the received list without filter.
                return filteredList;
        }
    }

    handleSearchChange(event){
        const newFilterOptions = {
            ...this.props.filterOptions,
            searchBreed: event.target.value
        };
        this.props.updateFilterOptions(newFilterOptions);
    }

    handleSourceChange(event) {
        const newFilterOptions = {
            ...this.props.filterOptions,
            sourceOption: event.target.value
        };
        this.props.updateFilterOptions(newFilterOptions);
    }

    handleTemperamentChange(event) {
        const newFilterOptions = {
            ...this.props.filterOptions,
            temperamentOption: event.target.value
        };
        this.props.updateFilterOptions(newFilterOptions)
    }

    handleOrderChange(event) {
        const newFilterOptions = {
        ...this.props.filterOptions,
            orderOption: event.target.value,
        }
        this.props.updateFilterOptions(newFilterOptions)
    }

    onSubmitSearch(event) {
        event.preventDefault();
        this.refreshFilteredList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {sourceOption, temperamentOption, orderOption} = this.props.filterOptions;
        if (prevProps.filterOptions.sourceOption !== sourceOption ||
            prevProps.filterOptions.temperamentOption !== temperamentOption ||
            prevProps.filterOptions.orderOption !== orderOption
        ) {
            this.refreshFilteredList();
        }
    }

    render() {
        return (
            <div className="SearchWidgets">
                <div className="filterInlineButtons">
                    <div className='searchInput'>
                        <form onSubmit={e => this.onSubmitSearch(e)}>
                            <input placeholder="Breed name"
                                   value={this.props.filterOptions.searchBreed}
                                   onChange={e => this.handleSearchChange(e)}
                            />
                            <button type='submit'>Search</button>
                        </form>
                    </div>

                    <div className='filterSelect'>
                        <label htmlFor="sort-list">Order by:</label>
                        <select id="sort-list"
                                onChange={(e) => {this.handleOrderChange(e)}}
                                value={this.props.filterOptions.orderOption}
                        >
                            <option value="default-order">Default order</option>
                            <option value="a-z">Alphabet A-Z</option>
                            <option value="z-a">Alphabet Z-A</option>
                            <option value="weight-min-max">Weight min-max</option>
                            <option value="weight-max-min">Weight max-min</option>
                            <option value="height-min-max">Height min-max</option>
                            <option value="height-max-min">Height max-min</option>
                        </select>
                    </div>
                </div>

                <div className="filterInlineButtons">
                    <div className='filterSelect'>
                        <label htmlFor="source-filter">Filter by source:</label>
                        <select id="source-filter"
                                onChange={(e) => {this.handleSourceChange(e)}}
                                value={this.props.filterOptions.sourceOption}
                        >
                            <option value="all">All</option>
                            <option value="v1">Readonly API</option>
                            <option value="v2">Database API</option>
                        </select>
                    </div>

                    <TemperamentFilter
                        filterLabel="Filter by temperament:"
                        filterOnChange={(e) => this.handleTemperamentChange(e)}
                        filterSelectedOption={this.props.filterOptions.temperamentOption}
                        filterOptionList={this.props.temperamentList}
                    />
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
        filterOptions: state.filterOptions
    };
}

export const mapDispatchToProps = {updateFilteredList,
                                   getTemperamentList,
                                   updateFilterOptions};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWidgets);
