import './Home.css';
import React, {Component} from "react";

class Home extends Component {
    constructor(props) {
        super(props);
        this.dogImage = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    }


    render() {
        return (
            <div className="Home">
                <h1>Henry Dogs</h1>
                <h3>Welcome to the Paws App, here you can search for different types of breed dogs, add them to your
                    favorites and even create new ones.</h3>
                <img src={this.dogImage} alt="A dog"/>
            </div>
        );
    }
}

export default Home;

