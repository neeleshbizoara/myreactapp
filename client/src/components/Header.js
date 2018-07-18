import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import StripeBiller  from './StripeBiller';
import M from "materialize-css/dist/js/materialize.min.js";

class Header extends Component {
    componentDidMount(){
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }
    renderContent() {
        switch (this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return [
                    <li key="1"><StripeBiller/></li>,
                    <li key="3" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
                    <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                <Link to={this.props.auth ? '/survey' : '/'} className="left brand-logo">Emaily</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {this.renderContent()}
                </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Header);