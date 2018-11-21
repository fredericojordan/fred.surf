import React, { Component } from 'react';
import InstagramEmbed from 'react-instagram-embed'

import './sports.css'


class SportsPage extends Component {
    render() {
        return (
            <div className="sports">
                <InstagramEmbed
                    className='insta'
                    url='https://instagr.am/p/BISbbi6jw7z/'
                    maxWidth={640}
                    hideCaption={false}
                />
                <InstagramEmbed
                    className='insta'
                    url='https://www.instagr.am/p/BPYs6Evj-0v/'
                    maxWidth={640}
                    hideCaption={false}
                />
                <InstagramEmbed
                    className='insta'
                    url='https://www.instagr.am/p/Bm6FP_PHMqQ/'
                    maxWidth={640}
                    hideCaption={false}
                />
            </div>
        );
    }
}

export default SportsPage;
