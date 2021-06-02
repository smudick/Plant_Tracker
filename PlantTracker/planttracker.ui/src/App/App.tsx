import React, {Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../Helpers/routes';
import './App.scss';
import Navigation from '../Components/Navbar/Navbar';
import {User} from '../Helpers/Interfaces/UserInterface';

type AppState = {
  user?: User | boolean;
}

class App extends Component<AppState> {
  state = {
    user: null
  }

  render(): JSX.Element {
    const {user} = this.state
    return <div className="App">
      <Router>
        <Navigation user={user}/>
        <Routes/>
      </Router>
    </div>;
  }
}
export default App;