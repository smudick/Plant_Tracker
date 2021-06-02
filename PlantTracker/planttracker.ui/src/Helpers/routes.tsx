import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Views/Home'
import Discovery from '../Views/Discovery'
import PlantId from '../Views/PlantId'
import Results from '../Views/Results'
import SinglePlant from '../Views/SinglePlant'
import Watering from '../Views/Watering'
import NotFound from '../Views/NotFound';


export default function Routes(): JSX.Element {
    return (
        <Switch>
            <Route exact path='/' component={() => <Home/>} />
            <Route exact path='/Discovery' component={() => <Discovery/>} />
            <Route exact path='/PlantId' component={() => <PlantId/>} />
            <Route exact path='/Results' component={() => <Results/>} />
            <Route exact path='/SinglePlant' component={() => <SinglePlant/>} />
            <Route exact path='/Watering' component={() => <Watering/>} />
            <Route exact path='/' component={() => <Home/>} />
            <Route component={NotFound} />
        </Switch>
    )
}