import React, { Component } from 'react'
import {connect} from 'react-redux'
import Question from './Question'

class QuestionsMain extends Component{
    state = {
        unAnsweredSelected : "-selected",
        AnsweredSelected : ""
    }

    selectAnsweredQuestions = () => {
        this.setState(()=>({
            unAnsweredSelected : "",
            AnsweredSelected : "-selected",
        }))
    }

    selectUnansweredQuestions = () => {
        this.setState(()=>({
            unAnsweredSelected : "-selected",
            AnsweredSelected : "",
        }))
    }

    render(){
        return(
            <div className="questions-main-container">
                <div className="questions-main-container-buttons">
                    <button  disabled = {this.state.unAnsweredSelected === "-selected"} onClick={this.selectUnansweredQuestions} className={"questions-main-buttons"+this.state.unAnsweredSelected}> Unanswered Questions </button>
                    <button disabled = {this.state.AnsweredSelected === "-selected"} onClick={this.selectAnsweredQuestions} className={"questions-main-buttons"+this.state.AnsweredSelected}> Answered Questions </button>
                </div>
                <div className="questions-list">
                    {
                        this.state.AnsweredSelected === "-selected"?
                        <ul className="question-list-item">{this.props.answeredByCurrentUserArray.map((ans)=><li className="question-list-item" key={ans.id} ><Question data={ans}/></li>)}</ul>:
                        <ul className="question-list-item">{this.props.unAnsweredByCurrentUserArray.map((unAns)=><li className="question-list-item" key={unAns.id}><Question data={unAns}/></li>)}</ul>
                    }
                </div>
            </div>
        )
    }
    
}

function mapStateToProps ({ authedUser , users , questions }) {
    const currentuser = users[authedUser];
    const questionsId = Object.keys(questions);
    
    /* separation of answered and un-answered */
    const answeredByCurrentUserId = Object.keys(currentuser.answers);
    const unAnsweredByCurrentUserId = questionsId.filter( id => undefined === currentuser.answers[id] );
    
    /* Sort questions by time-stamp */
    const answeredByCurrentUserArray = answeredByCurrentUserId.map((id)=>questions[id]);
    const unAnsweredByCurrentUserArray = unAnsweredByCurrentUserId.map((id)=>questions[id]);

    answeredByCurrentUserArray.sort((a,b) =>  b.timestamp - a.timestamp )
    unAnsweredByCurrentUserArray.sort((a,b) => b.timestamp - a.timestamp )

    return {
        authedUser,
        users,
        questions,
        answeredByCurrentUserArray,
        unAnsweredByCurrentUserArray
    }
}

export default connect(mapStateToProps)(QuestionsMain)