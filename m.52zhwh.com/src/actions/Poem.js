import { API_ROOT } from '../const';

export const REQUEST_RAND_POEMS = 'REQUEST_RAND_POEMS'
export const RECEIVE_RAND_POEMS = 'RECEIVE_RAND_POEMS'


export const requestRandPoems = (page=1) => ({
	type: REQUEST_RAND_POEMS,
    page: page
})

export const receiveRandPoems= function(json) {
	return {
		type: RECEIVE_RAND_POEMS,
		poems: json.poems,
        page: json.page,
        total_page: json.total_page,
	}
}

export const fetchRandPoems = () => (dispatch, getState) => {
    var page=1;
    var rand_poems = getState().rand_poems;
    if (rand_poems.items.length>0){
        page = rand_poems.page + 1;
    }

    dispatch(requestRandPoems(page))
	return fetch(API_ROOT + '/api/poems/rand?page=' + page)
		.then(response => response.json())
		.then(json=>dispatch(receiveRandPoems(json)))
}

export const REQUEST_POEM = 'REQUEST_POEM';
export const RECEIVE_POEM = 'RECEIVE_POEM';


//  filter: tag/tp/dynasty
export const requestPoem = (filter='', keyword='', page=1) => ({
    type: REQUEST_POEM,
    filter: filter,
    keyword: keyword,
    page: page,
})

export const receivePoem = function(json, filter, keyword) {
	return {
		type: RECEIVE_POEM,
		poems: json.poems,
        page: json.page,
        total_page: json.total_page,
        filter: filter,
        keyword: keyword
	}
}

// export const fetchTagJokes = (tag_id=1) => (dispatch, getState) => {
export const fetchPoem = (filter='', keyword='') => (dispatch, getState) => {
    var page=1;
    var poems = getState().poemsByClass[keyword];
    if (poems && poems['items'].length>0){
        page = poems.page + 1;
    }
    dispatch(requestPoem(filter, keyword, page));
	return fetch(API_ROOT + '/api/poems/poems?'+filter+'='+keyword+'&'+'page='+page)
		.then(response => response.json())
		.then(json=>dispatch(receivePoem(json, filter, keyword)))
}
