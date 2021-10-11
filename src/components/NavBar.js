import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logOut} from '../actions/shared'


class NavBar extends Component{

    logOut = ()=> {
        this.props.dispatch(logOut())
    }

    render(){
        return(
            <div className="nav-bar">
                <div className="nav-bar-item" >
                    <div className="trapezoid">
                        <Link className="nav-bar-link" to='/home'>
                        <p className="nav-bar-item-text"> Home </p>
                        </Link>
                    </div>
                </div>
                <div className="nav-bar-item" >
                    <div className="trapezoid">
                        <Link className="nav-bar-link" to='/newquestion'>
                            <p className="nav-bar-item-text"> New Question </p>
                        </Link>
                    </div>
                </div>
                <div className="nav-bar-item" >
                    <div className="trapezoid">
                        <Link className="nav-bar-link" to='/leaderboard'>
                            <p className="nav-bar-item-text"> Leader board </p>
                        </Link>
                    </div>
                </div>
                <div className="nav-bar-item" >
                    <img className="nav-bar-welcome-img" src={this.props.users[this.props.authedUser].avatarURL}/>
                    <p className="nav-bar-welcome-text"> Hello, {this.props.users[this.props.authedUser].name}</p>
                </div>
                <div className="nav-bar-item" >
                    <div className="trapezoid">
                        <Link onClick={this.logOut} className="nav-bar-link" to='/'>
                            <p className="nav-bar-item-text"> LogOut </p>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    
}

function mapStateToProps ({ authedUser , users }) {
    return {
        authedUser,
        users,
    }
}

export default connect(mapStateToProps)(NavBar)