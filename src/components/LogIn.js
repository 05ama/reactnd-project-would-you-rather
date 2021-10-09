import React, { Component } from 'react'
import {connect} from 'react-redux'
import {successLogIn} from '../actions/shared'

class LogIn extends Component{
    state = {
        value:"selectuser",
        selectedId:null,
        avatar:"https://avatars.dicebear.com/api/avataaars/wouldYOUrather.svg",
        password:"",
        inputPassword:null
    }    

    updateState = (event)=> {
        let userName = event.target.value;
        let userIndex = event.target.options.selectedIndex-1;
        let selectedUser = this.props.usersArray[userIndex];
        this.setState(()=>({
            value:userName,
            selectedId:selectedUser.id,
            avatar:selectedUser.avatarURL,
            password:selectedUser.password
        }))
    }

    updateInputPassword = (event) => {
        let inputPassword=event.target.value;
        this.setState(()=>({
            inputPassword:inputPassword
        }))
    }

    verifyPassword = () => {
        this.state.password === this.state.inputPassword ? 
        this.props.dispatch(successLogIn(this.state.selectedId)):
        false
    }

    render(){
        return(
            <div  className="login-form">
                <div className="login-user-avatar">
                    <img src={this.state.avatar}/>
                </div>
                <div>
                    <select className="select-user" onChange={this.updateState} value={this.state.value}>
                        <option value="selectuser" disabled>Select User</option>
                        {
                            this.props.usersArray.map((user)=> 
                                <option key={user.id} value={user.name}> 
                                    {user.name} 
                                </option>)
                        }
                    </select>
                </div>
                <div>
                    <p className="login-password">Password: 
                        <input 
                            maxLength="10" 
                            disabled={this.state.selectedId === null} 
                            type="password"
                            onChange={this.updateInputPassword}/>                   
                    </p>
                </div>
                <div>
                    <button 
                        onClick={this.verifyPassword}
                        className="login-button" 
                        disabled={this.state.inputPassword === null || this.state.inputPassword.length < 3 }> 
                            LogIn 
                    </button>
                </div>
            </div>
        )
    }

}

function mapStateToProps ({ users }) {
    const ids = Object.keys(users);
    const usersArray = ids.map((id)=>users[id])
    return {
        usersArray
    }
}

export default connect(mapStateToProps)(LogIn)