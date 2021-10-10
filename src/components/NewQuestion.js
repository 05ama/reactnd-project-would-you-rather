import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'



class NewQuestion extends Component{
    render(){
        return(
            <h1>
                NewQuestion
            </h1>
        )
    }
    
}



export default connect()(NewQuestion)