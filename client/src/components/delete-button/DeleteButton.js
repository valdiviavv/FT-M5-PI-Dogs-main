import './DeleteButton.css';
import React from "react";
import {useDispatch} from "react-redux";
import {removeDogItem} from "../../redux/actions";
import {useHistory} from "react-router-dom";

const DeleteButton = (props) =>  {

    const dispatch = useDispatch();
    const history = useHistory();

    function handleOnClick(event, dogId) {
        event.stopPropagation();
        dispatch(removeDogItem(dogId));
        if(props.returnToSearch) {
            history.push('/search-list')
        }
    }

    const {apiVersion, dogId} = props;
    return (
        <div className="DeleteButton">
            {apiVersion === 'v2' &&
                <button onClick={e => handleOnClick(e, dogId)}
                >Delete
                </button>
            }
        </div>
    );
}

//export const mapDispatchToProps = {removeDogItem}

export default DeleteButton;
