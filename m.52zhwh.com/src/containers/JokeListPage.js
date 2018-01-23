import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRandJokes } from '../actions/Joke';

import { Button, WingBlank, WhiteSpace } from 'antd-mobile';
import JokeListCell from '../components/JokeListCell';


class JokeListPage extends Component {

    onClickMoreButton() {
        const { dispatch } = this.props;
        dispatch(fetchRandJokes());
    }

    onClickJoke(item) {
        console.log(item.id)
    }

    renderItem(item) {
        return(
            <JokeListCell
                joke={item}
                key={ 'joke_' + item.id }
                onClick = {() => this.onClickJoke(item)}
                />
        )
    }

    render() {
        var disabled = this.props.rand_jokes.isFetching;
        var title = this.props.rand_jokes.isFetching ? '加载中': '加载更多';
        return (
            <div>
                { this.props.rand_jokes.items.map(this.renderItem)}
                <WhiteSpace size='md' />
                <WingBlank size='lg'>
                <Button disabled={ disabled } onClick={ ()=>this.onClickMoreButton() }> { title } </Button>
                </WingBlank>
                <WhiteSpace size='md' />
            </div>
        )
    }
}

export default connect(
    state=>({
        rand_jokes: state.rand_jokes
    })
)(JokeListPage)

