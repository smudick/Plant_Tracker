import React, {Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../Helpers/routes';
import './App.scss'; 

class App extends Component {
  render(): JSX.Element {
    return <div className="App">
      <Router>
        <Routes/>
      </Router>
    </div>;
  }
}
export default App;