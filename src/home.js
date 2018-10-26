import React, { Component } from 'react';
import './home.css';

import Contact from './components/contact'

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                    <Contact />
                </header>
            </div>
        );
    }
}

export default Home;
