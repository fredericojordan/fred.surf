import React, { Component } from 'react';

class JS13k extends Component {
    render = () => <div id="js13k"></div>

    componentDidMount () {
        const script = document.createElement("script");

        script.src = "/js13k-min.js";
        script.async = true;

        document.body.appendChild(script);
    }
}

export default JS13k;
