import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRandPoems } from '../actions/Poem';

import { Button, WingBlank, WhiteSpace } from 'antd-mobile';
import PoemListCell from '../components/PoemListCell';


class JokeListPage extends Component {

    onClickMoreButton() {
        const { dispatch } = this.props;
        dispatch(fetchRandPoems());
    }

    onClickJoke(item) {
        console.log(item.id)
    }

    renderItem(item) {
        return(
            <PoemListCell
                poem={item}
                key={ 'poem_' + item.id }
                onClick = {() => this.onClickJoke(item)}
                />
        )
    }

    render() {
        var disabled = this.props.rand_poems.isFetching;
        var title = this.props.rand_poems.isFetching ? '加载中': '加载更多';
        return (
            <div>
                { this.props.rand_poems.items.map(this.renderItem)}
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
        rand_poems: state.rand_poems
    })
)(JokeListPage)
