import { 
	LOGIN_ENTERED, ACCESS_FETCHED, ACCESS_GRANTED, ACCESS_DENIED, 
	GROUP_OPEN_TOGGLED, CLOSE_GROUP, OPEN_GROUP, UPDATE_SIBLINGS, 
	DISPLAY_BUTTONS, START_ADDING, FINISH_EDITING, START_EDITING 
} from '../actionTypes'

//TODO: divide reducers and state with combineReducers()

export default rootReducer = (state, action) => {
	let newState
	switch(action.type) {
		case ACCESS_FETCHED:
			return {...state, fetchingAccess: true}
		case ACCESS_GRANTED:
			return {...state, fetchingAccess: false, sessionId: action.payload}
		case ACCESS_DENIED:
			return {...state, fetchingAccess: false, sessionId: ''}
		
		case OPEN_GROUP:
			newState =  JSON.parse(JSON.stringify(state))  // deep cloning. Crutch. TODO: refactor with immutableJS
			setOpenFlagById(action.payload, newState.group, true)
			return newState
		case CLOSE_GROUP:
			newState =  JSON.parse(JSON.stringify(state))  
			setOpenFlagById(action.payload, newState.group, false)
			return newState
		case UPDATE_SIBLINGS: 
			newState =  JSON.parse(JSON.stringify(state))
			updateSiblings(action.payload.groupId, newState.group, action.payload.siblings)
			return newState
		case DISPLAY_BUTTONS:
			newState =  JSON.parse(JSON.stringify(state))
			displayButtonsById(action.payload, newState.group)
			return newState
		case START_ADDING:
			newState = {...state, editableGroup: {parent: action.payload}}
			return newState
		case START_EDITING:
			newState = {...state, editableGroup: action.payload}
			return newState
		case FINISH_EDITING:
			newState = {...state, editableGroup: null}
			return newState
		default:
			return state
	}
}

function displayButtonsById(groupId, parentgroup) {
	if (parentgroup.id == groupId) {
		parentgroup.displayButtons = true
		return true
	} else {
		parentgroup.groups.map( (group) => {
			if (displayButtonsById(groupId, group)) {
				return true
			}
		})
		return false
	}
}

function updateSiblings(groupId, parentgroup, siblings) {
	if (parentgroup.id == groupId) {
		parentgroup.groups = siblings
		return true
	} else {
		parentgroup.groups.map( (group) => {
			if (updateSiblings(groupId, group, siblings)) {
				return true
			}
		})
		return false
	}
}

function setOpenFlagById(id, parentgroup, value) {
		if (parentgroup.id == id) {
			parentgroup.open = value
			return true
		} else {
			parentgroup.groups.map( (group) => {
				if (setOpenFlagById(id, group, value)) {
					return true
				}
			})
		} 
	return false
}
