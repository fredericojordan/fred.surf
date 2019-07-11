import React, {Component} from "react";
import ReactGA from "react-ga";
import { Route, withRouter, Switch } from "react-router-dom";

import Home from "../home";
import SportsPage from "../sports";
import FastChessPage from "../fast-chess";
import ContactPage from "../contact";
import NBodyPage from "../nbody";
import Page404 from "../404";


class Container extends Component {
    constructor(props, context) {
        super(props, context);
        ReactGA.initialize('UA-143670401-1')
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        return (
            <div className='route-container'>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/sports" component={SportsPage}/>
                    <Route path="/fast-chess" component={FastChessPage}/>
                    <Route path="/contact" component={ContactPage}/>
                    <Route path="/nbody" component={NBodyPage}/>
                    <Route component={Page404}/>
                </Switch>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (window.location.pathname !== prevProps.location.pathname) {
            ReactGA.pageview(window.location.pathname);
        }
    }
}

export default withRouter(Container);
