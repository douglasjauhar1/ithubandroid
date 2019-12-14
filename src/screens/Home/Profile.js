import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Axios from 'axios'
// Imports: Redux Actions

import { login } from '../../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../../redux/actions/counterActions';
import { jwt } from '../../../redux/actions/tokenAction'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ActivityIndicator,    
  ScrollView } from 'react-native'
import {AsyncStorage} from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View, Button, Footer, FooterTab, Icon } from 'native-base';


 class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      MyProfile: ''
    }
  }

  componentDidMount(){
    this.getMyData();
  }

  async getMyData(){
   try{
    Axios.defaults.headers.common['Authorization'] = this.props.token;
    const profile = await Axios.get('http://192.168.1.20:5000/myhire/by/')
    
    await this.setState({ 
      MyProfile: profile.data.result[0]
      
    });
   }catch(error){
    console.log(error);
   } 
  }


  render() {
    return (
      <Container>
      <Content>
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: `http://52.90.6.74:2000/myhire/file/${this.state.MyProfile.photo}`}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.MyProfile.name}</Text>
              <Text style={styles.info}>{this.state.MyProfile.profession}</Text>
              <Text style={styles.description}>{this.state.MyProfile.description}</Text>
                      
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Logout')} style={styles.buttonContainer}>
                <Text style={{color : 'white', fontSize : 18}}>Logout</Text> 
              </TouchableOpacity>
            </View>
        </View>
      </View>
      </Content>
        <Footer>
        <FooterTab>
          <Button vertical onPress={() => this.props.navigation.navigate('Pageengineer')}>
            <Icon name="people" />
            <Text>Engineer</Text>
          </Button>
          <Button vertical  onPress={() =>{
                (this.props.category)?
                this.props.navigation.navigate('Pageproject'):
                this.props.navigation.navigate('Engineerproject');
                console.log(this.props.category);
                
               } 
              } active>
            <Icon active name="business" />
            <Text>Project</Text>
          </Button>
          <Button vertical>
            <Icon name="person" onPress={() => this.props.navigation.navigate('Profile')}/>
            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#ccc",
    height:100,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:40
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "black",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius:30,
    backgroundColor: "blue",
  },
});
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);