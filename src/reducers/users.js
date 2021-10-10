import { RECEIVE_USERS } from "../actions/users";
import { ADD_USER } from "../actions/addNewUser";

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            }
        case ADD_USER :
            return {
                ...state,
                [action.user.id]:{
                    id: action.user.id,
                    name: action.user.name,
                    avatarURL: action.user.avatarURL,
                    answers: { },
                    questions: [],
                    password:action.user.password                   
                }
            }
        default :
            return state
    }
}