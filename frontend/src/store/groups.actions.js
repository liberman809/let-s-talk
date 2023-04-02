import { groupService } from '../services/group.service'
import { store } from './store.js'
import { SET_GROUP, SET_ADMINS, REMOVE_GROUP, SET_GROUPS, SET_PRIVETMESSAGES, SET_PRIVETGROUP, SET_MEMBERS } from './groups.reducer'
import { SET_SCORE, SET_WATCHED_USER } from './user.reducer'


// Action Creators
export function getActionPrivetMessages(bol) {
  return { type: SET_PRIVETMESSAGES, bol }
}
export function getActionPrivetGroup(bol) {
  return { type: SET_PRIVETGROUP, bol }
}
export function getActionSetMembers(members) {
  return store.dispatch({ type: SET_MEMBERS, members })
}
export function getActionSetGroup(group) {
  return store.dispatch({ type: SET_GROUP, group })
}

export function getActionSetAdmins(admins) {
  return store.dispatch({ type: SET_ADMINS, admins })
}


export async function loadUserGroups(groups) {
  try {
    // const reviews = await reviewService.query()
    store.dispatch({ type: SET_GROUPS, groups })

  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addGroup(group) {
  try {
    const addedGroup = await groupService.add(group)
    return addedGroup
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function loadGroup(groupId) {
  try {
    const group = await groupService.getById(groupId);
    const admins = group.admin
    store.dispatch({ type: SET_ADMINS, admins })
    getActionSetGroup(group)
    getActionSetMembers(group.members)
    getActionSetAdmins(admins)

    return group
  } catch (err) {
    console.log('Cannot load user', err)
  }
}

export async function updateAdmins(groupDetails) {
  try {
    const group = await groupService.update(groupDetails)
    getActionSetAdmins(group.admin)
    // getActionSetGroup(group)
    return group

  } catch (err) {
    console.error('Cannot checkout:', err)
    throw err
  }
}

export async function updateGroup(groupDetails) {
  try {
    const group = await groupService.update(groupDetails)

    // getActionSetGroup(group)
    return group

  } catch (err) {
    console.error('Cannot checkout:', err)
    throw err
  }
}

export async function updateMembers(groupDetails) {
  try {
    const group = await groupService.update(groupDetails)

    getActionSetMembers(group.members)
    return group

  } catch (err) {
    console.error('Cannot checkout:', err)
    throw err
  }
}

export async function updatePrivetGroup(groupDetails) {
  try {
    const group = await groupService.update(groupDetails)

    getActionPrivetGroup(group.privetGroup)
    return group

  } catch (err) {
    console.error('Cannot checkout:', err)
    throw err
  }
}

export async function updatePrivetMessages(groupDetails) {
  try {
    const group = await groupService.update(groupDetails)

    getActionPrivetMessages(group.privetMasege)
    return group

  } catch (err) {
    console.error('Cannot checkout:', err)
    throw err
  }
}


// export async function removeReview(reviewId) {
//   try {
//     await groupService.remove(reviewId)
//     // store.dispatch(getActionRemoveReview(reviewId))
//   } catch (err) {
//     console.log('ReviewActions: err in removeReview', err)
//     throw err
//   }
// }