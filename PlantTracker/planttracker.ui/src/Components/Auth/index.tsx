import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '../../Helpers/Interfaces/UserInterface';
import UserData from '../../Helpers/Data/UserData';

type AuthProps = {
  user: User | null
}

class Auth extends Component<AuthProps> {

  loginClickEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((user) => {
      if (user.additionalUserInfo?.isNewUser){
        const userInfo = {
          display_Name: user.user?.displayName,
          image_Url: user.user?.photoURL,
          firebase_Uid: user.user?.uid,
        }
        console.log(userInfo);
        UserData.addNewUser(userInfo);
        window.location.href = '/';
      }
    });
  };

  logoutClickEvent = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    window.sessionStorage.removeItem('token');
    firebase.auth().signOut();
    window.location.href = '/';
  };

  logInOrOut = (): JSX.Element => {
    const { user } = this.props;
    if (user == false){
      return (
        <div className="d-flex justify-content-center">
            <button className="signin-button google-logo" onClick={this.loginClickEvent}>
            <i className="fas fa-sign-out-alt"></i> Sign In
            </button>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-center">
          <div className="d-flex align-items-center">
            <p>Hello, {user?.display_Name}!</p>
            <button className="google-logo ml-4 logout-button" data-toggle="tooltip" data-placement="bottom" title="Log Out" onClick={this.logoutClickEvent}>
              <i className="fas fa-sign-out-alt signout-icon"></i>
            </button>
          </div>
        </div>
      );
    }
  }

  render(): JSX.Element {
    return (
      <div className="d-flex justify-content-center">
        {this.logInOrOut()}
      </div>
    );
  }
}

export default Auth;
