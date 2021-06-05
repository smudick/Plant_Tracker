import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Views/Home'
import Discovery from '../Views/Discovery'
import PlantId from '../Views/PlantId'
import Results from '../Views/Results'
import SinglePlant from '../Views/SinglePlant'
import Watering from '../Views/Watering'
import NotFound from '../Views/NotFound';
import {PlantProps} from '../Helpers/Interfaces/PlantInterfaces';
import {SearchProps} from '../Helpers/Interfaces/SearchInterfaces';


export default function Routes(): JSX.Element {
    return (
        <Switch>
            <Route exact path='/' component={() => <Home/>} />
            <Route exact path='/Discovery' component={() => <Discovery/>} />
            <Route exact path='/PlantId' component={() => <PlantId/>} />
            <Route exact path='/search/:term' component={(props: SearchProps) => <Results{...props}/>} />
            <Route exact path='/details' component={(props: PlantProps) => <SinglePlant{...props}/>} />
            <Route exact path='/Watering' component={() => <Watering/>} />
            <Route exact path='/' component={() => <Home/>} />
            <Route component={NotFound} />
        </Switch>
    )
}