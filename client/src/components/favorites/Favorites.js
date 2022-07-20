import './Favorites.css';
import React,{Component} from "react";
import CardList from "../card-list/CardList";
import PaginateList from "../paginate-list/PaginateList";
import { connect } from "react-redux";

class Favorites extends Component {
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
        favoriteList: state.favoriteList,
        pageList: state.pageList,
    }
}

export default connect(mapStateToProps)(Favorites);
