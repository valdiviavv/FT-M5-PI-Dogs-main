import './CardItem.css';
import brokenImage from './broken-image.png'
import React, {Component} from "react";
import {withRouter} from "react-router";
import DeleteButton from "../delete-button/DeleteButton";

class CardItem extends Component {
    handleOnClick(event, version, cardId) {
        event.stopPropagation();
        if (this.props.enableLikeButton) {
            this.props.addToFavoriteList(version, cardId);
        } else {
            this.props.deleteFromFavoriteList(version, cardId);
        }
    }

    showDetails(version, cardId) {
        this.props.history.push(`/${version}/details/${cardId}`);
    }

    handleOnErrorImage(event) {
        event.target.src = brokenImage;
    }

    render() {
        const {version, cardId, name, temperamentList, weight, image_url, enableLikeButton} = this.props;
        return (
            <div className="CardItem" onClick={() => this.showDetails(version, cardId)}>
                <div>
                    <img className='imageCardItem'
                         src={image_url} alt={name}
                         onError={(e) => this.handleOnErrorImage(e)}
                    />
                </div>
                <div className='breedLike'>
                    <h3>{name}</h3>
                    {enableLikeButton &&
                        <button
                            className="button"
                            onClick={e => this.handleOnClick(e, version, cardId)}>
                            Like
                        </button>}
                    {!enableLikeButton &&
                        <button
                            className="button"
                            onClick={e => this.handleOnClick(e, version, cardId)}>
                            Unlike
                        </button>}
                </div>
                <div className='weightCardItem'><b>Weight:</b> {weight}</div>
                <div>{temperamentList}</div>
                <br/>

                <DeleteButton
                    dogId={cardId}
                    apiVersion={version}
                />
            </div>
        );
    }
}

export default withRouter(CardItem);
