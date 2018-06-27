import React, { Component } from 'react';

export default class GoogleAdsense extends Component {

    componentDidMount () {
        if (window) {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
        }
    }

    render() {
        return (
                <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client=""
                    data-ad-slot={ this.props.slot }
                    data-ad-format={ this.props.format }
                />
        )
    }

}
//ca-pub-9174125730777485
