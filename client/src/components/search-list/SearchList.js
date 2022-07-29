import './SearchList.css';
import React, {Component} from "react";
import SearchWidgets from "../search-widgets/SearchWidgets";
import CardList from "../card-list/CardList";
import PaginateList from "../paginate-list/PaginateList";
import { connect } from "react-redux";
import {getDogList,updatePageList } from "../../redux/actions";
import listUtils from "../common/list-utils";

class SearchList extends Component {
    componentDidMount() {
        if (this.props.dogList.length === 0) {
            this.props.getDogList();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        listUtils.refreshPageList(prevProps.filteredList,
                                  this.props.filteredList,
                                  this.props);
    }

    render() {
        return (
          <div className="SearchList">
              <h1>Search List</h1>
              <SearchWidgets />
              <CardList
                    pageList={this.props.pageList}
                    enableAddToFavorites={true}
              />
              <PaginateList
                  sourceList={this.props.filteredList}
                  currentPageName="searchPage"
              />
              <br/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("search list store:", state)
    return {
        dogList: state.dogList,
        filteredList: state.filteredList,
        pageList: state.pageList,
        pageSize: state.pageSize,
        currentPage: state.currentPage
    }
}

export const mapDispatchToProps = {getDogList, updatePageList};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
