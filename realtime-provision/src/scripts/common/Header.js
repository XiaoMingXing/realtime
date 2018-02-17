import React, {Component} from "react";
import logo from "./logo.svg";
import "./Header.css";
import {Link} from "react-router-dom";

class Header extends Component {

    render() {

        let headerStyle = {
            backgroundColor: "black"
        };

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid" style={headerStyle}>
                        <div>
                            <div className="col-md-1">
                                <Link to="/" className="navbar-brand">
                                    <img src={logo} className="brand" alt="Brand"/>
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <ul className="nav navbar-nav">
                                    <li><Link to="/">Main</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;
