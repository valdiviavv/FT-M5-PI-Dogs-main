import {
    GET_DOG_LIST,
    UPDATE_FILTERED_LIST,
    UPDATE_PAGE_LIST,
    ADD_FAVORITE_ITEM,
    DEL_FAVORITE_ITEM,
    CREATE_DOG_ITEM,
    GET_TEMPERAMENT_LIST,
    DEL_DOG_ITEM,
    UPDATE_FILTER_OPTIONS
} from "../actions";

const initialState = {
    dogList: [],
    filteredList: [],
    favoriteList: [],
    pageList: [],
    pageSize: 8,
    temperamentList: [],
    currentPage: {},
    filterOptions: {
        sourceOption: 'all',
        temperamentOption: 'all',
        searchBreed: '',
        orderOption: 'default-order',
    }
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
                filteredList: action.payload.filteredList,
                pageList: action.payload.filteredList.slice(0, state.pageSize),
                currentPage: action.payload.newCurrentPage,
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
                pageList: [...state.pageList],
            }
        case UPDATE_PAGE_LIST:
            if(action.payload.newCurrentPage) { // this is for fullRefreshPageList()
                return {
                    ...state,
                    pageList: action.payload.pageList,
                    currentPage: action.payload.newCurrentPage
                }
            } else { // this is for partialRefreshPageList()
                return {
                    ...state,
                    pageList: action.payload.pageList,
                }
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
        case UPDATE_FILTER_OPTIONS:
            return {
                ...state,
                filterOptions: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;
