import './CardItem.css';
import React, {Component} from "react";
import {withRouter} from "react-router";

class CardItem extends Component {
    handleOnClick(event, version, cardId) {
        event.preventDefault();
        if (this.props.enableAddToFavorites) {
            this.props.addToFavoriteList(version, cardId);
        }
        if (this.props.enableRemoveFromFavorites) {
            this.props.delelteFromFavoriteList(version, cardId);
        }
    }

    showDetails(version, cardId) {
        this.props.history.push(`/${version}/details/${cardId}`);
    }

    render() {
        const {version, cardId, name, temperamentList, weight, image_url} = this.props;
        return (
            <div className="CardItem" onClick={() => this.showDetails(version, cardId)}>
                <div>
                    <img className='imageCardItem' src={image_url} alt={name}/>
                </div>
                <div className='breedLike'>
                    <h3>{name}</h3>
                    {this.props.enableAddToFavorites &&
                        <button
                            className="button"
                            onClick={e => this.handleOnClick(e, version, cardId)}>
                            Like
                        </button>}
                    {this.props.enableRemoveFromFavorites &&
                        <button
                            className="button"
                            onClick={e => this.handleOnClick(e, version, cardId)}>
                            Unlike
                        </button>}
                </div>
                <div className='weightCardItem'><b>Weight:</b> {weight}</div>
                <div>{temperamentList}</div>
                <br/>
            </div>
        );
    }
}

export default withRouter(CardItem);
