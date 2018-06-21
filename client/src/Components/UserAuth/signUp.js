import React, { Component } from 'react';
import { getFromStorage, setInStorage } from '../../utils/storage';
import { getFromRest, postToRest } from '../../utils/apiCalls';
import {Row, Col, Input, Button, Toast } from 'react-materialize';

class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            signUpUsername: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpError: false,
            errorMessage: '',
            checkingUsername: false,
            userNameChecked: false,
            userNameUnique: false,
            checkTimeout: null,
            tempTimeout: null
        }

        this.onSwitch = this.onSwitch.bind(this);
        this.checkUserUnique = this.checkUserUnique.bind(this);
        this.onTextboxChangeSignUpUsername = this.onTextboxChangeSignUpUsername.bind(this);
    } 

    onTextboxChangeSignUpUsername(event) {
        
        clearTimeout(this.state.checkTimeout);
        
        this.setState({
            signUpUsername: event.target.value,
            checkingUsername: false,
            userNameChecked: false,
            userNameUnique: false,
            signUpError: false
        });
        this.state.checkTimeout = setTimeout(() => {
            this.setState({
                checkingUsername: true
            })
            console.log('line39')
            getFromRest(`/account/username?user=${this.state.signUpUsername}`)
            .then(res => {
                if(res.success && res.isUnique){
                    this.setState({
                        userNameChecked:true,
                        userNameUnique:true
                    })
                } else if(res.success){
                    this.setState({
                        userNameChecked:true,
                        userNameUnique:false
                    })
                }else{
                    this.setState({
                        userNameChecked:true,
                        signUpError: true,
                        errorMessage: res.message
                    })
                }
            })
        }, 5000);
        
    }

    onTextboxChangeSignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value,
        });
    }
    
    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value,
        });
    }

    checkUserUnique(){
        if(this.state.userNameUnique && this.state.userNameChecked){
            return(
                <p> username unique </p>
            )
        }else if(this.state.userNameChecked){
            return(
                <p>username not unique</p>
            )
        } else {
            return(
                // <Icon> star </Icon>
                <p>checking username</p>
            )
        }
    }
    onSwitch(event){
        event.preventDefault();

        this.props.getLogin(true);
    }

    render(){
        const{
            signUpUsername,
            signUpEmail,
            signUpPassword,
            // errorMessage
        } = this.state

        return(
            <div className="account-creation-form" >
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col offset="s3" s={6}>
                    <h3>Create an account</h3>
                        <Input type="text" ref="username" label="Username" value={signUpUsername} onChange={this.onTextboxChangeSignUpUsername} s={12} />
                        {
                            (this.state.checkingUsername) ? (
                                this.checkUserUnique()
                            ) : (null)
                        }
                        <Input type="email" ref="email" label="Email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} s={12} />
                        <Input type="password" ref="password" label="Password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} s={12} />
                        <Button type="submit" waves="purple" onClick={this.onSignUp} >Create Account</Button>
                    </Col>
                </Row>
                <Row>
                    <p>Already have and account? <a id='modalSwitchLink' href='#' onClick={this.onSwitch}>Sign In</a></p>
                </Row>
            </div>
        )
    }
}

export default SignUpForm;