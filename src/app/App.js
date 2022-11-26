import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "./components/ui/navigation";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import AuthProvider from "./hooks/useAuth";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQualities";

function App() {
    return (
        <>
            <AuthProvider>
                <Navigation />

                <QualityProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>

            <ToastContainer />
        </>
    );
}

export default App;
