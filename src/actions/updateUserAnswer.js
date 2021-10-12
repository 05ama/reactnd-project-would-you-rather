export const UPDATE_USER_ANSWER = 'UPDATE_USER_ANSWER'


export function updateUserAnswer ({ authedUser, qid, answer }) {
    return {
        type: UPDATE_USER_ANSWER,
        action: { authedUser, qid, answer },
    }
}