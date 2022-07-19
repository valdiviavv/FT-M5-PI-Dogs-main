import {GET_DOG_LIST} from "../actions";

const initialState = {
    dogList: [],
    filteredList: [],
    pageSize: 8
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOG_LIST:
            return {
                ...state,
                dogList: action.payload,
                filteredList: action.payload,
            }
        default:
            return state;
    }
}

export default rootReducer;
