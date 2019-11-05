import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from './pages/main';
import Repository from './pages/repository';
import Sigin from './pages/login';
import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component: Component }) => (
    <Route
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
                <PrivateRoute path="/" exact component={Sigin} />
                <Route path="/main" component={Main} />
                <Route path="/repository/:repository" component={Repository} />
                <Route path="*" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}
