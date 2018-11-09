import React, {Component} from "react";
import { Route, withRouter } from "react-router-dom";

import Home from "../home.js";
import ContactPage from "../contact.js";


class Container extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/contact" component={ContactPage}/>
            </div>
        );
    }
}

export default withRouter(Container);
