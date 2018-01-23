import React from 'react';
import ReactDOM from 'react-dom';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import App from './App';

import JokeApp from './containers/JokeApp';
import TagListPage from './containers/TagListPage';
import JokeListPage from './containers/JokeListPage';
import PoemListPage from './containers/PoemListPage';
import TagJokePage from './containers/TagJokePage';
import WeiboAuth from './containers/WeiboAuth';
import PoemApp from './containers/PoemApp';
import PoemTagPage from './containers/PoemTagsPage';
import FilteredPoemsPage from './containers/FilteredPoemsPage';

import './index.css';
import reducer from './reducers/Root.js';
const middleware = [thunk, createLogger()]

const store = createStore(
	reducer,
	applyMiddleware(...middleware)
)

ReactDOM.render(
	  <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ App } />
            <Route path="/joke" component={ JokeApp }>
                <IndexRoute component={ JokeListPage } />
                <Route path="tags" component={ TagListPage } />
                <Route path="tags/:tag_id" component={ TagJokePage } />
            </Route>
            <Route path="/weibo" component={ WeiboAuth } />
            <Route path="/poems" component={ PoemApp } >
                <IndexRoute component={ PoemListPage } />
                <Route path="select" component={ PoemTagPage } />
                <Route path="poets" component={ PoemListPage } />
                <Route path="filter" component={ FilteredPoemsPage } />
            </Route>
        </Router>
  	</Provider>,
  	document.getElementById('root')
);
