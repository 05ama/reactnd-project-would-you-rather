import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Error extends Component{

    goHome = ()=>{
        this.props.history.push('/home')
    }

    render(){
        return(
            <div className="error">
                <h1 className="error-head">Page not found 😧 </h1>
                <button onClick={this.goHome} className="error-button" >Take me Home !</button>
            </div>
        )
    }

}


export default withRouter(Error)