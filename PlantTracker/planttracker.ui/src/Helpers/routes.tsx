import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Views/Home'
import Discovery from '../Views/Discovery'
import Results from '../Views/Results'
import SinglePlant from '../Views/SinglePlant'
import Watering from '../Views/Watering'
import Browse from '../Views/Browse'
import NotFound from '../Views/NotFound';
import {PlantProps} from '../Helpers/Interfaces/PlantInterfaces';
import {SearchProps} from '../Helpers/Interfaces/SearchInterfaces';
import {User, UserProps} from '../Helpers/Interfaces/UserInterface';
import {DiscoveryProps} from '../Helpers/Interfaces/DiscoveryInterfaces';


export default function Routes(user: User): JSX.Element {
    return (
        <Switch>
            <Route exact path='/' component={(props: UserProps) => <Home{...props} user={user}/>} />
            <Route exact path='/Discovery' component={(props: DiscoveryProps) => <Discovery{...props} user={user}/>} />
            <Route exact path='/search/:term' component={(props: SearchProps) => <Results{...props} user={user}/>} />
            <Route exact path='/details' component={(props: PlantProps) => <SinglePlant{...props} user={user}/>} />
            <Route exact path='/browse' component={(props: PlantProps) => <Browse{...props} user={user}/>} />
            <Route exact path='/Watering' component={(props: PlantProps) => <Watering{...props} user={user}/>} />
            <Route component={NotFound} />
        </Switch>
    )
}