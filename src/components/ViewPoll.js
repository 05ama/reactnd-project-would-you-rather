import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from "react-router";
import NavBar from './NavBar';
import {saveUserQuestionAnswer} from "../actions/shared"

class ViewPoll extends Component{

    state ={
        notSelected : true,
        isAnswered : ""
    }

    optionSelected = null;

    componentDidMount(){
        this.setState(()=>({
            isAnswered : (this.props.optionOneVoted || this.props.optionTwoVoted)
        }))
    }

    enableSubmit = (e) => {
        this.setState(()=>({
            notSelected : false
        }))
        this.optionSelected = e.currentTarget.value
    }

    submitAnswer = () => {
        this.props.dispatch(
            saveUserQuestionAnswer(
                {
                 authedUser:this.props.authedUser, 
                 qid:this.props.id, 
                 answer:this.optionSelected}));
        this.props.history.push("/"+this.props.id);
        this.setState(()=>({
            isAnswered : true
        }))  
    }
    
    render(){
        const { TotalVoters, totalOptionOneVoters,totalOptionTwoVoters,optionOneVoted,optionTwoVoted } = this.props ;
        return(
            this.state.isAnswered === false?
            <div>
                <NavBar/>  
                <div className="app-main-container-poll"> 
                    <p className="asked-by">Asked by <img className="poll-user-avatar" src={this.props.authorAvatarUrl}/>{this.props.authorName}</p>
                    <div className="poll-container"> 
                        <h4 className="question-text">Would you rather</h4> 
                        <div className="poll-container">
                            <p className="poll-text"> <input onChange={this.enableSubmit} type="radio" name="poll" value="optionOne" /> {this.props.questionOptionOne.text+ " ?!"}</p>
                            <p className="poll-text"> <input onChange={this.enableSubmit} type="radio" name="poll" value="optionTwo" /> {this.props.questionOptionTwo.text+ " ?!"}</p>                      
                        </div> 
                        <button disabled ={this.state.notSelected} onClick={this.submitAnswer} className="poll-btn-submit">Submit</button>
                    </div>                        
                </div>
            </div>:
            <div>
                <NavBar/>
                <div className="app-main-container-poll">
                    <p className="asked-by">Asked by <img className="poll-user-avatar" src={this.props.authorAvatarUrl}/>{this.props.authorName}</p> 
                    <div className="poll-container"> 
                        <h4 className="question-text">Results !</h4> 
                        <div className="poll-container">
                            <fieldset>
                                {optionOneVoted?<legend>&spades; You would rather </legend>:""}
                                <p className="poll-bar-option-text">{this.props.questionOptionOne.text}</p>
                                <div className="poll-bar">
                                    <div className="poll-bar-progress" style={{width:((totalOptionOneVoters/TotalVoters)*100)+"%"}}><p className="poll-bar-text">{Math.round(((totalOptionOneVoters/TotalVoters)) * 1000)/10}%</p></div>
                                </div>
                                <p className="voters-text">{totalOptionOneVoters} out of {TotalVoters} votes</p>
                            </fieldset>
                            <fieldset>
                                {optionTwoVoted?<legend>&spades; You would rather </legend>:""}
                                <p className="poll-bar-option-text">{this.props.questionOptionTwo.text}</p>
                                <div className="poll-bar">
                                    <div className="poll-bar-progress" style={{width:((totalOptionTwoVoters/TotalVoters)*100)+"%"}}><p className="poll-bar-text">{Math.round(((totalOptionTwoVoters/TotalVoters)) * 1000)/10}%</p></div>
                                </div>
                                <p className="voters-text">{totalOptionTwoVoters} out of {TotalVoters} votes</p> 
                            </fieldset>                    
                        </div> 
                    </div>                        
                </div>                      
            </div>
        )
    }
}

function mapStateToProps ({ authedUser , users , questions }, { id }) {
    const authorAvatarUrl = users[questions[id].author].avatarURL;
    const authorName = users[questions[id].author].name;
    const currentUser = users[authedUser];
    const questionOptionOne = questions[id].optionOne;
    const questionOptionTwo = questions[id].optionTwo;
    const TotalVoters = questions[id].optionOne.votes.length + questions[id].optionTwo.votes.length;
    const totalOptionOneVoters = questions[id].optionOne.votes.length;
    const totalOptionTwoVoters = questions[id].optionTwo.votes.length;
    const optionOneVoted = questions[id].optionOne.votes.includes(authedUser);
    const optionTwoVoted = questions[id].optionTwo.votes.includes(authedUser);
    return {
        authedUser,
        authorAvatarUrl,
        authorName,
        currentUser,
        questionOptionOne,
        questionOptionTwo,
        TotalVoters,
        totalOptionOneVoters,
        totalOptionTwoVoters,
        optionOneVoted,
        optionTwoVoted
    }
}


export default withRouter(connect(mapStateToProps)(ViewPoll))
