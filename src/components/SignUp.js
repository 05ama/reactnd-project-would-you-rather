import React, { Component } from 'react'
import { withRouter } from "react-router";
import {connect} from 'react-redux'
import {addNewUser} from '../actions/shared'
import { showLoading, hideLoading } from 'react-redux-loading'

class SignUp extends Component{
    
    state = {
        inValidUserInput : true,
        inValidUserPassword: true,
        invalidAvatarUrl: true,
    }

    avatarList = [];
    currentSelectedAvatarUrl = null;
    currentUserName = null;
    currentPassword = null;

    componentDidMount(){
        this.props.dispatch(showLoading())
        this.avatarList = this.avatarSeedGenerator(60);
        this.forceUpdate();
        this.props.dispatch(hideLoading())
    }

    submitUser = ()=>{
        let id = this.currentUserName.replace(/\s+/g,'').toLowerCase();
        let user = {
            id:id,
            name:this.currentUserName,
            avatarURL:this.currentSelectedAvatarUrl,
            password:this.currentPassword}
        this.props.dispatch(addNewUser(user));
        this.props.history.push('/home') ;
    }

    checkUserName = (event)=>{
        let userName = event.target.value;
        this.props.usersArray.map((user)=>{
            if( (user.id === userName.replace(/\s+/g,'').toLowerCase()) || (userName.length < 4) ) {
                this.setState(()=>({
                    inValidUserInput : true
                }))
                return;
            }else{
                this.setState(()=>({
                    inValidUserInput : false
                }))
                this.currentUserName = userName;
            }
        })
    }

    checkPassword = (event)=>{
        if(event.target.value.length < 5 ){
            this.setState(()=>({
                inValidUserPassword : true
            }))            
        }else{
            this.setState(()=>({
                inValidUserPassword : false
            }))
            this.currentPassword = event.target.value;
        }
    }

    avatarSeedGenerator(numberOfAvatars)
    {
        let seedArray = [];
        for (let i=0; i< numberOfAvatars; i++)
        {
            seedArray.push(Math.random().toString(36))
        }
        return seedArray;
    }

    clicked = (event) => {
        var target = event.target;
        let list = document.getElementsByClassName("sign-up-avatar");
        for (let i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "white";
        }

        if (this.currentSelectedAvatarUrl === target.src)
        {
            this.setState(()=>({
                invalidAvatarUrl : true
            }))
            this.currentSelectedAvatarUrl = null;
        }else{
            this.setState(()=>({
                invalidAvatarUrl : false
            }))
            this.currentSelectedAvatarUrl = target.src;
            target.style.background = "cyan";
        }
    }

    render(){
        return(
            <div className="sign-up-form">
                { 
                    <div className="sign-up-form-subset">
                        <div className="avatar-sign-up-list">
                            {
                                this.avatarList.map((seed) =>
                                    <img key={seed} onClick={this.clicked} className="sign-up-avatar" src={"https://avatars.dicebear.com/api/avataaars/"+seed+".svg"}/>
                                )
                            }
                        </div>
                        <div className="sign-up-info">
                            <p> User Name: <input 
                                maxLength="20"
                                onChange={this.checkUserName}
                                className={"input"+(this.state.inValidUserInput ? "-error": "-pass")}
                                ></input>
                            </p>
                            <p> Password: <input
                                maxLength="10"
                                type="password"
                                onChange={this.checkPassword}
                                className={"input"+(this.state.inValidUserPassword ? "-error": "-pass")}
                            ></input></p>
                        </div>
                        <div className="signup-form-buttons">
                                <button 
                                    disabled={  this.state.inValidUserInput || 
                                                this.state.inValidUserPassword || 
                                                this.state.invalidAvatarUrl 
                                            } 
                                    className="submit-button"
                                    onClick={this.submitUser}>
                                    Submit
                                </button>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

function mapStateToProps ({ authedUser , users }) {
    const ids = Object.keys(users);
    const usersArray = ids.map((id)=>users[id])
    return {
        usersArray,
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(SignUp))