import React, { Component } from 'react';
import Axios from 'axios';
import { Image, ScrollView, View, StyleSheet, ActivityIndicator} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tabs, Tab, FooterTab, Footer, Item, Input } from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {connect} from 'react-redux'
import {login} from '../../../redux/actions/authActions';
import {increaseCounter, decreaseCounter} from '../../../redux/actions/counterActions'
import {jwt} from '../../../redux/actions/tokenAction'
import {getEngineer} from '../../../redux/actions/engineerActions'
import {role} from '../../../redux/actions/categoryAction'
class Pageengineer extends Component {
    constructor(){
        super();
        //mengirimkan state ke bagian render 
        //props itu berbentuk objek
        this.state = {
          data : [],
          isLoading : true,
          search : ''
        };
      
      }
   
      componentDidMount(){
      
       
      //  fetch('http://52.90.6.74:2000/engineer/read')
      //  .then(response => response.json())
      //  .then(data => this.setState({ items : data }))
      this.getData()
   
     
   }
   getData = async () =>{
    try {
      const result = await Axios.get('http://192.168.1.20:5000/engineer/read')
      console.log(result.data.result);
      
      this.setState({data: result.data, isLoading: false})
  } catch (error) {
      console.log(error);
  }

   }
   _setIdEngineer = async (id) => {
    await this.props.reduxEngineer(id);
    await console.log(this.props.id);
    this.props.navigation.navigate('Preview')
  }
   searchSkill = async()=> {
    try {
        const search = this.state.search
        console.log(search);
        
        const result = await Axios.get(`http://192.168.1.20:5000/myhire/search/?skill=${search}`)
        console.log(result.data.result);
        this.setState({data: result.data.result, isLoading: false})
        
    } catch (error) {
        console.log(error);
    }
  }

  render() {
    const {data, isLoading} = this.state;
        console.log(this.props.category);
        
        
        if(isLoading){
            return(
                <ActivityIndicator size='large' style={{flex: 1, backgroundColor: '#f5f5f5', opacity: 0.5}} color='#e74c3c' />
            )
        }  
    
    
    if(isLoading){
        return(
            <ActivityIndicator size='large' style={{flex: 1, backgroundColor: '#f5f5f5', opacity: 0.5}} color='#e74c3c' />
        )
    }  
    return (
        <Container>
              <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"  onChangeText={value => this.setState({search: value})}/>
            <Icon name="ios-people" />
            <Button   onPress = {()=>this.searchSkill()}
               >
            <Text>Search</Text>
          </Button>
          </Item>
        
        </Header>
     
  
       

        <Content style={{flex: 1}}>
        <Text style={{fontSize : 21, textAlign : 'center', fontWeight : '400', marginTop : 20}}>List of Engineer</Text>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
        {
            data.map(product => (

          <Card style={styles.card} >
           
              <Image source={{uri : `http://192.168.1.20:5000/myhire/file/${product.photo}`  }} style={{height: 170, width: null, flex: 1, borderTopRightRadius : 10, borderTopLeftRadius : 10}}/>
           
            <Body>
                  <Text style={{textAlign : 'center'}} >{product.name}</Text>
                  <Text style={{textAlign : 'center'}} >Project : {product.project} </Text>
                  <Text style={{textAlign : 'center'}}> Done :{product.done} </Text>
                  <Button style={{width  : 70, height : 30}} onPress = {() => {this._setIdEngineer(product.created_by)}}>
               
            <Text>View</Text>
          </Button>
                </Body>
          </Card>
    
        
            ))
            }

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
    top : {
        flex : 1,
        color : 'blue',
        fontSize : 24,
        justifyContent : 'center',
        alignItems : 'center',
        
    },
    wraps : {
        justifyContent : 'center',
        alignItems : 'center',
        alignContent : 'center',
        flex : 1,
        width :310,
        left : 25,
        height : 100,
        backgroundColor : 'black'
    },
    card : {
      width : 150,
      borderRadius : 10,
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

      reduxEngineer: (id) => dispatch(getEngineer(id)),
      reduxCategory: (category) => dispatch(role(category)),
   };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Pageengineer)