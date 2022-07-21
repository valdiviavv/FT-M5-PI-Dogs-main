import './Favorites.css';
import React,{Component} from "react";
import CardList from "../card-list/CardList";
import PaginateList from "../paginate-list/PaginateList";
import { connect } from "react-redux";
import {getDogList, updatePageList} from "../../redux/actions";

class Favorites extends Component {
    componentDidMount() {
        if (this.props.dogList.length === 0) {
            this.props.getDogList();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {favoriteList, pageSize} = this.props;
        if(prevProps.favoriteList !== favoriteList &&
            favoriteList.length !== 0) {
            const newPageList = favoriteList.slice(0, pageSize);
            this.props.updatePageList(newPageList);
        }
    }

    render() {
        return(
          <div className="Favorites">
              <h1>Favorite Dogs</h1>
              <CardList pageList={this.props.pageList}/>
              <PaginateList sourceList={this.props.favoriteList}/>
              <br/>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("favorite list state: ", state);
    return {
        dogList: state.dogList,
        favoriteList: state.favoriteList,
        pageList: state.pageList,
        pageSize: state.pageSize,
    }
}

export const mapDispatchToProps = {getDogList, updatePageList};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
