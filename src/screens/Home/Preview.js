import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { login } from '../../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../../redux/actions/counterActions';
import { jwt } from '../../../redux/actions/tokenAction'
import { getEngineer } from '../../../redux/actions/engineerActions'
import { connect } from 'react-redux';
import Axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'native-base';

class Preview extends Component {
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
        const profile = await Axios.get(`http://52.90.6.74:2000/engineer/by/${this.props.id}`)
        console.log(profile.data[0]);
        
        await this.setState({ 
          MyProfile: profile.data[0]
          
        });
       }catch(error){
        console.log(error);
       } 
      }
    render() {
        console.log(this.props.id);
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => goBack()}><Ionicons name="ios-arrow-back" size={27} color="#52575D"style={{marginTop: 12, marginLeft : 16, marginBottom : 12, color : '#3E51B5'}}></Ionicons></TouchableOpacity>
            </View>
            <Image style={styles.avatar} source={{uri: `http://52.90.6.74:2000/myhire/file/${this.state.MyProfile.photo}`}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>
              {/* <View style={{marginBottom : 50, backgroundColor: 'red', flex: 1}}>
                <Text style={{color : 'black', fontSize : 20}}>Project</Text>
                <Text style={{color : 'black', fontSize : 20, textAlign : 'center'}}>1</Text>
                <Text style={{color : 'black', fontSize : 20}}>Project</Text>
                <Text style={{color : 'black', fontSize : 20, textAlign : 'center'}}>1</Text>
                </View> */}
                <Text style={styles.name}>{this.state.MyProfile.name}</Text>
                <Text style={styles.info}>{this.state.MyProfile.profession}</Text>
                <Text style={styles.info}>Expert on : {this.state.MyProfile.skill}</Text>
                <Text style={styles.description}> <Text style={styles.info}>{this.state.MyProfile.description}</Text></Text>
                           
                <TouchableOpacity  style={{color : ''}}onPress={() => this.props.navigation.navigate('Hire')} style={styles.buttonContainer}>
                  <Text style={{color : 'white', fontSize : 18}}>Hire Me</Text> 
                </TouchableOpacity>
              </View>
          </View>
        </View>
        )
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
      textAlign : 'center',
      justifyContent : 'center',
      flex : 1
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
      backgroundColor: "#3E51B5",
    },
  });
  const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
      counter: state.counterReducer.counter,
      loggedIn: state.authReducer.loggedIn,
      token: state.tokenReducer.token,
      id: state.engineerReducer.id
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
  
        reduxEngineer: (id) => dispatch(getEngineer(id))
     };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(Preview);
  // Exports
