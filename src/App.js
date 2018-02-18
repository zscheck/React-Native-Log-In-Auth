import React, {Component} from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';
import LogOutForm from './components/LogOutForm';


export default class App extends Component {
    state = {loggedIn: null}

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDShf2NVFF1JA801rJu2jcB0U3V8fwppsw",
            authDomain: "auth-649c3.firebaseapp.com",
            databaseURL: "https://auth-649c3.firebaseio.com",
            projectId: "auth-649c3",
            storageBucket: "auth-649c3.appspot.com",
            messagingSenderId: "278822595874"
          });

          firebase.auth().onAuthStateChanged((user) => {
            if(user) {
            this.setState({loggedIn: true});
            } else {
            this.setState({loggedIn: false});
            }
          })
    }
    
    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return <LogOutForm />
            case false:
                return <LoginForm />
            default:
                return <Spinner />
        }
    }

    render() {
        return (
            <View>
                <Header header="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}