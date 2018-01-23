import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { WingBlank, NavBar, SearchBar, WhiteSpace } from 'antd-mobile';
import { Icon } from 'react-fa';

import { fetchHome } from '../actions/Home';
import { fetchTags } from '../actions/Tag';
import { fetchRandJokes } from '../actions/Joke';
import { selectTab } from '../actions/Tab';

import JokeList from '../components/JokeList.js';
import TagList from '../components/TagList.js';
import TagListPage from '../containers/TagListPage.js';
import PoemList from '../components/PoemList.js';

import { Tabs, Flex } from 'antd-mobile';
const TabPane = Tabs.TabPane;

import { hashHistory } from 'react-router';
import './JokeApp.css';


const MyTab = props => (
        <div style={{
            backgroundColor: 'white',
            color: '#bbb',
            textAlign: 'center',
            height: '0.87rem',
            lineHeight: '0.87rem',
            borderBottom: 'solid red 1',
        }}> { props.title } </div>
);


class App extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchRandJokes(1))
        dispatch(fetchTags())

        console.log(this.props);
    }

    searchOnChange(text) {
        console.log(text)
    }

    handleOnClickTab(tab) {
        // const { dispatch } = this.props;
        // dispatch(selectTab(tab))
    }

    render() {

        return (
            <div>
                <NavBar iconName={false} leftContent={
                    <Icon key='icon1' name='rocket' />} mode="light" onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                ]} ><div style={{ fontFamily: 'Arial Rounded MT Bold' }}>笑话子站 - 吾爱中华文化</div></NavBar>
            <whiteSpace size='md' />
            <ul className='navigation-jokeapp'>
                    <li onClick={ ()=>this.handleOnClickTab(1) } className='navigation-item' style={{ borderBottom: this.props.location.pathname=="/joke"?'solid black':'none' }}><Link to="/joke"> 今日推荐</Link></li>
                    <li onClick={ ()=>this.handleOnClickTab(2) } className='navigation-item' style={{ borderBottom: this.props.location.pathname=="/joke/tags"?'solid black':'none' }}><Link to="/joke/tags"> 类型 </Link></li>
                </ul>
                { this.props.children }
                <div style={{ display: "none" }}> Footer </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        tab: state.tab,
    })
)(App);
