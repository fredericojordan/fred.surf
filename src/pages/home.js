import React, { Component } from 'react';
import './home.css';

import Contacts from '../components/molecules/contacts'

class Home extends Component {
    render() {
        return (
            <div className="home">
                <header className="home__header">
                    <Contacts />
                </header>
            </div>
        );
    }
}

export default Home;
