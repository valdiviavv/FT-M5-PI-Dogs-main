import {GET_DOG_LIST,
    UPDATE_FILTERED_LIST,
    UPDATE_PAGE_LIST,
    ADD_FAVORITE_ITEM,
    DEL_FAVORITE_ITEM} from "../actions";

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
            }
        case UPDATE_FILTERED_LIST:
            return {
                ...state,
                filteredList: action.payload,
                pageList: action.payload.slice(0, state.pageSize)
            }
        case ADD_FAVORITE_ITEM:
            return {
                ...state,
                favoriteList: [action.payload, ...state.favoriteList]
            }
        case DEL_FAVORITE_ITEM:
            const newFavoriteList = state.favoriteList.filter(item =>
                item.id !== action.payload.id &&
                item.apiVersion === action.payload.apiVersion
            );
            const newPageList = state.pageList.filter(item =>
                item.id !== action.payload.id &&
                item.apiVersion === action.payload.apiVersion
            );
            return {
                ...state,
                favoriteList: newFavoriteList,
                pageList: newPageList,
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
