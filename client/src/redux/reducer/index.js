import {GET_DOG_LIST, UPDATE_FILTERED_LIST, UPDATE_PAGE_LIST} from "../actions";

const initialState = {
    dogList: [],
    filteredList: [],
    favoriteList: [],
    pageList: [],
    pageSize: 8
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOG_LIST:
            return {
                ...state,
                dogList: action.payload,
                filteredList: action.payload,
                pageList: action.payload.slice(0, state.pageSize)
            }
        case UPDATE_FILTERED_LIST:
            return {
                ...state,
                filteredList: action.payload,
                pageList: action.payload.slice(0, state.pageSize)
            }
        case UPDATE_PAGE_LIST:
            return {
                ...state,
                pageList: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;
