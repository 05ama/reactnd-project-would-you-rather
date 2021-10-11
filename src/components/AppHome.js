import React, { Component } from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar';
import QuestionsMain from './QuestionsMain';


class AppHome extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <div className="app-main-container">
                    <QuestionsMain  />
                </div>
            </div>
        )
    }
    
}



export default connect()(AppHome)