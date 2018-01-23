import union from 'lodash/union';
import { REQUEST_TAGS, RECEIVE_TAGS } from '../actions/Tag.js';
import { REQUEST_TAG, RECEIVE_TAG } from '../actions/Tag.js';


export const tags = (state={
	isFetching: false,
	didInvalidate: false,
	items: [],
    page: 0,
    total_page: 0
	}, action={}) => {
		switch(action.type){
			case REQUEST_TAGS:
				return {
					...state,
					isFetching: true,
					didInvalidate: false
				}
			case RECEIVE_TAGS:
				return {
					...state,
					isFetching: false,
					didInvalidate: false,
					items: union(state.items, action.tags),
                    page: action.page,
                    total_page: action.total_page
				}
			default:
				return state
		}
	}


export const tag = (state={
	isFetching: false,
	tag: {}
}, action={}) => {
	switch(action.type){
	case REQUEST_TAG:
		return {
			...state,
			isFetching: true,
		}
	case RECEIVE_TAG:
		return {
			...state,
			isFetching: false,
			tag: action.tag,
		}
	default:
		return state
	}
}
