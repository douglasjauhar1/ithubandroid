import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker'
import {StyleSheet, Text, Image} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Button, Label } from 'native-base';

export default class Engineer extends Component {
    constructor(props){
        super(props)
        this.state = {date:"2016-05-15"}
      }
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
          <DatePicker
        style={{width: 280}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
        
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
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