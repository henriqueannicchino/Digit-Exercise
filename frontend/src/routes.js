import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/logout" element={<Logout />} />
        </Switch>
    </Router>
);

export default Routes;