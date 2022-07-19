import './CardList.css';
import React, {Component} from "react";
import CardItem from "../card-Item/CardItem";

class CardList extends Component {
    render() {
        return(
          <div className="CardList">
              <h1>Card List</h1>
              <CardItem version="v1" cardId="1"/>
              <CardItem version="v1" cardId="2"/>
              <CardItem version="v2" cardId="1"/>
              <br/>
          </div>
        );
    }
}

export default CardList;
