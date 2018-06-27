import { REQUEST_HOME, RECEIVE_HOME} from '../actions/Home.js';

export const home = (state={
	isFetching: false,
	didInvalidate: false,
	home: {}
	}, action={}) => {
		switch(action.type){
			case REQUEST_HOME:
				return {
					...state,
					isFetching: true,
					didInvalidate: false
				}
			case RECEIVE_HOME:
				return {
					...state,
					isFetching: false,
					didInvalidate: false,
					home: action.home
				}
			default:
				return state
		}
	}
