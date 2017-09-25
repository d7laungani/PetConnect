import { BrowserRouter, Route, Switch } from 'react-router-dom'
import React from 'react';
import NotFoundPage from '../components/404Page/'
import Home from '../pages/Home/home.container'
import HomeRoute from '../pages/Home/home.routes'

export default () => (

    <BrowserRouter>
        <Switch>
            <Route  exact path="/" component={Home} />
            <Route component={NotFoundPage}/>
        </Switch>
    </BrowserRouter>

)
