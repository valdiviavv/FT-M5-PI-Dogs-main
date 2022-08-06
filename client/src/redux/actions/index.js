import axios from 'axios';

export const GET_DOG_LIST = 'GET_DOG_LIST';
export const UPDATE_FILTERED_LIST = 'UPDATE_FILTERED_LIST';
export const ADD_FAVORITE_ITEM = 'ADD_FAVORITE_ITEM';
export const DEL_FAVORITE_ITEM = 'DEL_FAVORITE_ITEM';
export const UPDATE_PAGE_LIST = 'UPDATE_PAGE_LIST';
export const CREATE_DOG_ITEM = 'CREATE_DOG_ITEM';
export const GET_TEMPERAMENT_LIST = 'GET_TEMPERAMENT_LIST';
export const DEL_DOG_ITEM = 'DEL_DOG_ITEM';
export const UPDATE_FILTER_OPTIONS = 'UPDATE_FILTER_OPTIONS';

export const getDogList = () => {
    return async function (dispatch) {
        let response1 = await axios.get('https://api.thedogapi.com/v1/breeds');
        let response2 = await axios.get('http://localhost:3001/dogs');
        response1 = response1.data.map(item => ({
            apiVersion: 'v1',
            enableAddToFavorites: true,
            ...item
        }));
        response2 = response2.data.map(item => ({
            apiVersion: 'v2',
            enableAddToFavorites: true,
            ...item}));
        dispatch({
            type: GET_DOG_LIST,
            payload: response2.concat(response1)
        });
    };
};

export const getTemperamentList = () => {
    return async function (dispatch) {
        let response = await axios.get('http://localhost:3001/temperaments');
        dispatch({
            type: GET_TEMPERAMENT_LIST,
            payload: response.data
        });
    };
};

export function updateFilteredList(filteredList, newCurrentPage) {
    return {
        type: UPDATE_FILTERED_LIST,
        payload: {filteredList, newCurrentPage}
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

export function updatePageList(pageList, newCurrentPage) {
    return {
        type: UPDATE_PAGE_LIST,
        payload: {pageList, newCurrentPage}
    }
}

export const saveDogItem = (dogItem) => {
    return function (dispatch) {
        axios.post('http://localhost:3001/dogs', dogItem) //success 201
            .catch(error => console.log(error))
            .then(response1 => {
                const {dogId} = response1.data;
                axios.get(`http://localhost:3001/dogs/${dogId}`)//success 200
                    .catch(error => console.log(error))
                    .then(response2 => {
                        response2.data['apiVersion'] = 'v2';
                        response2.data['enableAddToFavorites'] = true;
                        dispatch({
                            type: CREATE_DOG_ITEM,
                            payload: response2.data
                        });
                    });
            });
    };
}

export const removeDogItem = (dogId) => {
    return function (dispatch) {
        axios.delete(`http://localhost:3001/dogs/${dogId}`)
            .then(response => {
                dispatch({
                    type: DEL_DOG_ITEM,
                    payload: {id: dogId, apiVersion: 'v2'}
                });
            })
            .catch(error => console.log(error))
    };
}

export function updateFilterOptions(filterOptions) {
    return {
        type: UPDATE_FILTER_OPTIONS,
        payload: filterOptions
    }
}
