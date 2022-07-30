import './Favorites.css';
import React,{Component} from "react";
import CardList from "../card-list/CardList";
import PaginateList from "../paginate-list/PaginateList";
import { connect } from "react-redux";
import {getDogList, updatePageList} from "../../redux/actions";
import listUtils from "../common/list-utils";

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.currentPageName = "favoritePage";
    }

    componentDidMount() {
        if (this.props.dogList.length === 0) {
            this.props.getDogList();
        }
        const {favoriteList, pageSize, currentPage} = this.props;
        listUtils.fullRefreshPageList(favoriteList,
                                      pageSize,
                                      currentPage,
                                      this.currentPageName,
                                      this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        listUtils.partialRefreshPageList(prevProps.favoriteList,
                                         this.props.favoriteList,
                                         this.props)
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
                  currentPageName={this.currentPageName}
              />
              <br/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("favorites list store:", state)
    return {
        dogList: state.dogList,
        favoriteList: state.favoriteList,
        pageList: state.pageList,
        pageSize: state.pageSize,
        currentPage: state.currentPage,
    }
}

export const mapDispatchToProps = {getDogList, updatePageList};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
