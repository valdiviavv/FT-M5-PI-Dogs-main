import "./SearchWidgets.css";
import React, {Component} from "react";
import {connect} from "react-redux";
import {updateFilteredList} from "../../redux/actions";
import dogFields from "../common/dog-fields";

class SearchWidgets extends Component {

    state = {
        sourceOption: 'all',
        temperamentOption: 'all',
        searchBreed: '',
        orderOption: 'default-order',
    };


    refreshFilteredList(sourceOption, temperamentOption, orderOption) {
        let filteredList = this.getFilteredListBySource(sourceOption);
        filteredList = this.getFilteredListByTemperament(filteredList, temperamentOption)
        filteredList = this.getOrderedList(filteredList, orderOption);
        this.props.updateFilteredList(filteredList);
    }

    getFilteredListBySource(sourceOption) {
        if(sourceOption === 'all') {
            return this.props.dogList.slice();
        } else {
            return this.getFilteredListByVersion(sourceOption);
        }
    }

    getFilteredListByTemperament(filteredList, temperamentOption) {
        if(temperamentOption === 'all') {
            return filteredList;
        }
        return filteredList.filter(item =>
            dogFields.getTemperamentList(item).includes(temperamentOption)
        );
    }

    getFilteredListByVersion(versionFilter) {
        if(this.props.dogList.length === 0) {
            return [];
        }
        return this.props.dogList.filter(item => item.apiVersion === versionFilter);
    }

    getOrderedList(filteredList, orderOption) {
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
            default:
                return filteredList;
        }
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
        const {sourceOption, temperamentOption, orderOption} = this.state;
        if (prevState.sourceOption !== sourceOption ||
            prevState.temperamentOption !== temperamentOption ||
            prevState.orderOption !== orderOption
        ) {
            this.refreshFilteredList(sourceOption, temperamentOption, orderOption);
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

                <div>
                    <label htmlFor="temperament-filter">Filter by temperament:</label>
                    <select id="temperament-filter"
                            onChange={(e) => {this.handleTemperamentChange(e)}}
                            value={this.state.temperamentOption}
                    >
                        <option value="all">All</option>
                        <option value="Stubborn">Stubborn</option>
                        <option value="Adventurous">Adventurous</option>
                    </select>
                </div>

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
        filteredList: state.filteredList
    };
}

export const mapDispatchToProps = {updateFilteredList};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWidgets);
