import React, { Component } from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import LogIn from './LogIn'

class App extends Component{
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
    render(){
        return(
            <div>
            {this.props.loading === true
                ? <h1 className='loading'>LOADING</h1>
                : <LogIn /> }   
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