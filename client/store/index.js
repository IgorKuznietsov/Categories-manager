import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const initialState = {
	login: '',
	sessionId: '',
	fetchingAccess: false,
	group: {
		name: 'Root Group',
		id: 'root',  //root element's id is 'root', all other ids we get from database 
		open: false,
		groups:[],
		displayButtons: false
		},
	editableGroup: null
}

export default store  = createStore(rootReducer, initialState, applyMiddleware(thunk))