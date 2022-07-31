import './Footer.css';
import React, {Component} from "react";
import {BsGithub, BsLinkedin} from 'react-icons/bs';

class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <hr/>
                <div className="contactLinks">
                    <a href="https://github.com/valdiviavv"
                       target='_blank'
                       rel="noreferrer">
                        <BsGithub className='contactLink'/>
                    </a>
                    <p>Veronica Vazquez Valdivia</p>
                    <a href="https://www.linkedin.com/in/veronica-vazquez-valdivia-249238128/"
                       target='_blank'
                       rel="noreferrer">
                        <BsLinkedin className='contactLink'/>
                    </a>
                </div>
            </div>
        );
    }
}

export default Footer;
