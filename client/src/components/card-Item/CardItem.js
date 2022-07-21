import './CardItem.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";

class CardItem extends Component {
    handleOnClick(event, version, cardId) {
        event.preventDefault();
        this.props.addToFavoriteList(version, cardId);
    }
    render() {
        const {version, cardId, name} = this.props;
        return (
            <div className="CardItem">
                <p>Card Item</p>
                <p>
                    <Link to={`/${version}/details/${cardId}`}>
                        Dog Details {`${version}-${cardId}`}
                    </Link>
                    <button
                    className="button"
                    onClick={e => this.handleOnClick(e, version, cardId)}>
                        Add to favorite
                    </button>
                </p>
                <p>
                    {name}
                </p>
                <br/>
            </div>
        );
    }
}

export default CardItem;
