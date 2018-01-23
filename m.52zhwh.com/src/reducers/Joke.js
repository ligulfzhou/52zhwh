import union from 'lodash/union';
import {
    REQUEST_RAND_JOKES,
    RECEIVE_RAND_JOKES,
    REQUEST_TAG_JOKES,
    RECEIVE_TAG_JOKES
} from '../actions/Joke';


export const rand_jokes = (state={
	isFetching: false,
	didInvalidate: false,
	items: [],
    page: 0,
    total_page: 0
}, action={}) => {
	switch(action.type){
	case REQUEST_RAND_JOKES:
		return {
			...state,
			isFetching: true,
			didInvalidate: false
		}
	case RECEIVE_RAND_JOKES:
		return {
			...state,
			isFetching: false,
			didInvalidate: false,
			items: union(state.items, action.jokes),
            page: action.page,
            total_page: action.total_page,
		}
	default:
		return state
	}
}


function tag_jokes (state={
    isFetching: false,
    didInvalidate: false,
    items: [],
    page: 0,
    total_page: 0
}, action={}) {
    switch(action.type){
    case REQUEST_TAG_JOKES:
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false
        })
    case RECEIVE_TAG_JOKES:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            items: union(state.items, action.jokes),
            page: action.page,
            total_page: action.total_page
        })
    default:
        return state
    }
}

export const jokesByTag = (state = {}, action) => {
    switch (action.type){
    case REQUEST_TAG_JOKES:
    case RECEIVE_TAG_JOKES:
        var items = tag_jokes(state[action.tag], action);
        return Object.assign({}, state, {
            [action.tag]: tag_jokes(state[action.tag], action)
        })
    default:
        return state
    }
}
