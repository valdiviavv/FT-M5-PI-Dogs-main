import './SearchList.css';
import React, {Component} from "react";
import SearchWidgets from "../search-widgets/SearchWidgets";
import CardList from "../card-list/CardList";
import PaginateList from "../paginate-list/PaginateList";
import { connect } from "react-redux";
import {getDogList } from "../../redux/actions";

class SearchList extends Component {
    componentDidMount() {
        if (this.props.dogList.length === 0 ) {
            this.props.getDogList();
        }
    }

    render() {
        return (
          <div className="SearchList">
              <h1>Search List</h1>
              <SearchWidgets />
              <CardList pageList={this.props.pageList}/>
              <PaginateList sourceList={this.props.filteredList}/>
              <br/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Search list state: ", state);
    return {
        dogList: state.dogList,
        filteredList: state.filteredList,
        pageList: state.pageList,
    }
}

export const mapDispatchToProps = {getDogList};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
