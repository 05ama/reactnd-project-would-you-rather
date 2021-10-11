import React, { Component } from 'react'
import { withRouter , Redirect } from "react-router";
import { connect } from "react-redux"

class LocalRouter extends Component{
    render(){
        const questionId = this.props.match.params.id;
        if(this.props.questions[questionId] === undefined){
            return <Redirect to='/error'/>;
        }
        else{
            return <p>HI</p>
        }
    }

}

function mapStateToProps ({ authedUser , users , questions }, { id }) {
    return {
        authedUser,
        users,
        questions,
        id
    }
}

export default withRouter(connect(mapStateToProps)(LocalRouter))