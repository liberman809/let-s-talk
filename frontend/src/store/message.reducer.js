export const SET_MESSAGES = 'SET_MESSAGES'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const ADD_MESSAGE = 'ADD_MESSAGE'

const initialState = {
    messages: [],
    lastRemovedCar: null
}

export function messageReducer(state = initialState, action) {
    var newState = state
    var messages
    var cart
    switch (action.type) {
        case SET_MESSAGES:
            newState = { ...state, messages: action.messages }
            break
    //     case ADD_MESSAGE:
    //         newState = { ...state, cars: [...state.cars, action.car] }
    //         break
        default:
    }
    return newState
}
