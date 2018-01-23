import { API_ROOT } from '../const';

export const REQUEST_HOME = 'REQUEST_HOME'
export const RECEIVE_HOME = 'RECEIVE_HOME'

export const requestHome = () => ({
	type: REQUEST_HOME
})

export const receiveHome = function(json) {
	return {
		type: RECEIVE_HOME,
		home: json
	}
}

export const fetchHome = () => dispatch => {
    dispatch(requestHome())
	return fetch(API_ROOT + '/api/m/home')
		.then(response => response.json())
		.then(json=>dispatch(receiveHome(json)))
}
