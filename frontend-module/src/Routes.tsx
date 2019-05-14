import * as React from "react";
import {Route} from "react-router";
import {ClothesPage} from "./ClothesPage";
import createHistory from 'history/createBrowserHistory';
import {AdminPage} from "./AdminPage";

export const browserHistory = createHistory({basename: '/'});

export class Routes extends React.Component {
    public render() {
        return <div id="container">
                <Route exact={true} path="/" component={ClothesPage}/>
                <Route exact={true} path="/AdminPage" component={AdminPage}/>
            </div>;
    }
}