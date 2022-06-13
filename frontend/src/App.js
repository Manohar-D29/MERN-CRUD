import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import Signup from "./component/Signup";
import Update from "./component/Update";
import Login from "./component/Login";
import UserSign from "./component/UserSign";
import About from "./component/About";
import Logout from "./component/Logout";
const App = () => {
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/update/:id" component={Update} />
        <Route exact path="/signup" component={UserSign} />
        <Route exact path="/about" component={About} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </>
  );
};

export default App;
