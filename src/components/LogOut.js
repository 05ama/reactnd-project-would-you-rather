import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'



class LogOut extends Component{
    render(){
        return(
            <h1>
                Logout
            </h1>
        )
    }
    
}



export default connect()(LogOut)