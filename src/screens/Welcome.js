import React, { Component } from 'react';
import {StyleSheet, Text, Image} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Button } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class Welcome extends Component {

  render() {
    return (
      <Container>
        <Content contentContainerStyle={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
       
        <Image source={require('../assets/photo/ithub.png')}
        style={styles.logo}/>
           <Image source={require('../assets/photo/welcome.png')}
        style={styles.welcome}/>
         <Text style={styles.head}>Welcome to IThub</Text>
         <Text style={styles.heads}>Place For Hiring Engineer For 
         Your Industry</Text>
          <Button rounded style={styles.btns}onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.btnTexts}>Login</Text>
          </Button>
          <Button rounded style={styles.btn} onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.btnText}>Register</Text>
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
        width : 250,
        height : 50,
        color : '#eee',
        marginTop : 20,
        justifyContent : 'center',
        
    },
    btns : {
        width : 250,
        height : 50,
        backgroundColor : '#fff',
        marginTop : 20,
        justifyContent : 'center',
        borderColor : 'black' 
    },
    head : {
        fontSize : 28,
        fontWeight : 'bold',
        marginBottom : 20

    },
    heads : {
        fontSize : 20,
        fontWeight : '300',
        textAlign : 'center',
        fontStyle : 'italic'
    },
    logo : {
        width : 120,
        height : 50,
        marginTop : -80,
        right : 80
    },
    welcome : {
        width : 350,
        height : 190,
        marginBottom : 40
    },
    btnText : {
        color : 'white',
        alignItems : 'center',
        fontWeight :'bold',
    },
    btnTexts : {
        color : 'blue',
        alignItems : 'center',
        fontWeight :'bold',
       
    },
})