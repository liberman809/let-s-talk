
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from "../services/socket.service.js"



// const STORAGE_KEY = 'message'

    (() => {
        socketService.on(SOCKET_EVENT_REVIEW_ADDED, (message) => {
            console.log('GOT from socket', message)
        })
    })()

export const messageService = {
    query,
    getById,
    save,
    remove,
}
window.cs = messageService


async function query(filterBy) {
    return httpService.get('message', filterBy)
}

function getById(messageId) {
    // return storageService.get(STORAGE_KEY, carId)
    return httpService.get(`message/${messageId}`)
}

async function remove(carId) {
    // await storageService.remove(STORAGE_KEY, carId)
    return httpService.delete(`message/${carId}`)
}
async function save(message) {
    var savedMessage
    if (message._id) {
        // savedCar = await storageService.put(STORAGE_KEY, car)
        savedMessage = await httpService.put(`message/${message._id}`, message)

    } else {
        // savedCar = await storageService.post(STORAGE_KEY, car)
        savedMessage = await httpService.post('message', message)
    }
    return savedMessage
}







