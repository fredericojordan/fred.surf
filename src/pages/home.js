import React, { Component } from 'react';
import InstagramEmbed from 'react-instagram-embed'

import './home.css'


class Home extends Component {
    render() {
        return (
            <div className="home">
                <InstagramEmbed
                    className='insta'
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
                <InstagramEmbed
                    className='insta'
                    url='https://www.instagr.am/p/Bm6FP_PHMqQ/'
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
