import axios from 'axios';

export const GET_DOG_LIST = 'GET_DOG_LIST';
export const UPDATE_FILTERED_LIST = 'UPDATE_FILTERED_LIST';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const DEL_FAVORITE_ITEM = 'DEL_FAVORITE_ITEM';
export const UPDATE_PAGE_LIST = 'UPDATE_PAGE_LIST';

export const getDogList = () => {
    return async function (dispatch) {
        let response1 = await axios.get('https://api.thedogapi.com/v1/breeds');
        let response2 = await axios.get('http://localhost:3001/dogs');
        response1 = response1.data.map(item => ({apiVersion: 'v1', ...item}));
        response2 = response2.data.map(item => ({apiVersion: 'v2', ...item}));
        dispatch({
            type: GET_DOG_LIST,
            payload: response2.concat(response1)
        });
    };
};

export function updateFilteredList(filteredList) {
    return {
        type: UPDATE_FILTERED_LIST,
        payload: filteredList
    }
}

export function appendFavoriteList(favoriteItem) {
    return {
        type: ADD_FAVORITE_ITEM,
        payload: favoriteItem
    }
}

export function removeFavoriteList(favoriteItem) {
    return {
        type: DEL_FAVORITE_ITEM,
        payload: favoriteItem
    }
}

export function updatePageList(pageList) {
    return {
        type: UPDATE_PAGE_LIST,
        payload: pageList
    }
}
