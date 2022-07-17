import axios from 'axios';

export const GET_DOG_LIST = 'GET_DOG_LIST';

export const getDogList = () => {
    return async function (dispatch) {
        const response = await axios.get('https://api.thedogapi.com/v1/breeds');
        console.log("axios response: ", response);
        dispatch({
            type: GET_DOG_LIST,
            payload: response.data
        });
    };
};

