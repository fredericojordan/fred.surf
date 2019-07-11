import React, {Component} from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import Home from "../home";
import SportsPage from "../sports";
import FastChessPage from "../fast-chess";
import NBodyPage from "../nbody";
import SurfApiPage from "../surf-api";
import ContactPage from "../contact";
import Page404 from "../404";


class Container extends Component {
    render() {
        return (
            <div className='route-container'>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/sports" component={SportsPage}/>
                    <Route path="/fast-chess" component={FastChessPage}/>
                    <Route path="/nbody" component={NBodyPage}/>
                    <Route path="/surf-api" component={SurfApiPage}/>
                    <Route path="/contact" component={ContactPage}/>
                    <Route component={Page404}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Container);
