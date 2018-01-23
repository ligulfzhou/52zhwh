import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Tag, Grid } from 'antd-mobile';

import './TagList.css';

export default class TagList extends Component {

	render () {
        var tags = this.props.tags || [];

		return (
            <div className="tag-container">
            { tags.map(tag=>
                (<Tag key={ 'tag_' + tag.id }
                onChange={ ()=> {
                    console.log(tag.id)
                    browserHistory.push('/joke/tags/'+tag.id)
                }}> {tag.name} </Tag>)) }
            </div>
		)
	}
}
