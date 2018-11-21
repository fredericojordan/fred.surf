import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './app.css';

import Header from '../components/molecules/header'
import Container from '../pages/container'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                  <div className="tint">
                    <Header />
                    <Container />
                  </div>
                </div>
            </Router>
        );
    }
}

export default App;
