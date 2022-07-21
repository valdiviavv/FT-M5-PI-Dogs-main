import './Details.css';
import React,{Component} from "react";
import {connect} from "react-redux";
import {getDogList, updatePageList} from "../../redux/actions";

class Details extends Component {

    componentDidMount() {
        if (this.props.dogList.length === 0) {
            this.props.getDogList();
        }
    }

    getImageUrl(dogItem) {
        if (dogItem.apiVersion === 'v1') {
            return dogItem.image.url;
        } else {
            return dogItem.image_url;
        }
    }

    getTemperamentList(dogItem){
        if (dogItem.apiVersion === 'v1') {
            return dogItem.temperament;
        } else {
            const tempList = [];
            dogItem.temperaments.map(item => tempList.push(item.name + ', '));
            return tempList;
        }
    }

    getWeight(dogItem) {
        if (dogItem.apiVersion === 'v1') {
            return dogItem.weight.metric;
        } else {
            return (`${dogItem.weight_min}  -  ${dogItem.weight_max}`);
        }
    }

    getHeight(dogItem) {
        if (dogItem.apiVersion === 'v1') {
            return dogItem.height.metric;
        } else {
            return (`${dogItem.height_min}  -  ${dogItem.height_max}`)
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
                <div>
                    The store is empty...
                </div>
            );
        }
        const dogItem = this.findDetail();
        if (!dogItem) {
            return (
                <div>
                    The request dog was not found...
                </div>
            );
        }
        return (
            <div>
                <h1>Details from '{dogItem.name}' Dog</h1>
                <p>Temperament: {this.getTemperamentList(dogItem)}</p>
                <p>Weight: {this.getWeight(dogItem)}</p>
                <p>Height: {this.getHeight(dogItem)} </p>
                <p>Life span: {dogItem.life_span}</p>
                <img src={this.getImageUrl(dogItem)} alt={dogItem.name}/>
                <br/>
            </div>
        );
    }

    render() {
        return(
          <div className="Details">
              {this.renderDogItem()}
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("favorite list state: ", state);
    return {
        dogList: state.dogList,
    }
}

export const mapDispatchToProps = {getDogList, updatePageList};


export default connect(mapStateToProps, mapDispatchToProps)(Details);
