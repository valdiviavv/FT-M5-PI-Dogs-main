import './DeleteButton.css';
import React, {Component} from "react";
import {connect} from "react-redux";
import {removeDogItem} from "../../redux/actions";

class DeleteButton extends Component {

    handleOnClick(event, dogId) {
        event.stopPropagation();
        this.props.removeDogItem(dogId);
    }

    render() {
        const {apiVersion, dogId} = this.props;
        return (
            <div className="DeleteButton">
                {apiVersion === 'v2' &&
                    <button onClick={e => this.handleOnClick(e, dogId)}
                    >Delete
                    </button>
                }
            </div>
        );
    }
}

export const mapDispatchToProps = {removeDogItem}

export default connect(null, mapDispatchToProps)(DeleteButton);
