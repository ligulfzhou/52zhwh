import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRandPoems, fetchPoem } from '../actions/Poem';
import { Button, WingBlank, WhiteSpace } from 'antd-mobile';

import PoemListCell from '../components/PoemListCell';


class FilteredPoemsPage extends Component {

    constructor() {
        super()
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchPoem(this.props.filter, this.props.keyword));
    }

    onClickMoreButton() {
        const { dispatch } = this.props;
        dispatch(fetchPoem(this.props.filter, this.props.keyword));
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
        var disabled = this.props.poems.isFetching;
        var title = this.props.poems.isFetching ? '加载中': '加载更多';
        return (
            <div>
                { this.props.poems.items.map(this.renderItem)}
                <WhiteSpace size='md' />
                <WingBlank size='lg'>
                <Button disabled={ disabled } onClick={ ()=>this.onClickMoreButton() }> { title } </Button>
                </WingBlank>
                <WhiteSpace size='md' />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    const params = new URLSearchParams(ownProps.location.search);
    const keys = ['form', 'dynasty', 'type'];
    let filter='';
    let keyword='';
    for (var i=0; i<keys.length; i++){
        var k = params.get(keys[i]);
        if (k){
            filter = keys[i];
            keyword = k;
        }
    }

    var poems = state.poemsByClass[keyword] || {
        'isFetching': false,
        'didInvalidate': false,
        'items': [],
        'page': 0,
        'total_page': 0
    }

    console.log(poems);
    return {
        poems: poems,
        keyword: keyword,
        filter: filter
    }
}

export default connect(mapStateToProps)(FilteredPoemsPage);
