import './CardList.css';
import React, {Component} from "react";
import CardItem from "../card-Item/CardItem";

class CardList extends Component {
    render() {
        return(
          <div className="CardList">
              <h1>Card List</h1>
              {
                  this.props.pageList.map(dogItem =>
                      <CardItem key={`${dogItem.apiVersion}-${dogItem.id}`}
                                version={dogItem.apiVersion}
                                cardId={dogItem.id}
                                name={dogItem.name}
                      />
                  )
              }
              <br/>
          </div>
        );
    }
}

export default CardList;
