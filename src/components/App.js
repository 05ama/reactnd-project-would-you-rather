import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import AppHome from './AppHome'
import LogIn from './LogIn'
import SignUp from './SignUp'
import NewQuestion from './NewQuestion'

class App extends Component{
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render(){
        return(
            this.props.authedUser === null?
                <div>
                    <Route exact path='/signup' render ={()=>(<SignUp />)}/>
                    <Route exact path='/login' render ={()=>(<LogIn />)}/> 
                    <Route exact path='/' render ={()=>(<LogIn />)}/>
                    <Route exact path='/home' render ={()=>(<LogIn />)}/>
                    <Route exact path='/newquestion' render ={()=>(<LogIn />)}/>
                </div>:
                <div>
                    <Route exact path='/' render ={()=>(<AppHome />)}/>
                    <Route exact path='/login' render ={()=>(<LogIn />)}/> 
                    <Route exact path='/signup' render ={()=>(<SignUp />)}/> 
                    <Route exact path='/home' render ={()=>(<AppHome />)}/> 
                    <Route exact path='/newquestion' render ={()=>(<NewQuestion />)}/>
                </div>
        )
    }

}

function mapStateToProps ({ authedUser , users }) {
    return {
        authedUser,
        users,
        loading: users === undefined
    }
}

export default connect(mapStateToProps)(App)