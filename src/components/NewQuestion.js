import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { handleInitialData , addNewQuestion } from '../actions/shared';
import {connect} from 'react-redux'
import NavBar from './NavBar';



class NewQuestion extends Component{

    state={
        enableOption1Submit : true,
        enableOption2Submit : true
    }

    optionOneText=""
    optionTwoText=""
    inputOptionOneError = "question-options-input input-error"
    inputOptionTwoError = "question-options-input input-error"

    submitQuestion = ()=>{
        this.props.dispatch(addNewQuestion({optionOneText:this.optionOneText,optionTwoText:this.optionTwoText,author:this.props.authedUser}))
        this.props.dispatch(handleInitialData());
        this.props.history.push('/home')
    }

    optionOneCheck = (event) => {
        if(event.target.value.length > 5 ){
            this.setState(()=>({
                enableOption1Submit:false
            }))
            this.inputOptionOneError = "question-options-input input-pass"
        }else{
            this.setState(()=>({
                enableOption1Submit:true
            }))
            this.inputOptionOneError = "question-options-input input-error"           
        }
        this.optionOneText = event.target.value;
    }

    optionTwoCheck = (event) => {
        if(event.target.value.length > 5 ){
            this.setState(()=>({
                enableOption2Submit:false
            }))
            this.inputOptionTwoError = "question-options-input input-pass" 
        }else{
            this.setState(()=>({
                enableOption2Submit:true
            }))            
            this.inputOptionTwoError = "question-options-input input-error" 
        }
        this.optionTwoText = event.target.value;
    }

    render(){
        return(
        <div>
            <NavBar/>
            <div className="app-main-container">   
                <h1 className="new-question-header">Create New Question</h1> 
                <p className="new-question-text">Complete question inputs:</p>
                <h3 className="new-question-subheader">Would you rather ... </h3>
                <textarea onChange={this.optionOneCheck} maxLength="80" className={this.inputOptionOneError} placeholder="First option ..."/>
                <p className="new-question-subtext">OR</p>
                <textarea onChange={this.optionTwoCheck} maxLength="80" className={this.inputOptionTwoError} placeholder="Second option ..."/>
                <button disabled={this.state.enableOption1Submit||this.state.enableOption2Submit} className="submit-question" onClick={this.submitQuestion}> Add </button>
            </div>
        </div>
        )
    }
    
}

function mapStateToProps ({  authedUser , users , questions }) {

    return {
        authedUser,
        users,
        questions,
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))