import React, { Component } from 'react';
import { Icon } from 'react-fa';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

import './JokeListCell.css';

export default class PoemListCell extends Component {

    render(){
        return (
            <div>
                <WingBlank size='sm'>
                <WhiteSpace size='lg' />
                <Card full={true}>
                    <Card.Header
                        title={ this.props.poem.name }
                        thumb={false}
                        extra={ this.props.poem.create_time.split(' ')[0] } />
                    <Card.Body>
                    <div className='joke_list_cell_content' style={{ whiteSpace: "pre-line" }}>
                            <Icon name='quote-left' />
                                { this.props.poem.poem }
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
