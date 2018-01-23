import { API_ROOT } from '../const';
export const REQUEST_RAND_JOKES = 'REQUEST_RAND_JOKES'
export const RECEIVE_RAND_JOKES = 'RECEIVE_RAND_JOKES'


export const requestRandJokes = (page=1) => ({
	type: REQUEST_RAND_JOKES,
    page: page
})

export const receiveRandJokes= function(json) {
	return {
		type: RECEIVE_RAND_JOKES,
		jokes: json.jokes,
        page: json.page,
        total_page: json.total_page,
	}
}

export const fetchRandJokes = () => (dispatch, getState) => {
    var page=1;
    var rand_jokes = getState().rand_jokes;
    if (rand_jokes.items.length>0){
        page = rand_jokes.page + 1;
    }

    dispatch(requestRandJokes(page))
	return fetch(API_ROOT + '/api/jokes/rand?page=' + page)
		.then(response => response.json())
		.then(json=>dispatch(receiveRandJokes(json)))
}


export const REQUEST_TAG_JOKES = 'REQUEST_TAG_JOKES'
export const RECEIVE_TAG_JOKES = 'RECEIVE_TAG_JOKES'


export const requestTagJokes = (page=1, tag=1) => ({
    type: REQUEST_TAG_JOKES,
    page: page,
    tag: tag
})

export const receiveTagJokes = function(tag, json) {
    return {
        type: RECEIVE_TAG_JOKES,
        jokes: json.jokes,
        page: json.page,
        total_page: json.total_page,
        tag: tag
    }
}

export const fetchTagJokes = (tag_id=1) => (dispatch, getState) => {
    var page=1;
    var jokes = getState().jokesByTag[tag_id];
    if (jokes && jokes['items'].length>0){
        page = jokes.page + 1;
    }
    dispatch(requestTagJokes(page, tag_id));
    //return fetch(API_ROOT + '/api/jokes/tags/'+tag_id+"?page="+page)
    //    .then(response => response.json())
    //    .then(json=>dispatch(receiveTagJokes(tag_id, json)))
    return fetch(API_ROOT + '/api/jokes/tags/'+tag_id+"?page="+page)
        .then(function(response){
            console.log(response)
            return response.json()
        })
        .then(json=>dispatch(receiveTagJokes(tag_id, json)))
}
