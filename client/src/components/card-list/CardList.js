import './CardList.css';
import React, {Component} from "react";
import CardItem from "../card-Item/CardItem";
import { connect } from "react-redux";

class CardList extends Component {

    getCardPage() {
        const {filteredList, pageSize} = this.props;
        let dogPage = [];
        if(filteredList.length <= 0){
            return dogPage;
        }
        for(let i = 0; i < pageSize && i < filteredList.length; i++) {
            dogPage.push(filteredList[i]);
        }
        return dogPage;
    }
    render() {
        return(
          <div className="CardList">
              <h1>Card List</h1>
              {
                  this.getCardPage().map(dogItem =>
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
        filteredList: state.filteredList,
        pageSize: state.pageSize
    };
}

export default connect(mapStateToProps)(CardList);
