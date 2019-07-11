import React, { Component } from 'react';

import './surf-api.css'

class SurfApiPage extends Component {
    render() {
        return (
            <div className="surf-api">
                <iframe title="surf-api" src="http://surf-api.herokuapp.com/" />
            </div>
        );
    }
}

export default SurfApiPage;
