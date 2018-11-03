import React from 'react'

import Contact from '../../atoms/contact/index'

import './styles.css'

const Contacts = props => (
    <div className="contacts">
        <Contact target="https://github.com/fredericojordan/" image="/images/github.png" alt="My github" />
        <Contact target="https://www.linkedin.com/in/frederico-jordan/" image="/images/linkedin.png" alt="My linkedin" />
        <Contact target="https://www.instagram.com/fredericojordan/" image="/images/instagram.png" alt="My instagram" />
    </div>
);


export default Contacts