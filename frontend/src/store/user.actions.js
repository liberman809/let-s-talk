import { userService } from "../services/user.service.js";
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, SET_GROUPS } from "./user.reducer.js";

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        const groups = user.groups
        store.dispatch({
            type: SET_USER,
            user
        })
        store.dispatch({
            type: SET_GROUPS,
            groups
        })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        const groups = user.groups
        store.dispatch({
            type: SET_USER,
            user
        })
        store.dispatch({
            type: SET_GROUPS,
            groups
        })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(data) {
    try {
        const user = await userService.getById(data);
        // store.dispatch({ type: SET_WATCHED_USER, user })
        return user
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export async function updateUser(userDetails) {
    try {
        const user = await userService.update(userDetails)
        // userService.saveLocalUser(user)
        return user
    } catch (err) {
        console.error('Cannot checkout:', err)
        throw err
    }
}

export async function setGroups(user) {
    try {
        const groups = user.groups
        store.dispatch({
            type: SET_GROUPS,
            groups
        })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

