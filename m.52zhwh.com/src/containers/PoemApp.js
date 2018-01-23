import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { WingBlank, NavBar, SearchBar } from 'antd-mobile';
import { Icon } from 'react-fa';

import { fetchRandPoems } from '../actions/Poem';
import { selectTab } from '../actions/Tab';

import JokeList from '../components/JokeList.js';
import TagList from '../components/TagList.js';
import TagListPage from '../containers/TagListPage.js';
import PoemList from '../components/PoemList.js';

import { Tabs, WhiteSpace, Flex } from 'antd-mobile';
const TabPane = Tabs.TabPane;

import { hashHistory } from 'react-router';
import './PoemApp.css';


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
        dispatch(fetchRandPoems(1));
        // dispatch(fetchTags());

        console.log(this.props);
    }

    searchOnChange(text) {
        console.log(text);
    }

    handleOnClickTab(tab) {
        // const { dispatch } = this.props;
        // dispatch(selectTab(tab))
    }

    render() {

        console.log(this.props.location.pathname);
        return (
            <div>
                <NavBar iconName={false} leftContent={
                    <Link to="/"><Icon key='icon1' name='home' /></Link>
                    }
                    mode="light" onLeftClick={() => console.log('onLeftClick')}
                rightContent={[
                ]} ><div style={{ fontFamily: 'Arial Rounded MT Bold' }}>诗歌子站 - 吾爱中华文化</div>
                </NavBar>

               <ul className='navigation'>
                    <li onClick={ ()=>this.handleOnClickTab(1) } className='navigation-item' style={{ borderBottom: this.props.location.pathname=="/poems"?'solid black':'none' }}><Link to="/poems"> 随机 </Link></li>
                    <li onClick={ ()=>this.handleOnClickTab(2) } className='navigation-item' style={{ borderBottom: this.props.location.pathname=="/poems/select"?'solid black':'none' }}><Link to="/poems/select"> 分类 </Link></li>
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
