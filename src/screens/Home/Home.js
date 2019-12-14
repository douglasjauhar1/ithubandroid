import React, { Component } from 'react';
import { Image, ScrollView, View, StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tabs, Tab , Footer, FooterTab} from 'native-base';
//Uy Ini bross yang penting
import {connect} from 'react-redux'
import Axios from 'axios'
import {login} from '../../../redux/actions/authActions';
import {increaseCounter, decreaseCounter} from '../../../redux/actions/counterActions'
import {jwt} from '../../../redux/actions/tokenAction'
import {getEngineer} from '../../../redux/actions/engineerActions'
import {role} from '../../../redux/actions/categoryAction'


export default class Home extends Component {
    constructor(){
        super();
        this.state = {
          items : [],
        
        };
      
      }
   
      componentDidMount(){
      
       
       fetch('http://192.168.1.20:5000/engineer/read')
       .then(response => response.json())
       .then(data => this.setState({ items : data }))
   
     
   }

  render() {
    const {items} = this.state
    const {data, isLoading} = this.state;
    console.log(this.props.category);
    
    
    if(isLoading){
        return(
            <ActivityIndicator size='large' style={{flex: 1, backgroundColor: '#f5f5f5', opacity: 0.5}} color='#e74c3c' />
        )
    }  
    return (
        <Container>
          <View style={{height : 220}}>
          
       <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} style={{backgroundColor : '#ccc', alignContent : 'center', width : 320, borderRadius : 20, left : 20}}>
          
          <Card style={styles.cards}>
              <Image source={{uri : 'https://cdn0.iconfinder.com/data/icons/bitcoin-cryptocurrency-lavender-vol-2-1/512/cypherpunk-512.png'  }} style={{height: 299, width: null, flex: 1, borderTopRightRadius : 10, borderTopLeftRadius : 10, marginTop : 10}}/>
            <Body>
                  <Text>Programmer</Text>
                </Body>
          </Card>
          <Card style={styles.cards}>
              <Image rounded source={{uri : 'https://cdn2.iconfinder.com/data/icons/flat-business-icon/600/shares-company-finance-512.png'  }} style={{height: 299, width: null, flex: 1, borderTopRightRadius : 10, borderTopLeftRadius : 10, marginTop : 10}}/>
            <Body>
                  <Text>Company</Text>
                </Body>
          </Card>
          <Card style={styles.cards}>
              <Image source={{uri : 'https://cdn0.iconfinder.com/data/icons/bitcoin-cryptocurrency-lavender-vol-2-1/512/cypherpunk-512.png'  }} style={{height: 299, width: null, flex: 1, borderTopRightRadius : 10, borderTopLeftRadius : 10, marginTop : 10}}/>
            <Body>
                  <Text>Project</Text>
                </Body>
          </Card>
         
            
          </ScrollView>
          </View>
       

        <Content style={{marginBottom : 120}}>
        <Text style={{fontSize : 21, marginRight : 20, fontWeight : '200'}}>List of Engineer</Text>
        <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false} style={{backgroundColor : '#ccc', paddingLeft : 20 }}>
             {items.map((item, index) =>
             <View key ={index} >
          <Card style={styles.card}>
           
              <Image source={{uri : `http://192.168.1.20:5000/myhire/file/${item.photo}`  }} style={{height: 180, width: null, flex: 1, borderTopRightRadius : 10, borderTopLeftRadius : 10}}/>
           
            <Body>
                  <Text>{item.name}</Text>
                  <Text>{item.profession}</Text>
                  <Text>{item.done}</Text>
                  
                </Body>
          </Card>
         
    
          </View>
             )}
          </ScrollView>
        </Content>
      
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Pageengineer')}>
              <Icon name="people" />
              <Text>Engineer</Text>
            </Button>
            <Button  onPress={() =>{
                  (this.props.category)?
                  this.props.navigation.navigate('Engineerproject'):
                  this.props.navigation.navigate('Pageproject');
                  console.log(this.props.category);
                  
                 } 
                } vertical active>
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
        width :250,
        left : 25,
        height : 100,
        backgroundColor : 'black'
    },
    card : {
      width : 200,
      borderRadius : 10
    },
    cards : {
      width : 100,
      height : 100,
      borderRadius : 10,
      marginTop : 50,
      justifyContent : 'center',
      left : 5
     
    }
})

