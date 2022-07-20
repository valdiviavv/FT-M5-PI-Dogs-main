import './Favorites.css';
import React,{Component} from "react";
import CardList from "../card-list/CardList";
import PaginateList from "../paginate-list/PaginateList";
import { connect } from "react-redux";
import {getDogList} from "../../redux/actions";

class Favorites extends Component {
    componentDidMount() {
        if (this.props.dogList.length === 0) {
            this.props.getDogList();
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
    }
}

export const mapDispatchToProps = {getDogList};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
