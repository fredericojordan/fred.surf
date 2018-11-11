import React, { Component } from 'react';
import InstagramEmbed from 'react-instagram-embed'

import './home.css'


class Home extends Component {
    render() {
        return (
            <div className="home">
                <InstagramEmbed
                    url='https://instagr.am/p/BISbbi6jw7z/'
                    maxWidth={640}
                    hideCaption={false}
                    containerTagName='div'
                    protocol=''
                    injectScript
                    onLoading={() => {}}
                    onSuccess={() => {}}
                    onAfterRender={() => {}}
                    onFailure={() => {}}
                />
            </div>
        );
    }
}

export default Home;
