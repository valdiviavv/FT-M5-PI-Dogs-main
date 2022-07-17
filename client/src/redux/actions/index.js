import axios from 'axios';

export const GET_DOG_LIST = 'GET_DOG_LIST';

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

