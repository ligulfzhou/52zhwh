import React, { Component } from 'react';
import { Icon } from 'react-fa';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import './JokeListCell.css';

export default class JokeListCell extends Component {

    render(){
        return (
            <div>
                <WingBlank size='sm'>
                <WhiteSpace size='lg' />
                <Card full={true}>
                    <Card.Header
                        title={ this.props.joke.title }
                        thumb={false}
                        extra={ this.props.joke.create_time.split(' ')[0] } />
                    <Card.Body>
                        <div className='joke_list_cell_content' style={{ whiteSpace: "pre-line" }}>
                            <Icon name='quote-left' /> <br />
                                { this.props.joke.content } <br />
                            <Icon name='quote-right' />
                        </div>
                        <div>
                            <div className='joke_list_cell_count'>
                            </div>
                            <div className='joke_list_cell_comments_count'>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                </WingBlank>
            </div>
        )
    }
}
