import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import NavBar from './NavBar';


class NewQuestion extends Component{
    render(){
        return(
        <div>
            <NavBar/>
            <div className="app-main-container">   
                <h1>
                NewQuestion
                </h1> 
            </div>
        </div>
        )
    }
    
}



export default connect()(NewQuestion)