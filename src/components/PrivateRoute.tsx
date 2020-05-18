import React from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthService} from "../services/AuthService";

const PrivateRoute = ({component, path}: any) => {

    const isAuthenticated = AuthService.isLoggedIn();

    const routeComponent = (props: any) => (
        isAuthenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/'}}/>
    );
    return <Route path={path} render={routeComponent} exact/>;
};

export default PrivateRoute
