import { combineReducers } from 'redux';

import { tags, tag } from './Tag';
import { home } from './Home';
import { rand_jokes, jokesByTag } from './Joke';
import { tab } from './Tab';
import { rand_poems, poemsByClass } from './Poem.js';


const rootReducer = combineReducers({
    tags,
    tag,
    tab,
    home,
    rand_jokes,
    jokesByTag,
    rand_poems,
    poemsByClass
})

export default rootReducer
