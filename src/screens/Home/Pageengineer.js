import React, { Component } from 'react';
import { Image, ScrollView, View, StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Tabs, Tab } from 'native-base';
export default class Pageengineer extends Component {
    constructor(){
        super();
        //mengirimkan state ke bagian render 
        //props itu berbentuk objek
        this.state = {
          items : []
        };
      
      }
   
      componentDidMount(){
      
       
       fetch('http://52.90.6.74:2000/engineer/read')
       .then(response => response.json())
       .then(data => this.setState({ items : data }))
   
     
   }

  render() {
    const {items} = this.state
    return (
        <Container>
     
        <Header />
       

        <Content style={{flex: 1}}>
        <Text style={{fontSize : 21, textAlign : 'center', fontWeight : '400'}}>List of Engineer</Text>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
             {items.map((item, index) =>
             <View key ={index} style={{ alignItems: 'center'}} >
          <Card style={styles.card}>
           
              <Image source={{uri : `http://52.90.6.74:2000/myhire/file/${item.photo}`  }} style={{height: 170, width: null, flex: 1, borderTopRightRadius : 10, borderTopLeftRadius : 10}}/>
           
            <Body>
                  <Text style>{item.name}</Text>
                  <Text>{item.profession}</Text>
                </Body>
          </Card>
    
          </View>
             )}

        </View>
        </Content>
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