import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'


class AppHome extends Component{
    render(){
        return(
            <h1>
                Home
            </h1>
        )
    }
    
}



export default connect()(AppHome)