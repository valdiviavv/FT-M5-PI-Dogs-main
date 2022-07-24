import './Create.css';
import React from "react";
import {useDispatch} from "react-redux";
import {saveDogItem} from "../../redux/actions";
import {useHistory} from "react-router-dom";

const Create = () => {

    const [dogItem, setDogItem] = React.useState({
        name: '',
        height_min: 0,
        height_max: 0,
        weight_min: 0,
        weight_max: 0,
        life_span: '',
        temperamentList: '',
        image_url: '',
        apiVersion: 'v2'
    });

    function handleChange(event) {
        setDogItem({...dogItem, [event.target.name]: event.target.value})
    }

    let dispatch = useDispatch();
    let history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(saveDogItem(dogItem));
        history.push('/search-list');
    }

    return (
        <div className="Create">
            <h1>Create Dog</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className='inputLabelField'>
                    <label>Breed: </label>
                    <input placeholder='Breed name'
                           onChange={(e) => handleChange(e)}
                           value={dogItem.name} type='text' name={'name'}/>
                </div>

                <div className='inputDoubleField'>
                    <div>
                        <label>Height Min: </label>
                        <input onChange={(e) => handleChange(e)} value={dogItem.height_min} type='number'
                               name={'height_min'}/>
                    </div>
                    <div>
                        <label>Height Max: </label>
                        <input onChange={(e) => handleChange(e)} value={dogItem.height_max} type='number'
                               name={'height_max'}/>
                    </div>
                </div>

                <div className='inputDoubleField'>
                    <div>
                        <label>Weight Min: </label>
                        <input onChange={(e) => handleChange(e)} value={dogItem.weight_min} type='number'
                               name={'weight_min'}/>
                    </div>
                    <div>
                        <label>Weight Max: </label>
                        <input onChange={(e) => handleChange(e)} value={dogItem.weight_max} type='number'
                               name={'weight_max'}/>
                    </div>
                </div>

                <div className='inputLabelField'>
                    <label>Life Span: </label>
                    <input placeholder='Life Span'
                           onChange={(e) => handleChange(e)}
                           value={dogItem.life_span}
                           type='text' name={'life_span'}/>
                </div>

                <div className='inputLabelField'>
                    <label>Temperaments: </label>
                    <input placeholder='Temperaments'
                           onChange={(e) => handleChange(e)}
                           value={dogItem.temperamentList}
                           type='text' name={'temperamentList'}/>
                </div>

                <div className='inputLabelField'>
                    <label>Url image: </label>
                    <input placeholder='Url image'
                           onChange={(e) => handleChange(e)}
                           value={dogItem.image_url}
                           type='text' name={'image_url'}/>
                </div>
                <br/>
                <button className='submitButton' type='submit'>Create</button>
            </form>
        </div>
    );
}

export default Create;

