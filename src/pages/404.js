import React, { Component } from 'react';

import './home.css'

class Page404 extends Component {
    render() {
        return (
            <div className="home">
                <div className="home__text">
                    Error 404
                    <br />
                    Page not found!
                </div>
            </div>
        );
    }
}

export default Page404;
