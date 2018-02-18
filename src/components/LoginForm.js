import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {
    state= {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    onButtonPress() {
        const {email, password} = this.state;

        this.setState({error:'', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this))
                .catch(() => {
                    this.setState({ error: 'Authentication Failed.', loading: false})
                    })
            })
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                     label={'Email'}
                     placeholder={'user@gmail.com'}
                     value={this.state.email}
                     onChangeText={email => this.setState({ email })}
                     />
                </CardSection>

                <CardSection>
                    <Input
                     secureTextEntry
                     label={'Password'}
                     placeholder={'xxxxxxx'}
                     value={this.state.password}
                     onChangeText={password => this.setState({ password })}
                     />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    { this.state.loading ? 
                    <Spinner size={'small'} /> :
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Log in
                    </Button>
                    }
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}