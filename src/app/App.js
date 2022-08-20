import React from "react";
import { Route } from "react-router-dom";
// import Users from "./components/users";
import Navigation from "./components/navigation";
import Login from "./components/login";
import MainPage from "./components/mainPage";
import UserLayout from "./components/usesLayout";

function App() {
    return (
        <>
            <Navigation />
            <Route path="/login" component={Login} />
            <Route path="/mainPage" component={MainPage} />
            <Route path="/users/:userId?" component={UserLayout} />
            {/* <Route path="/users" component={Users} /> */}
            {/* <Users /> */}
        </>
    );
}

export default App;
