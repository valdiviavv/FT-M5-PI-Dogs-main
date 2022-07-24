import './CardList.css';
import React, {Component} from "react";
import CardItem from "../card-Item/CardItem";
import {connect} from "react-redux";
import {appendFavoriteList, removeFavoriteList} from "../../redux/actions";
import dogFields from "../common/dog-fields";

class CardList extends Component {
    renderEmptyMessage() {
        if(this.props.pageList.length === 0) {
            return(
              <p>There is not items to display</p>
            );
        }
    }

    findItem(version, cardId) {
        return this.props.pageList.find(item =>
            item.id === cardId && item.apiVersion === version
        );
    }

    addToFavoriteList(version, cardId) {
        const element = this.findItem(version, cardId);
        if (element) {
            this.props.appendFavoriteList(element);
        }
    }

    deleteFromFavoriteList(version, cardId) {
        const newFavoriteList = this.findItem(version, cardId);
        if (newFavoriteList) {
            this.props.removeFavoriteList(newFavoriteList);
        }
    }

    render() {
        return(
          <div className="CardList">
              {this.renderEmptyMessage()}
              {
                  this.props.pageList.map(dogItem =>
                      <CardItem key={`${dogItem.apiVersion}-${dogItem.id}`}
                                version={dogItem.apiVersion}
                                cardId={dogItem.id}
                                name={dogItem.name}
                                temperamentList={dogFields.getTemperamentList(dogItem)}
                                weight={dogFields.getWeight(dogItem)}
                                image_url={dogFields.getImageUrl(dogItem)}
                                enableAddToFavorites={this.props.enableAddToFavorites}
                                enableRemoveFromFavorites={this.props.enableRemoveFromFavorites}
                                addToFavoriteList={(version, cardId) => this.addToFavoriteList(version, cardId)}
                                delelteFromFavoriteList={(version, cardId) => this.deleteFromFavoriteList(version, cardId)}
                      />
                  )
              }
              <br/>
          </div>
        );
    }
}

export const mapDispatchToProps = {appendFavoriteList, removeFavoriteList};

export default connect(null, mapDispatchToProps)(CardList);
