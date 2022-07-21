import './CardList.css';
import React, {Component} from "react";
import CardItem from "../card-Item/CardItem";
import {connect} from "react-redux";
import {appendFavoriteList} from "../../redux/actions";

class CardList extends Component {
    renderEmptyMessage() {
        if(this.props.pageList.length === 0) {
            return(
              <p>There is not items to display</p>
            );
        }
    }

    addToFavoriteList(version, cardId) {
        const element = this.props.pageList.find(item =>
            item.id === cardId && item.apiVersion === version
        );
        if (element) {
            this.props.appendFavoriteList(element);
        }
    }

    render() {
        return(
          <div className="CardList">
              <h1>Card List</h1>
              {this.renderEmptyMessage()}
              {
                  this.props.pageList.map(dogItem =>
                      <CardItem key={`${dogItem.apiVersion}-${dogItem.id}`}
                                version={dogItem.apiVersion}
                                cardId={dogItem.id}
                                name={dogItem.name}
                                addToFavoriteList ={(version, cardId) => this.addToFavoriteList(version, cardId)}
                      />
                  )
              }
              <br/>
          </div>
        );
    }
}

export const mapDispatchToProps = {appendFavoriteList};

export default connect(null, mapDispatchToProps)(CardList);
