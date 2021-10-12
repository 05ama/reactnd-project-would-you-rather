import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import AppHome from './AppHome'
import LogIn from './LogIn'
import SignUp from './SignUp'
import Error from './Error'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import LocalRouter from './LocalRouter'
import LoadingBar from 'react-redux-loading'

class App extends Component{
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render(){
        return(
            <div>
                <LoadingBar className="loading"/>
                {this.props.authedUser === null?
                <div className="main">
                    <Switch>
                        <Route exact path='/signup' render ={()=>(<SignUp />)}/>
                        <Route path ="*" render ={()=>(<LogIn />)}/>
                    </Switch>
                </div>:
                <div className="main">
                    <Switch>
                        <Route exact path='/' render ={()=>(<AppHome />)}/>
                        <Route exact path='/login' render ={()=>(<LogIn />)}/> 
                        <Route exact path='/signup' render ={()=>(<SignUp />)}/> 
                        <Route exact path='/home' render ={()=>(<AppHome />)}/> 
                        <Route exact path='/newquestion' render ={()=>(<NewQuestion />)}/>
                        <Route exact path='/leaderboard' render ={()=>(<LeaderBoard />)}/>
                        <Route path='/error' render ={()=>(<Error />)}/>
                        <Route path ="*/:id" render ={()=>(<LocalRouter />)}/>
                    </Switch>
                </div>}
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