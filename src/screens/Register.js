import React, { Component } from 'react';
import {StyleSheet, Text, Image} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Button, Picker } from 'native-base';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selected2: undefined
        };
      }
      onValueChange2(value: string) {
        this.setState({
          selected2: value
        });
      }
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
       
        <Image source={require('../assets/photo/ithub.png')}
        style={styles.logo}/>
         <Text style={styles.head}>Register Page</Text>
          <Item rounded style={styles.Input}>
            <Icon active name='home' />
            <Input placeholder='Username'/>
          </Item> 
          <Item rounded style={styles.Input}>
            <Icon active name='key' />
            <Input placeholder='Password'/>
          </Item> 
          <Item picker rounded style={styles.Input}>
          <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Select Register as" value="key0" />
                <Picker.Item label="Software Engineer" value="key1" />
                <Picker.Item label="Hiring Partner / Company" value="key2" />
              </Picker>
              </Item>
         
          <Button rounded style={styles.btn}>
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