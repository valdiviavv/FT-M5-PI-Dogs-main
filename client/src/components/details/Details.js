import './Details.css';
import React, {Component} from "react";
import {connect} from "react-redux";
import {getDogList, updatePageList} from "../../redux/actions";
import dogFields from "../common/dog-fields";
import DeleteButton from "../delete-button/DeleteButton";

class Details extends Component {

    componentDidMount() {
        if (this.props.dogList.length === 0) {
            this.props.getDogList();
        }
    }

    getApiVersion(match) {
        if (match.url.includes("v1")) {
            return "v1"; // read-only-api
        } else {
            return "v2"; // database-api
        }
    }

    findDetail() {
        const dogId = Number(this.props.match.params.id);
        const version = this.getApiVersion(this.props.match);
        return this.props.dogList.find(item =>
            item.id === dogId && item.apiVersion === version
        );
    }

    renderDogItem() {
        if (this.props.dogList.length === 0) {
            return (
                <h1 className='dogErrorMessage'>
                    The store is empty...
                </h1>
            );
        }
        const dogItem = this.findDetail();
        if (!dogItem) {
            return (
                <h1 className='dogErrorMessage'>
                    The request dog was not found...
                </h1>
            );
        }
        return (
            <div className='detailsDog'>
                <div className='imageContainer'>
                    <img className='detailsImageDog' src={dogFields.getImageUrl(dogItem)} alt={dogItem.name}/>
                </div>
                <div className='detailsInfo'>
                    <h1>{dogItem.name}</h1>
                    <p><b>Temperament:</b> {dogFields.getTemperamentList(dogItem)}</p>
                    <p><b>Weight:</b> {dogFields.getWeight(dogItem)}</p>
                    <p><b>Height:</b> {dogFields.getHeight(dogItem)} </p>
                    <p><b>Life span:</b> {dogItem.life_span}</p>
                    <br/>
                    <DeleteButton
                        dogId={dogItem.id}
                        apiVersion={dogItem.apiVersion}
                        returnToSearch={true}
                    />
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="Details">
                {this.renderDogItem()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dogList: state.dogList,
    }
}

export const mapDispatchToProps = {getDogList, updatePageList};


export default connect(mapStateToProps, mapDispatchToProps)(Details);
