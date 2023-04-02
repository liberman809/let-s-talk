import { createStore, combineReducers } from 'redux'

import { messageReducer } from './message.reducer.js'
import { userReducer } from './user.reducer.js'
import { groupReducer } from './groups.reducer.js'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    messageModule: messageReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    groupModule: groupReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



