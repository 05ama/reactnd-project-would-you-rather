import { getInitialData ,createUser ,saveQuestion ,saveQuestionAnswer } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { addUser } from "./addNewUser";
import { addQuestion } from "./addQuestion";
import { setAuthedUser } from "./authentication";


export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
            })
    }
}

export function addNewUser (user){
    return (dispatch) => {
        return createUser(user)
            .then(dispatch(addUser(user)))
    }
}

export function addNewQuestion (question){
    return (dispatch) => {
        return saveQuestion(question)
            .then(dispatch(addQuestion(question)))
    }
}

export function successLogIn (id) {
    return (dispatch) => {
        dispatch(setAuthedUser(id))
    }
}

export function logOut () {
    return (dispatch) => {
        dispatch(setAuthedUser(null))
    }
}