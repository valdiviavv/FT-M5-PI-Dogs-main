import './About.css';
import React, {Component} from "react";

class About extends Component {
    constructor(props) {
        super(props);
        this.womanImage = 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMzM4Mzh8MHwxfHNlYXJjaHw4fHx3b21hbiUyMGNvbXB1dGVyfGVufDB8fHx8MTY1Nzk4NzY4Mg&ixlib=rb-1.2.1&q=80&w=400'
    }

    render() {
        return (
            <div>
                <h1>About Me</h1>
                <div className="About">
                    <div className='detailsDog'>
                        <div className="imageContainer">
                            <img className='detailsImageDog' src={this.womanImage} alt="woman"/>
                        </div>
                        <div className="detailsInfo">
                            <h2>Hi, I'm Veronica</h2>
                            <h3>I used to work as a university professor and researcher, <br/>
                                my field of expertise was in Organic and Analytic Chemistry. <br/>
                                Several years ago I started to learn about software development as a hobby. <br/>
                                This year I started studying software development at Henry Academy. <br/>
                                This is a sample project I made during my time at Henry Academy.
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;
