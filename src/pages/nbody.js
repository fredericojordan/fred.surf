import React, { Component } from 'react';

import './nbody.css'

class NBodyPage extends Component {
    render() {
        return (
            <div className="nbody">
                <canvas id="canvas" width="700" height="700">
                  Please update your browser in order to view this page.
                </canvas>
            </div>
        );
    }

    componentDidMount () {
        const script = document.createElement("script");

        script.src = "/nbody-physics.js";
        script.async = true;

        document.body.appendChild(script);
    }
}

export default NBodyPage;
