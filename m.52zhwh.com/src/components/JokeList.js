import React, { Component } from 'react';
import JokeListCell from './JokeListCell';

export default class JokeList extends Component {

    constructor(props){
        super(props);
    }

    onClickJoke(joke_id){
        console.log(joke_id);
    }

    render (){
        var jokes = this.props.jokes || [];
        return(
            <div>
                {  
                    jokes.map(item=> (
                        <JokeListCell
                            joke={item}
                            key={ 'joke_' + item.id }
                            onClick = {() => this.onClickJoke(item.id)}
                        />))
                }
            </div>
        )
    }
}
