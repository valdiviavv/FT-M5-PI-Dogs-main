import './CardList.css';
import React, {Component} from "react";
import CardItem from "../card-Item/CardItem";
import { connect } from "react-redux";

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

// Makes filteredList available in this component.
const mapStateToProps = (state) => {
    console.log("Card list state : ", state);
    return {
        pageList: state.pageList,
    };
}

export default connect(mapStateToProps)(CardList);
