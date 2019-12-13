import Axios from 'axios'
//import Redux
import {connect} from 'react-redux'
//Redux Act
import {login} from '../../redux/actions/authActions'
import {increaseCounter, decreaseCounter} from '../../redux/actions/counterActions'

import { getEngineer } from '../../redux/actions/engineerActions'
import { jwt } from '../../redux/actions/tokenAction'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React, { Component } from 'react';
import {StyleSheet, Text, Image, AsyncStorage } from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';



 
class Login extends Component {
  _sendLogin = async () => {
    console.log(this.state.username)
       try{
      const auth = await Axios.post('http://52.90.6.74:2000/myhire/login',
      {
        username : this.state.username,
        password : this.state.password
      }
      )
      await console.log(this.props.token)
      Axios.defaults.headers.common['Authorization'] = auth.data.result.token;
             await this.props.reduxLogin(true)
             await this.props.reduxToken(auth.data.result.token)
             await this.props.navigation.navigate('Home')
    }catch(error){
      console.log(error)
    }
    
  }
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
       
        <Image source={require('../assets/photo/ithub.png')}
        style={styles.logo}/>
         <Text style={styles.head}>Login Page</Text>
          <Item rounded style={styles.Input}>
            <Icon active name='home' />
            <Input placeholder='Username' onChangeText={value => this.setState({username : value})}/>
          </Item> 
          <Item rounded style={styles.Input}>
            <Icon active name='key' />
            <Input placeholder='Password' onChangeText={value => this.setState({password : value})}/>
          </Item> 
         
          <Button onPress={this._sendLogin}rounded style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
    Input : {
        width : 280,
        borderColor : '#0000ff',
        marginTop : 20,
    },
    btn : {
        width : 120,
        color : '#eee',
        marginTop : 20,
        justifyContent : 'center',
    },
    head : {
        fontSize : 28,
        fontWeight : '600',
        marginBottom : 20

    },
    logo : {
        width : 200,
        height : 100,
        marginBottom : 40

    },
    btnText : {
        color : 'white',
        alignItems : 'center',
        fontWeight :'bold',
        
        
    }
})

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
      counter: state.counterReducer.counter,
      loggedIn: state.authReducer.loggedIn,
      token: state.tokenReducer.token,
      engineerList: state
    };
  };
  
  // Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
  const mapDispatchToProps = (dispatch) => {
    // Action
      return {
        // Increase Counter
        reduxIncreaseCounter: () => dispatch(increaseCounter()),
        // Decrease Counter
        reduxDecreaseCounter: () => dispatch(decreaseCounter()),
        // Login
        reduxLogin: (trueFalse) => dispatch(login(trueFalse)),

        reduxToken: (token) => dispatch(jwt(token)),
  
        reduxEngineer: () => dispatch(getEngineer())
     };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(Login);