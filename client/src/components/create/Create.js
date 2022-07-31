import './Create.css';
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {saveDogItem, getTemperamentList} from "../../redux/actions";
import TemperamentFilter from "../temperament-filter/TemperamentFilter";

const Create = () => {

    const regexName = /^[A-Za-z\s]*$/;
    const regexLifeSpan = /^[\dA-Za-z\s-]*$/;
    const regexUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;

    const defaultDogImage = 'http://localhost:3000/default-dog-image.png';

    const dispatch = useDispatch();
    const history = useHistory();
    const temperamentList = useSelector(state => state.temperamentList)

    useEffect(() => {
        if(temperamentList.length === 0) {
            dispatch(getTemperamentList());
        }
    },[dispatch, temperamentList])

    const [dogItem, setDogItem] = React.useState({
        name: '',
        height_min: 1,
        height_max: 1,
        weight_min: 1,
        weight_max: 1,
        life_span: '',
        temperaments: '',
        image_url: '',
        apiVersion: 'v2'
    });

    const [errorName, setErrorName] = React.useState('');
    const [errorHeightMin, setErrorHeightMin] = React.useState('');
    const [errorHeightMax, setErrorHeightMax] = React.useState('');
    const [errorWeightMin, setErrorWeightMin] = React.useState('');
    const [errorWeightMax, setErrorWeightMax] = React.useState('');
    const [errorLifeSpan, setErrorLifeSpan] = React.useState('');
    const [errorImageUrl, setErrorImageUrl] = React.useState('');

    function handleChange(event) {
        setDogItem({...dogItem, [event.target.name]: event.target.value})
    }

    function handleTemperamentChange(event) {
        let tempValue = event.target.value;
        if(dogItem.temperaments.includes(tempValue)) {
            return;
        }
        if(dogItem.temperaments.length !== 0) {
            tempValue = "," + tempValue
        }
        setDogItem({
            ...dogItem,
            temperaments: dogItem.temperaments += tempValue
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const error = validateFields();
        if (error) {
            return;
        }
        dogItem.temperaments = generateTemperamentList(dogItem);
        dispatch(saveDogItem(dogItem));
        history.push('/search-list');
    }

    function validateFields() {
        const errorName = validateName();
        const errorLifeSpan = validateLifeSpan();
        const errorHeightMin = validateHeightMin();
        const errorHeightMax = validateHeightMax();
        const errorWeightMin = validateWeightMin();
        const errorWeightMax = validateWeightMax();
        const errorImageUrl = validateImageUrl();

        return errorName || errorLifeSpan ||
               errorHeightMin || errorHeightMax ||
               errorWeightMin || errorWeightMax ||
               errorImageUrl;

    }

    function validateName() {
        dogItem.name = dogItem.name.trim();
        if (dogItem.name.length === 0) {
            setErrorName('The value should not be empty.');
            return true;
        }
        else if (dogItem.name.length < 3) {
            setErrorName('The value should be greater than three characters.');
            return true;
        }
        else if (dogItem.name.length > 150) {
            setErrorName('The value should be less than one hundred and fifty characters.');
            return true;
        }
        else if (!regexName.test(dogItem.name)) {
            setErrorName('The value should contain only letters.');
            return true;
        }
        else {
            setErrorName('');
            return false;
        }
    }

    function validateLifeSpan() {
        dogItem.life_span = dogItem.life_span.trim();
        if (dogItem.life_span.length === 0) {
            setErrorLifeSpan('The value should not be empty.');
            return true;
        }
        else if (dogItem.life_span.length < 3) {
            setErrorName('The value should be greater than three characters.');
            return true;
        }
        else if (dogItem.life_span.length > 50) {
            setErrorName('The value should be less than fifty characters.');
            return true;
        }
        else if (!regexLifeSpan.test(dogItem.life_span)) {
            setErrorLifeSpan('The value should contain only numbers and letters.');
            return true;
        }
        else {
            setErrorLifeSpan('');
            return false;
        }
    }

    function validateHeight() {
        validateHeightMin();
        validateHeightMax();
    }

    function validateHeightMin() {
        dogItem.height_min = Number(dogItem.height_min);
        if (dogItem.height_min === 0) {
            setErrorHeightMin("The value should be greater than zero.");
            return true;
        }
        else if (Number(dogItem.height_min) > Number(dogItem.height_max)) {
            setErrorHeightMin("The value should be less than maximum.");
            return true;
        } else {
            setErrorHeightMin('');
            return false;
        }
    }

    function validateHeightMax() {
        dogItem.height_max = Number(dogItem.height_max)
        if (dogItem.height_max === 0) {
            setErrorHeightMax("The value should be greater than zero.");
            return true;
        }
        else if (dogItem.height_min > dogItem.height_max) {
            setErrorHeightMax("The value should be greater than minimum.");
            return true;
        }
        else {
            setErrorHeightMax('');
            return false;
        }
    }

    function validateWeight() {
        validateWeightMin();
        validateWeightMax();
    }
    function validateWeightMin() {
        dogItem.weight_min = Number(dogItem.weight_min)
        if (dogItem.weight_min === 0) {
            setErrorWeightMin("The value should be greater than zero.");
            return true;
        }
        else if (dogItem.weight_min > dogItem.weight_max) {
            setErrorWeightMin("The value should be less than maximum.");
            return true;
        }
        else {
            setErrorWeightMin('');
            return false;
        }
    }

    function validateWeightMax() {
        dogItem.weight_max = Number(dogItem.weight_max);
        if (dogItem.weight_max === 0) {
            setErrorWeightMax("The value should be greater than zero.");
            return true;
        }
        else if (dogItem.weight_min > dogItem.weight_max) {
            setErrorWeightMax("The value should be greater than minimum.");
            return true;
        }
        else {
            setErrorWeightMax('');
            return false;
        }
    }
    
    function validateImageUrl() {
        if (dogItem.image_url.length !== 0 &&
            !regexUrl.test(dogItem.image_url)
        ) {
            setErrorImageUrl("The provide url is not valid.");
            return true;
        }
        else {
            setErrorImageUrl('');
            return false;
        }
    }

    function generateTemperamentList(dogItem) {
        const tempList = [];
        if(dogItem.temperaments === 0) {
            return tempList;
        }
        if (dogItem.image_url.length === 0) {
            dogItem.image_url = defaultDogImage;
        }
        const stringList = dogItem.temperaments.split(',');
        stringList.map(item => tempList.push({name: item}))
        return tempList;
    }

    return (
        <div className="Create">
            <h1>Create Dog</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className='inputLabelField'>
                    <label className="createTitle">Breed: </label>
                    <input placeholder='Breed name'
                           onChange={(e) => handleChange(e)}
                           onBlur={() => validateName()}
                           value={dogItem.name}
                           type='text' name={'name'}/>
                    <span>{errorName}</span>
                </div>

                <div className='inputDoubleField'>
                    <div>
                        <label>Height Min: </label>
                        <input onChange={(e) => handleChange(e)}
                               onBlur={() => validateHeight()}
                               value={dogItem.height_min}
                               type='number'
                               name={'height_min'}/>
                        <span>{errorHeightMin}</span>
                    </div>
                    <div>
                        <label>Height Max: </label>
                        <input onChange={(e) => handleChange(e)}
                               onBlur={() => validateHeight()}
                               value={dogItem.height_max}
                               type='number'
                               name={'height_max'}/>
                        <span>{errorHeightMax}</span>
                    </div>
                </div>

                <div className='inputDoubleField'>
                    <div>
                        <label>Weight Min: </label>
                        <input onChange={(e) => handleChange(e)}
                               onBlur={() => validateWeight()}
                               value={dogItem.weight_min}
                               type='number'
                               name={'weight_min'}/>
                        <span>{errorWeightMin}</span>
                    </div>
                    <div>
                        <label>Weight Max: </label>
                        <input onChange={(e) => handleChange(e)}
                               onBlur={() => validateWeight()}
                               value={dogItem.weight_max}
                               type='number'
                               name={'weight_max'}/>
                        <span>{errorWeightMax}</span>
                    </div>
                </div>

                <div className='inputLabelField'>
                    <label>Life Span: </label>
                    <input placeholder='Life Span'
                           onChange={(e) => handleChange(e)}
                           onBlur={() => validateLifeSpan()}
                           value={dogItem.life_span}
                           type='text' name={'life_span'}/>
                    <span>{errorLifeSpan}</span>
                </div>

                <div className='inputLabelField'>
                    <label>Temperaments: </label>
                    <input placeholder='Temperaments'
                           onChange={(e) => handleChange(e)}
                           value={dogItem.temperaments}
                           type='text' name={'temperaments'}/>
                    <TemperamentFilter
                        filterLabel="Temperament options:"
                        filterOnChange={handleTemperamentChange}
                        filterInitialLabel="Select..."
                        filterOptionList={temperamentList}
                    />
                </div>

                <div className='inputLabelField'>
                    <label>Url image: </label>
                    <input placeholder='Optional'
                           onChange={(e) => handleChange(e)}
                           onBlur={() => validateImageUrl()}
                           value={dogItem.image_url}
                           type='text' name={'image_url'}/>
                    <span>{errorImageUrl}</span>
                </div>
                <br/>
                <button className='submitButton' type='submit'>Create</button>
            </form>
        </div>
    );
}

export default Create;

