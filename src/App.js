import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import OfficeView from "./components/OfficeView";
import "./styles/universal.css";
import "./styles/App.css";

export const App = () => {
    return (
        <div className='app-container'>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to='/home' />
                    </Route>
                    <Route exact path='/home' component={Home} />
                    <Route
                        exact
                        path='/office/:officeId'
                        component={OfficeView}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
