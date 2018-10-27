import React from 'react'

import './styles.css'

const Contact = props => (
    <div class="Contact">
        <a href={props.target}>
            <img src={props.image} alt={props.alt} />
            {props.children}
        </a>
    </div>
);

export default Contact