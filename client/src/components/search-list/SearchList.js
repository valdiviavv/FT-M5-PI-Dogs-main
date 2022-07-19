import './SearchList.css';
import React, {Component} from "react";
import SearchWidgets from "../search-widgets/SearchWidgets";
import CardList from "../card-list/CardList";
import { connect } from "react-redux";
import {getDogList } from "../../redux/actions";

class SearchList extends Component {
    componentDidMount() {
        this.props.getDogList();
    }

    render() {
        return (
          <div className="SearchList">
              <h1>Search List</h1>
              <SearchWidgets />
              <CardList />
              <br/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Search list state: ", state);
    return {dogList: state.dogList }
}

export const mapDispatchToProps = {getDogList};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);
