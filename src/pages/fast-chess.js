import React, { Component } from 'react';

import './fast-chess.css'

class FastChessPage extends Component {
    render() {
        return (
            <div className="fast-chess">
                <iframe title='fast-chess' src="https://fredericojordan.github.io/fast-chess/" />
            </div>
        );
    }
}

export default FastChessPage;
