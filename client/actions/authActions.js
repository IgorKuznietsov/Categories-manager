import { LOGIN_ENTERED, ACCESS_FETCHED, ACCESS_GRANTED, ACCESS_DENIED } from '../actionTypes'
import localServerURL from '../localServerURL'

const authUrl = localServerURL + '/auth'

export function fetchingAccess() {
	return {type: ACCESS_FETCHED}
}

export function accessGranted(sessionId) {
	return {type: ACCESS_GRANTED, payload: sessionId}
}

export function accessDenied() {
	return {type: ACCESS_DENIED}
}

export function authorize(login, password) {
	return (dispatch) => {
		dispatch(fetchingAccess())
		fetch(authUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				login: login,
				password: password
			})	
		})
		.then((response) => response.json())
		.then((parsedResponse) => {
			if (parsedResponse.sessionId) {
				dispatch(accessGranted(parsedResponse.sessionId))
			} else {
				dispatch(accessDenied()) 
			}
		})
		.catch((err) => {
			console.log(err) 
			dispatch(accessDenied())
		})
	}
}