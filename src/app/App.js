import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import Users from "./components/users";
import Navigation from "./components/navigation";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UserLayout from "./layouts/usesLayout";

function App() {
    return (
        <>
            <Navigation />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UserLayout} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
