import React, { Component } from 'react';
import './home.css';

import Contacts from '../components/molecules/contacts'

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <header className="Home-header">
                    <Contacts />
                </header>
            </div>
        );
    }
}

export default Home;
