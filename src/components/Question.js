import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'


class Question extends Component{

    viewPoll = ()=>{
        this.props.history.push("/"+this.props.data.id);
    }

    render(){
        return(
            <div className="question-card-container">
                <div>
                    <p className="question-author">{this.props.users[this.props.data.author].name} asks!</p>
                </div>
                <div className="question-content">
                    <img className="sign-up-avatar" src={this.props.users[this.props.data.author].avatarURL}/>
                    <h4 className="question-text" style={{fontWeight :"bold"}}>Would you rather ?</h4>
                    <p className="question-text">{"..."+this.props.questions[this.props.data.id].optionOne.text}</p>
                    <button onClick={this.viewPoll} className="poll-btn">View poll</button>
                </div>
            </div>
        )
    }
}


function mapStateToProps ({  users , questions },{data , answeredFlag}) {

    return {
        users,
        questions,
        data,
        answeredFlag
    }
}

export default withRouter(connect(mapStateToProps)(Question))