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
                <h1 style={{textAlign: 'center'}} className='dogErrorMessage'>
                    There are not items to display
                </h1>
            );
        }
    }

    findItem(version, cardId) {
        return this.props.pageList.find(item =>
            item.id === cardId && item.apiVersion === version
        );
    }

    addToFavoriteList(version, cardId) {
        const dogItem = this.findItem(version, cardId);
        dogItem.enableAddToFavorites = false;
        if (dogItem) {
            this.props.appendFavoriteList(dogItem);
        }
    }

    deleteFromFavoriteList(version, cardId) {
        const dogItem = this.findItem(version, cardId);
        dogItem.enableAddToFavorites = true;
        if (dogItem) {
            this.props.removeFavoriteList(dogItem);
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
                                height={dogFields.getHeight(dogItem)}
                                image_url={dogFields.getImageUrl(dogItem)}
                                enableLikeButton={dogItem.enableAddToFavorites}
                                addToFavoriteList={(version, cardId) => this.addToFavoriteList(version, cardId)}
                                deleteFromFavoriteList={(version, cardId) => this.deleteFromFavoriteList(version, cardId)}
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
