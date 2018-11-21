import React, {Component} from "react";
import { Route, withRouter } from "react-router-dom";

import Home from "../home";
import SportsPage from "../sports";
import ContactPage from "../contact";
// import FastChessPage from "../fast-chess";


class Container extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/sports" component={SportsPage}/>
                <Route path="/contact" component={ContactPage}/>
                {/*<Route path="/fast-chess" component={FastChessPage}/>*/}
            </div>
        );
    }
}

export default withRouter(Container);
