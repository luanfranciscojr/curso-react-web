import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from './pages/main';
import Sigin from './pages/login';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{ pathname: '/', state: { from: props.location } }}
                />
            )
        }
    />
);

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Sigin} />
                <PrivateRoute path="/main" component={Main} />
                <PrivateRoute path="/main" component={Main} />
                <Route path="*" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}
