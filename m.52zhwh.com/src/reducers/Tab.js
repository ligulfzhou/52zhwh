import { SELECT_TAB } from '../actions/Tab.js';

export const tab = (state={tab: "1"}, action={}) => {
	switch(action.type){
		case SELECT_TAB:
			return {
				...state,
				tab: action.tab,
                hidden: false
			}
		default:
			return state
	}
}
