import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../../utils/storage';
import { getFromRest, postToRest } from '../../utils/apiCalls';
import {Row, Col, Input, Button, Toast } from 'react-materialize';

class SignUpForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            signInEmail: '',
            signInPassword: '',
            signInError: false,
            errorMessage: '',
            token: ''
        }

        this.onSwitch = this.onSwitch.bind(this);

    }
    onTextBoxCHangeSignInEmail(){

    }
    onTextBoxChangeSignInPassword(){

    }
    onSwitch(event){
        event.preventDefault();

        this.props.getSignUp(false);
    }

    render(){
        const{
            signInUsername,
            signInEmail,
            signInPassword,
            signInError,
            errorMessage
        } = this.state
        return(
            <div id='signUpForm'>
                <Row>
                    <Col offset="s3" s={6}>
                    <h3>Login</h3>
                        <Input type="email" ref="email" label="Email" value={signInEmail} onChange={this.onTextBoxCHangeSignInEmail} s={12} />
                        <Input type="password" ref="password" label="Password" value={signInPassword} onChange={this.onTextBoxChangeSignInPassword} s={12} />
                        <Button type="submit" waves="purple" onClick={this.onSignIn} >Sign In</Button>
                        <p>Dont have an account? <a id='modalSwitchLink' href='#' onClick={this.onSwitch}>Sign Up</a></p>
                    </Col>
                {
                (signInError) ? (
                   <Toast toast={errorMessage}>
                   Toast
                   </ Toast>
                ) : (null)
                }   
                </Row>
            </div>
        );
    }
}

export default SignUpForm