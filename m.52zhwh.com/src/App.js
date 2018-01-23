import React, { Component } from 'react';
import { connect } from 'react-redux';

import { WingBlank, NavBar, NoticeBar } from 'antd-mobile';
import { Icon } from 'react-fa';

import { fetchHome } from './actions/Home';
import JokeList from './components/JokeList.js';
import PoemList from './components/PoemList.js';
import GoogleAdsense from './components/GoogleAdsense.js';


import { Tabs, WhiteSpace, Flex } from 'antd-mobile';
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

class PlaceHolder extends Component {

    render() {
        return (
            <div
                style={{
                    color: '#bbb',
                    textAlign: 'center',
                    height: '0.75rem',
                    lineHeight: '0.75rem',
                    width: '100%',
                    borderRight: 'solid lightgrey',
                }}>
                <a href={ this.props.url }>{ this.props.title }</a>
            </div>
        )
    }
}


class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchHome())
    }

    randomise() {
        const { dispatch } = this.props;
        dispatch(fetchHome())
    }

    render() {
        return (
            <div>
                <NavBar
                    iconName={false}
                    leftContent={<Icon key='icon1' name='rocket' />}
                    mode="light"
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={<Icon key='icon2' name='random' onClick={() => this.randomise()} />}>
                    <div style={{ fontFamily: 'Arial Rounded MT Bold' }}>吾爱中华文化</div>
                </NavBar>
                <div>
                    <div className="flex-container">
                        <Flex style={{ borderBottom: 'solid lightgrey', overflow: 'hidden'}}>
                            <Flex.Item><PlaceHolder title={ '笑话' } url={ '/joke' }/></Flex.Item>
                            <Flex.Item><PlaceHolder title={ '诗歌' } url={ '/poems' }/></Flex.Item>
                        </Flex>
                    </div>
                </div>
                <WhiteSpace size='lg'/>
                <div
                    style={{
                        padding: '0.1rem 0 0.2rem 0.2rem',
                        fontSize: '0.3rem',
                        fontWeight: '0.1rem' }}>
                    <a href='/joke'><Icon name='link' />{ ' ' }笑 话</a>
                </div>
                <div>
                <WingBlank size='sm'>
                    <Tabs defaultActiveKey="1" onChange={callback} style={{ border: 'solid lightgrey' }}>
                        <TabPane tab="随机" key="1">
                            <JokeList jokes={ this.props.home.home.jokes_ram } />
                        </TabPane>
                        <TabPane tab={ this.props.home.home.jokes_tag_1_name } key="2">
                            <JokeList jokes={ this.props.home.home.jokes_tag_1 } />
                        </TabPane>
                        <TabPane tab={ this.props.home.home.jokes_tag_2_name } key="3">
                            <JokeList jokes={ this.props.home.home.jokes_tag_2 } />
                        </TabPane>
                    </Tabs>
                </WingBlank>
                <WhiteSpace size='lg'/>
                </div>

                <div style={{ padding: '0.1rem 0 0.2rem 0.2rem', fontSize: '0.3rem', fontWeight: '0.1rem' }}>
                    <a href='/joke'><Icon name='link' />{ ' ' }诗 歌</a>
                </div>
                <div>
                    <WingBlank size='sm'>
                        <Tabs defaultActiveKey="1" onChange={callback} style={{ border: 'solid lightgrey' }}>
                            <TabPane tab="随机" key="1">
                                <PoemList poems={ this.props.home.home.poems } />
                            </TabPane>
                            <TabPane tab={ this.props.home.home.poems_tag_1_name } key="2">
                                <PoemList poems={ this.props.home.home.poems_tag_1 } />
                            </TabPane>
                            <TabPane tab={ this.props.home.home.poems_tag_2_name } key="3">
                                <PoemList poems={ this.props.home.home.poems_tag_2 } />
                            </TabPane>
                        </Tabs>
                    </WingBlank>
                    <WhiteSpace />
                </div>
                <div>
                    <GoogleAdsense slot='2482352055' format='auto' />
                </div>
                <div style={{ fontSize: '0.3rem', textAlign: 'center', marginBottom: '0.2rem' }}>
                    @吾爱中华文化   联系主人@<a href="mailto:ligulfzhou53@gmail.com">gmail</a>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        home: state.home
    })
)(App);
