import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'
import {StyleSheet, Text, Image} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Button, Label } from 'native-base';

export default class Company extends Component {
    constructor(props){
        super(props)
        this.state = {date:"2016-05-15"}
      }
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
         <Text style={styles.head}>Project Form</Text>
          <Item stackedLabel  style={styles.Input}>
          <Label>Name</Label>
            <Input/>
          </Item> 
          <Item stackedLabel  style={styles.Input}>
          <Label>Price</Label>
            <Input/>
          </Item> 
         
          <Item stackedLabel  style={styles.Input}>
          <Label>Description</Label>
            <Input/>
          </Item> 
          <Item stackedLabel  style={styles.Input}>
          <Label>Skill Required</Label>
            <Input/>
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