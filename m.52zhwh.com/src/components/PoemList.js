import React, { Component } from 'react';
import PoemListCell from './PoemListCell';

export default class JokeList extends Component {

    constructor(props){
        super(props);
    }

    onClickJoke(poem_id){
        console.log(poem_id);
    }

    render (){
        var poems = this.props.poems || [];
        return(
            <div>
                { poems.map(item=> (
                    <PoemListCell
                        poem={item}
                        key={ 'peom_' + item.id }
                        onClick = {() => this.onClickJoke(item.id)}
                    />
                ))}
            </div>
        )
    }
}
