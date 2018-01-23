import { API_ROOT } from '../const';
export const REQUEST_TAGS = 'REQUEST_TAGS'
export const RECEIVE_TAGS = 'RECEIVE_TAGS'


export const requestTags = (page=1) => ({
	type: REQUEST_TAGS,
    page: page
})

export const receiveTags = function(json) {
	return {
		type: RECEIVE_TAGS,
		tags: json.tags,
        total_page: json.total_page,
        page: json.page
	}
}


//export const fetchTags = (page=1) => (dispatch, getState) => {
export const fetchTags = () => (dispatch, getState) => {
    var page=1;
    var tags = getState().tags;
    if (tags.items.length>0) {
        page = tags.page + 1;
    }

    dispatch(requestTags(page))
    return fetch(API_ROOT + '/api/jokes/tags?page=' + page)
        .then(response => response.json())
        .then(json=>dispatch(receiveTags(json)))
}


export const REQUEST_TAG = 'REQUEST_TAG'
export const RECEIVE_TAG = 'RECEIVE_TAG'

export const requestTag = (tag_id) => ({
	type: REQUEST_TAG,
    tag_id: tag_id
})

export const receiveTag = function(json) {
	return {
		type: RECEIVE_TAG,
		tag: json.tag,
	}
}

export const fetchTag = (tag_id) => dispatch => {
    dispatch(requestTag(tag_id))
	return fetch(API_ROOT + '/api/tags/'+tag_id)
		.then(response => response.json())
		.then(json=>dispatch(receiveTag(json)))
}
