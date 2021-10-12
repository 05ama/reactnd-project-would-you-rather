import React, { Component } from 'react'
import { withRouter , Redirect } from "react-router";
import { connect } from "react-redux"
import ViewPoll from './ViewPoll';

class LocalRouter extends Component{
    render(){
        const questionId = this.props.match.params.id;
        if(this.props.questions[questionId] === undefined){
            return <Redirect to='/error'/>;
        }
        else{
            return <ViewPoll id={questionId}/>;
        }
    }

}

function mapStateToProps ({ questions }, { id }) {
    return {
        questions,
        id
    }
}

export default withRouter(connect(mapStateToProps)(LocalRouter))