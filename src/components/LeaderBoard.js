import React, { Component } from 'react'
import {connect} from 'react-redux'
import NavBar from './NavBar';


class LeaderBoard extends Component{
    render(){
        return(
            <div>
                <NavBar/>
                <div className="leader-board">   
                    {
                        this.props.usersActivitySortedArray.map((user , index)=>
                        <div key={user.name} className="leader-board-card"> 
                            <div className="board-container">
                                <p className="board-user"> { index===0?"🏆🥇 "+user.name+" 🥇🏆":
                                                             index===1?"🥈 "+user.name+" 🥈":
                                                             index===2?"🥉 "+user.name+" 🥉":user.name} </p>
                                <img className="board-avatar" src={user.avatarURL}/>
                                <p className="board-user-scores">Answered questions: {user.answeredQuestions}<br/>Asked questions: {user.questionsAsked}</p>
                                <p className="board-user-score-tag"> Score <br/> {user.answeredQuestions+user.questionsAsked} </p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        )
    }    
}

function mapStateToProps ({ users }) {
    const ids = Object.keys(users);
    const usersArray = ids.sort((a,b) => 
            ((users[b].questions.length + Object.keys(users[b].answers).length) - 
             (users[a].questions.length + Object.keys(users[a].answers).length)) );
    const usersActivitySortedArray = usersArray.map((id)=>
                                    {return {name:users[id].name,
                                             avatarURL:users[id].avatarURL,
                                             answeredQuestions:Object.keys(users[id].answers).length,
                                             questionsAsked:users[id].questions.length}});
    return {
        usersActivitySortedArray,
        usersArray
    }
}

export default connect(mapStateToProps)(LeaderBoard)