import React, { Component } from 'react';

import './nbody.css'

class NBodyPage extends Component {
    render() {
        return (
            <div className="nbodyContainer">
                <canvas id="canvas" height="600" width="1000">
                  Please update your browser in order to view this page.
                </canvas>

                <div className="buttonContainer">
                    <button id="tracesBtn">
                        Traces
                    </button>
                    <button id="resetBtn">
                        Reset
                    </button>
                    <button id="presetBtn">
                        Preset
                    </button>
                </div>
            </div>
        );
    }

    componentDidMount () {
        const script = document.createElement("script");

        script.src = "/nbody-physics.js";
        script.async = true;

        document.body.appendChild(script);

        document.getElementById("tracesBtn").setAttribute( "onClick", "javascript: toggleTraces();" );
        document.getElementById("resetBtn").setAttribute( "onClick", "javascript: clearParticles();" );
        document.getElementById("presetBtn").setAttribute( "onClick", "javascript: preset();" );
    }
}

export default NBodyPage;
