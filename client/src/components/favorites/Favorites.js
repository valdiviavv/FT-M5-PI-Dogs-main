import './Favorites.css';
import React,{Component} from "react";
import CardList from "../card-list/CardList";
import PaginateList from "../paginate-list/PaginateList";
import { connect } from "react-redux";
import {getDogList, updatePageList} from "../../redux/actions";
import listUtils from "../common/list-utils";

class Favorites extends Component {
    componentDidMount() {
        if (this.props.dogList.length === 0) {
            this.props.getDogList();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      listUtils.refreshPageList(prevProps.favoriteList,
                                this.props.favoriteList,
                                this.props);
    }

    render() {
        return(
          <div className="Favorites">
              <h1>Favorite Dogs</h1>
              <CardList
                    pageList={this.props.pageList}
                    enableRemoveFromFavorites={true}
              />
              <PaginateList
                  sourceList={this.props.favoriteList}
                  currentPageName="favoritePage"
              />
              <br/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dogList: state.dogList,
        favoriteList: state.favoriteList,
        pageList: state.pageList,
        pageSize: state.pageSize,
    }
}

export const mapDispatchToProps = {getDogList, updatePageList};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
