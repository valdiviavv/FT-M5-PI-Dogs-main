import './CardItem.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";

class CardItem extends Component {
    render() {
        const {version, cardId} = this.props;
        return (
            <div className="CardItem">
                <p>Card Item</p>
                <p>
                    <Link to={`/${version}/details/${cardId}`}>
                        Dog Details {`${version}-${cardId}`}
                    </Link>
                </p>
                <br/>
            </div>
        );
    }
}

export default CardItem;
