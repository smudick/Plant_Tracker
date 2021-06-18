import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { User } from "../../Helpers/Interfaces/UserInterface";
import UserData from "../../Helpers/Data/UserData";

type AuthProps = {
  user: User | null;
};

class Auth extends Component<AuthProps> {
  loginClickEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((user) => {
        if (user.additionalUserInfo?.isNewUser) {
          const userInfo = {
            display_Name: user.user?.displayName,
            image_Url: user.user?.photoURL,
            firebase_Uid: user.user?.uid,
          };
          console.log(userInfo);
          UserData.addNewUser(userInfo);
          window.location.href = "/";
        }
      });
  };

  logoutClickEvent = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    window.sessionStorage.removeItem("token");
    firebase.auth().signOut();
    window.location.href = "/";
  };

  logInOrOut = (): JSX.Element => {
    const { user } = this.props;
    if (user == false) {
      return (
        <div>
          <button className="login-button" onClick={this.loginClickEvent}>
            {" "}
            Sign In
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="auth">
            <p className="username">Hello, {user?.display_Name}!</p>
            <button
              className="ml-4 logout-button"
              onClick={this.logoutClickEvent}
            >
              Log Out
            </button>
          </div>
        </div>
      );
    }
  };

  render(): JSX.Element {
    return (
      <div className="d-flex justify-content-center">{this.logInOrOut()}</div>
    );
  }
}

export default Auth;
