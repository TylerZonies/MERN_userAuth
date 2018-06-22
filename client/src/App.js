import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthModal from "./Components/UserAuth/authModal"
import { Modal, Button } from 'react-materialize';
import SignInForm from './Components/UserAuth/login';
import SignUpForm from './Components/UserAuth/signUp';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      errorMessage:''
    }

  }
  errorMessage(){

  }
  render() {
    return (
      <div className="App">
        <AuthModal errorToast={this.errorMessage} />
      </div>
    );
  }
}

export default App;
