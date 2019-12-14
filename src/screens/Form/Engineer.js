import React, { Component } from 'react';

import {StyleSheet, Text, Image} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Button, Label } from 'native-base';

export default class Engineer extends Component {
   
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
         <Text style={styles.head}>Engineer Form</Text>
          <Item stackedLabel  style={styles.Input}>
          <Label>Name</Label>
            <Input/>
          </Item> 
          <Item stackedLabel  style={styles.Input}>
          <Label>Email</Label>
            <Input/>
          </Item> 
         
          <Item stackedLabel  style={styles.Input}>
          <Label>Github Link</Label>
            <Input/>
          </Item> 
          <Item stackedLabel  style={styles.Input}>
          <Label>Job</Label>
            <Input/>
          </Item> 
          <Item stackedLabel >
          <Label>Date of BIrth</Label>
         
          </Item> 
         
         
          <Button rounded style={styles.btn}>
            <Text style={styles.btnText}>Submit</Text>
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