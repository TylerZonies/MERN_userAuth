import React, {Component} from 'react';
import SignUpForm from './signUp';
import SignInForm from './login';
import {Modal, Button} from 'react-materialize';

class AuthModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin: false
        }
        
        this.modalRender = this.modalRender.bind(this);
        this.getState = this.getState.bind(this);
    }

    modalRender(){
        if(this.state.isLogin){
            return <SignInForm errorToast={this.props.errorToast} getSignUp={this.getState} />
        }else{
            return <SignUpForm errorToast={this.props.errorToast} getLogin={this.getState} />
        }
    }

    getState(bool){
        console.log(`getstate ${bool}`);
        this.setState({
            isLogin: bool
        })
    }

    render(){
        return(
        <Modal 
          id='userAuth'
          trigger={<Button>Sign Up/Login</Button>}>
          {this.modalRender()}
        </Modal> 
        )
    }
}

export default AuthModal;