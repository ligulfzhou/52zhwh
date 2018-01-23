import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Icon } from 'react-fa';

import { fetchTagJokes } from '../actions/Joke';
import JokeListCell from '../components/JokeListCell';

import { WingBlank, WhiteSpace, Button } from 'antd-mobile';

import { hashHistory } from 'react-router';


class App extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        this.tag_id = parseInt(this.props.params.tag_id)
        console.log(this.tag_id);
        dispatch(fetchTagJokes(this.tag_id))
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

    onClickMoreButton() {
        const { dispatch } = this.props;

        dispatch(fetchTagJokes(this.tag_id))
    }

    render() {
        var disabled = this.props.jokes.isFetching || (this.props.jokes.page==this.props.jokes.total_page && this.props.jokes.page!=0);
        var title = this.props.jokes.isFetching ? '加载中': '加载更多';
        if (this.props.jokes.page>this.props.jokes.total_page){
            title = '没有了';
        }
        return (
                <div>
                { this.props.jokes.items.map(this.renderItem) }
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
    const tag_id = ownProps.params.tag_id;
    const { JokesByTag } = state
    var jokes = state.jokesByTag[tag_id] || {
        'isFetching': false,
        'didInvalidate': false,
        'items': [],
        'page': 0,
        'total_page': 0
    }
    return {
        jokes: jokes,
        tab: state.tab
    }
}

export default connect(mapStateToProps)(App);
