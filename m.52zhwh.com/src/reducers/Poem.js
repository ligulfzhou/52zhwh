import union from 'lodash/union';
import {
    REQUEST_RAND_POEMS,
    RECEIVE_RAND_POEMS,
    REQUEST_POEM,
    RECEIVE_POEM
} from '../actions/Poem';


export const rand_poems = (state={
	isFetching: false,
	didInvalidate: false,
	items: [],
    page: 0,
    total_page: 0
}, action={}) => {
	switch(action.type){
	case REQUEST_RAND_POEMS:
		return {
			...state,
			isFetching: true,
			didInvalidate: false
		}
	case RECEIVE_RAND_POEMS:
		return {
			...state,
			isFetching: false,
			didInvalidate: false,
			items: union(state.items, action.poems),
            page: action.page,
            total_page: action.total_page,
		}
	default:
		return state
	}
}

function class_poems (state={
    isFetching: false,
    didInvalidate: false,
    items: [],
    page: 0,
    total_page: 0
}, action={}) {
    switch(action.type){
    case REQUEST_POEM:
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false
        })
    case RECEIVE_POEM:
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            items: union(state.items, action.poems),
            page: action.page,
            total_page: action.total_page
        })
    default:
        return state
    }
}

export const poemsByClass = (state = {}, action) => {
    switch (action.type){
    case REQUEST_POEM:
    case RECEIVE_POEM:
        var items = class_poems(state[action.keyword], action);
        return Object.assign({}, state, {
            [action.keyword]: class_poems(state[action.keyword], action)
        })
    default:
        return state
    }
}
