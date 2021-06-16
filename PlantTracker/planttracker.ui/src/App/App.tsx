import React, {Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import fbConnection from '../Helpers/fbConnection';
import Routes from '../Helpers/routes';
import './App.scss';
import Navigation from '../Components/Navbar/Navbar';
import {User} from '../Helpers/Interfaces/UserInterface';
import UserData from '../Helpers/Data/UserData';

fbConnection();

type AppState = {
  user?: User | boolean;
}

class App extends Component<AppState> {
  state = {
    user: null
  }
  removeListener = (noop: void): void => noop;

  componentDidMount = (): void => {
     this.removeListener = firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      if (user) {
        user.getIdToken().then((token: string) => sessionStorage.setItem("token", token));
      UserData.getUserByFirebaseUid(user.uid).then((response) => {
          this.setState({ user: response });
        });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount(): void {
    this.removeListener();
  }

  render(): JSX.Element {
    const {user} = this.state
    return <div className="App">
      <Router>
        <Navigation user={user}/>
        <Routes user={user}/>
      </Router>
    </div>;
  }
}
export default App;