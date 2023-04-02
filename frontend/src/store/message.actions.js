import { messageService } from "../services/message.service.js";
import {socketService} from "../services/socket.service.js"
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_MESSAGE,  REMOVE_MESSAGE,  SET_MESSAGES, UPDATE_MESSAGE } from "./message.reducer.js";
import { SET_SCORE } from "./user.reducer.js";

// Action Creators:
// export function getActionRemoveMessage(messageId) {
//     return {
//         type: REMOVE_MESSAGE,
//         messageId
//     }
// }
// export function getActionAddMessage(message) {
//     return {
//         type: ADD_MESSAGE,
//         message
//     }
// }


export async function loadMessagesByTarget(targetId) {

    try {
        const filterBy = {to:targetId}
        const messages = await messageService.query(filterBy)
        store.dispatch({
            
            type: SET_MESSAGES,
            messages
        })

    } catch (err) {
        console.log('Cannot load cars', err)
        throw err
    }

}

export async function loadGroupMessages(targetId){
    try {
        const filterBy = {to:targetId}
        const messages = await messageService.query(filterBy)
        return messages
    } catch (err) {
        console.log('Cannot load cars', err)
        throw err
    }
}

export async function removeMessage(messageId) {
    try {
        await messageService.remove(messageId)
    } catch (err) {
        console.log('Cannot remove car', err)
        throw err
    }
}

export async function addMessage(message) {
    try {
        const savedMessage = await messageService.save(message)
        // store.dispatch(getActionAddMessage(savedMessage))
        // socketService.emit('chat-send-msg',message)
        return savedMessage
    } catch (err) {
        console.log('Cannot add car', err)
        throw err
    }
}

export async function loadUser(messageId) {
    try {
        const message = await messageService.getById(messageId);
        return message
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

// export function updateMessage(message) {
//     return messageService.save(message)
//         .then(savedMessage => {
//             console.log('Updated Car:', savedMessage)
//             store.dispatch(getActionUpdateCar(savedMessage))
//             return savedMessage
//         })
//         .catch(err => {
//             console.log('Cannot save car', err)
//             throw err
//         })
// }



// export async function checkout(total) {
//     try {
//         const score = await userService.changeScore(-total)
//         store.dispatch({ type: SET_SCORE, score })
//         store.dispatch({ type: CLEAR_CART })
//         return score
//     } catch (err) {
//         console.log('CarActions: err in checkout', err)
//         throw err
//     }
// }


// Demo for Optimistic Mutation 
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveCarOptimistic(carId) {
//     store.dispatch({
//         type: REMOVE_CAR,
//         carId
//     })
//     showSuccessMsg('Car removed')

//     carService.remove(carId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove car')
//             console.log('Cannot load cars', err)
//             store.dispatch({
//                 type: UNDO_REMOVE_CAR,
//             })
//         })
// }
