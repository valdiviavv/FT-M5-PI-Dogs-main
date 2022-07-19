import './CardList.css';
import React, {Component} from "react";
import CardItem from "../card-Item/CardItem";
import { connect } from "react-redux";

class CardList extends Component {

    getCardPage() {
        const {dogList, pageSize} = this.props;
        let dogPage = [];
        if(dogList.length <= 0){
            return dogPage;
        }
        for(let i = 0; i < pageSize; i++) {
            dogPage.push(dogList[i]);
        }
        return dogPage;
    }
    render() {
        return(
          <div className="CardList">
              <h1>Card List</h1>
              {
                  this.getCardPage().map(dogItem =>
                      <CardItem key={dogItem.id}
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

// Makes dogList available in this component.
const mapStateToProps = (state) => {
    console.log("Card list state : ", state);
    return {
        dogList: state.dogList,
        pageSize: state.pageSize
    };
}

export default connect(mapStateToProps)(CardList);
