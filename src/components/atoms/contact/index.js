import React from 'react'

import './styles.css'

const Contact = props => (
    <div className="contact">
        <a className="contact__link" href={props.target}>
            <img className="contact__image" src={props.image} alt={props.alt} />
            {props.children}
        </a>
    </div>
);

export default Contact