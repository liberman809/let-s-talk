export const SET_GROUPS = 'SET_GROUPS'
export const SET_GROUP = 'SET_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const SET_ADMINS = 'SET_ADMINS'
export const SET_PRIVETMESSAGES = 'SET_PRIVETMESSAGES'
export const SET_PRIVETGROUP = 'SET_PRIVETGROUP'
export const SET_MEMBERS = 'SET_MEMBERS'


const initialState = {
  groups: [],
  group: '',
  gropMembers: [],
  privateGroup: '',
  privateMessages: '',
  members: [],
  groupAdmins: [],
}

export function groupReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, groups: action.groups }
    case SET_GROUP:
      return { ...state, group: action.group }
    case SET_PRIVETGROUP:
      return { ...state, group: action.privetGroup }
    case SET_PRIVETMESSAGES:
      return { ...state, group: action.privateMessages }
    case SET_MEMBERS:
      return { ...state, members: action.members }
    case REMOVE_GROUP:
      return { ...state, group: [...state.group, action.group] }
    case UPDATE_REVIEW:
      return {
        ...state,
        groups: state.groups.map(group =>
          group._id === action.group._id ? action.group : group
        )
      }
    case SET_ADMINS:
      return { ...state, groupAdmins: [action.admins] }
    default:
      return state
  }
}



