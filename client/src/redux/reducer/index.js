import {GET_DOG_LIST,
    UPDATE_FILTERED_LIST,
    UPDATE_PAGE_LIST,
    ADD_FAVORITE_ITEM,
    DEL_FAVORITE_ITEM,
    CREATE_DOG_ITEM,
    GET_TEMPERAMENT_LIST,
    DEL_DOG_ITEM} from "../actions";

const initialState = {
    dogList: [],
    filteredList: [],
    favoriteList: [],
    pageList: [],
    pageSize: 8,
    temperamentList: [],
    currentPage: {},
};

function getListFilteredBy(originalList, dogId, apiVersion) {
    return originalList.filter(item =>
        !(item.id === dogId &&
          item.apiVersion === apiVersion)
    );
}

const rootReducer = (state = initialState, action) => {
    let newFavoriteList;
    let newPageList;

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
                favoriteList: [action.payload, ...state.favoriteList],
                pageList: [...state.pageList],
            }
        case DEL_FAVORITE_ITEM:
            newFavoriteList = getListFilteredBy(state.favoriteList, action.payload.id, action.payload.apiVersion);
            return {
                ...state,
                favoriteList: newFavoriteList,
            }
        case UPDATE_PAGE_LIST:
            const newCurrentPage = {...state.currentPage};
            if (action.payload.currentPage) {
                const pageKeyList = Object.keys(action.payload.currentPage);
                const keyName = pageKeyList[0];
                newCurrentPage[keyName] = action.payload.currentPage[keyName];
            }
            return {
                ...state,
                pageList: action.payload.pageList,
                currentPage: newCurrentPage
            }
        case CREATE_DOG_ITEM:
            return {
                ...state,
                dogList: [action.payload, ...state.dogList],
                filteredList: [action.payload, ...state.filteredList]
            }
        case GET_TEMPERAMENT_LIST:
            return {
                ...state,
                temperamentList: action.payload
            }
        case DEL_DOG_ITEM:
            const newDogList = getListFilteredBy(state.dogList, action.payload.id, action.payload.apiVersion);
            const newFilteredList = getListFilteredBy(state.filteredList, action.payload.id, action.payload.apiVersion);
            newFavoriteList = getListFilteredBy(state.favoriteList, action.payload.id, action.payload.apiVersion);
            newPageList = getListFilteredBy(state.pageList, action.payload.id, action.payload.apiVersion);
            return {
                ...state,
                dogList: newDogList,
                filteredList: newFilteredList,
                favoriteList: newFavoriteList,
                pageList: newPageList,
            }
        default:
            return state;
    }
}

export default rootReducer;
