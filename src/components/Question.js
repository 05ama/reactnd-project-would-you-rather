import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'


class Question extends Component{


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
                    {this.props.answeredFlag === true?
                        <Link to={"/"+this.props.data.id}>
                            <button className="poll-btn">View poll</button>
                        </Link>:
                        <Link to={"/"+this.props.data.id}>
                            <button className="poll-btn">View poll</button>
                        </Link>
                    }
                </div>
            </div>
        )
    }
}


function mapStateToProps ({ authedUser , users , questions },{data , answeredFlag}) {

    return {
        authedUser,
        users,
        questions,
        data,
        answeredFlag
    }
}

export default connect(mapStateToProps)(Question)