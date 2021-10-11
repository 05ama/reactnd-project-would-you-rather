import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import AppHome from './AppHome'
import LogIn from './LogIn'
import SignUp from './SignUp'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Error from './Error'

class App extends Component{
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render(){
        return(
            this.props.authedUser === null?
                <div>
                    <Switch>
                        <Route exact path='/' render ={()=>(<LogIn />)}/>
                        <Route exact path='/signup' render ={()=>(<SignUp />)}/>
                        <Route exact path='/login' render ={()=>(<LogIn />)}/> 
                        <Route exact path='/home' render ={()=>(<LogIn />)}/>
                        <Route exact path='/newquestion' render ={()=>(<LogIn />)}/>
                        <Route exact path='/leaderboard' render ={()=>(<LogIn />)}/>
                        <Route path ="*" render ={()=>(<Error />)}/>
                    </Switch>
                </div>:
                <div>
                    <Switch>
                        <Route exact path='/' render ={()=>(<AppHome />)}/>
                        <Route exact path='/login' render ={()=>(<LogIn />)}/> 
                        <Route exact path='/signup' render ={()=>(<SignUp />)}/> 
                        <Route exact path='/home' render ={()=>(<AppHome />)}/> 
                        <Route exact path='/newquestion' render ={()=>(<NewQuestion />)}/>
                        <Route exact path='/leaderboard' render ={()=>(<LeaderBoard />)}/>
                        <Route path ="*" render ={()=>(<LocalRouter />)}/>
                    </Switch>
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