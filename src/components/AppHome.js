import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import NavBar from './NavBar';


class AppHome extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <div>
                    BODY
                </div>
            </div>
        )
    }
    
}



export default connect()(AppHome)