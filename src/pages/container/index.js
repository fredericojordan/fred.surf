import React, {Component} from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import Home from "../home";
import SportsPage from "../sports";
import ContactPage from "../contact";
import Page404 from "../404";
// import FastChessPage from "../fast-chess";


class Container extends Component {
    render() {
        return (
            <div className='route-container'>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/sports" component={SportsPage}/>
                    <Route path="/contact" component={ContactPage}/>
                    <Route component={Page404}/>
                    {/*<Route path="/fast-chess" component={FastChessPage}/>*/}
                </Switch>
            </div>
        );
    }
}

export default withRouter(Container);
