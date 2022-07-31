import './Nav.css';
import React, {Component} from "react";
import {Link} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <div className="Nav">
                <div className="linkGroup">
                    <Link className='linkItem' to="/">Home</Link>{" "}
                    <Link className='linkItem' to="/search-list">Search List</Link>{" "}
                    <Link className='linkItem' to="/create">Create Dog</Link>{" "}
                    <Link className='linkItem' to="/favorites">Favorites</Link>{" "}
                    <Link className='linkItem' to="/about">About</Link>
                </div>
            </div>
        );
    }
}

export default Nav;
