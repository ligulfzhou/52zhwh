import React, { Component } from 'react';
import { connect } from 'react-redux';

import TagList from '../components/TagList';
import { fetchTags } from '../actions/Tag';

import { Button, WingBlank, WhiteSpace } from 'antd-mobile';


class TagListPage extends Component {

    //componentDidMount() {
    //    const { dispatch } = this.props;
    //    dispatch(fetchTags())
    //}

    onClickMoreButton() {
        const { dispatch } = this.props;
        dispatch(fetchTags())
    }

    render() {
        var disabled = this.props.tags.isFetching;
        var title = this.props.tags.isFetching ? '加载中': '加载更多'
        return (
            <div>
                <TagList tags={ this.props.tags.items } />
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
        tags: state.tags
    })
)(TagListPage)

