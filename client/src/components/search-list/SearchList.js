import './SearchList.css';
import React, {Component} from "react";
import SearchWidgets from "../search-widgets/SearchWidgets";
import CardList from "../card-list/CardList";
import PaginateList from "../paginate-list/PaginateList";
import { connect } from "react-redux";
import {getDogList,updatePageList } from "../../redux/actions";

class SearchList extends Component {
    componentDidMount() {
        if (this.props.dogList.length === 0 ) {
            this.props.getDogList();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {filteredList, pageSize} = this.props;
        if(prevProps.filteredList !== filteredList &&
           filteredList.length !== 0) {
            const newPageList = filteredList.slice(0, pageSize);
            this.props.updatePageList(newPageList);
        }
    }

    render() {
        return (
          <div className="SearchList">
              <h1>Search List</h1>
              <SearchWidgets />
              <CardList
                    pageList={this.props.pageList}
                    enableAddToFavorites={true}/>
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
        pageSize: state.pageSize,
    }
}

export const mapDispatchToProps = {getDogList, updatePageList};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
