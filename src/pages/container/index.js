import React, {Component} from "react";
import { Route, withRouter } from "react-router-dom";

import Home from "../home";
import FastChessPage from "../fast-chess";
import ContactPage from "../contact";


class Container extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/fast-chess" component={FastChessPage}/>
                <Route path="/contact" component={ContactPage}/>
            </div>
        );
    }
}

export default withRouter(Container);
