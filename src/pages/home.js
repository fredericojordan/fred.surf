import React, { Component } from 'react';
import './home.css';

import Contacts from '../components/molecules/contacts'
import Header from '../components/molecules/header'

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Header />
                <Contacts />
            </div>
        );
    }
}

export default Home;
