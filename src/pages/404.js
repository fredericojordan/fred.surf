import React, { Component } from 'react';
import { Route } from "react-router-dom";

import './home.css'

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }}
  />
);

class Page404 extends Component {
    render() {
        return (
            <Status code={404}>
                <div className="home">
                    <div className="home__text">
                        Error 404
                        <br />
                        Page not found!
                    </div>
                </div>
            </Status>
        );
    }
}

export default Page404;
