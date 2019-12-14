import React, { Component } from 'react';
import {StyleSheet, Text, Image, ActivityIndicator} from 'react-native'
import { Container, Header, Content, Item, Input, Icon, Button, Label } from 'native-base';
import Axios from 'axios'
// Imports: Redux Actions
import { connect } from 'react-redux';

// Imports: Redux Actions
import { login } from '../../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../../redux/actions/counterActions';
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'
import { role } from '../../../redux/actions/categoryAction'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {AsyncStorage} from 'react-native';
let isLogin = 0;  
class Project extends Component {
    constructor(props){
        super(props)
        this.state={
            name: '',
            skill: '',
            description: '',
            id_engineer: '',
            done: '',
            budget: ''
        }
    }
    _sendProject = async () => {
        isLogin = 0; 
        try{
          const auth = await Axios.post('http://192.168.1.20:5000/myhire/createproject',
              {
                    name: this.state.name,
                    skill: this.state.skill,
                    description: this.state.description,
                    price: this.state.price
              }
          )
          await this.props.navigation.navigate('Pageproject')
        }catch(error){
            console.log(error);

        }
    }
  render() {
    return (
      <Container>
        <Content contentContainerStyle={{justifyContent : 'center', alignItems : 'center', flex : 1}}>
         <Text style={styles.head}>Project Form</Text>
          <Item stackedLabel  style={styles.Input}>
          <Label>Name</Label>
            <Input  onChangeText={value => this.setState({name: value})}/>
          </Item> 
          <Item stackedLabel  style={styles.Input}>
          <Label>Skill Required</Label>
            <Input  onChangeText={value => this.setState({skill: value})}/>
          </Item> 
          <Item stackedLabel  style={styles.Input}>
          <Label>Price</Label>
            <Input onChangeText={value => this.setState({price: value})}/>
          </Item> 
         
          <Item stackedLabel  style={styles.Input}>
          <Label>Description</Label>
            <Input onChangeText={value => this.setState({description: value})}/>
          </Item> 
          
        
         
         
          <Button rounded  style={styles.btn} onPress={this._sendProject} >
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
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
      counter: state.counterReducer.counter,
      loggedIn: state.authReducer.loggedIn,
      token: state.tokenReducer.token,
      id: state.engineerReducer.id,
      category: state.categoryReducer.category
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
  
        reduxEngineer: () => dispatch(getEngineer()),

        reduxCategory: (category) => dispatch(role(category)),
     };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(Project)