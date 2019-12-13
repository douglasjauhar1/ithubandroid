import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Profile from './Profile';
import Home from './Home';
export default class Wrapper extends Component {
    goProject(){
        Actions.Project()
    }
    goProfile(){
        Actions.Profile()
    }
    goHome(){
        Actions.Home()
    }
    goEngineer(){
        Actions.Pageengineer()
    }
  render() {
    return (
      <Container>
     
        
       <Home/>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="home" onPress={this.goHome} />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={this.goEngineer}>
              <Icon name="people" />
              <Text>Engineer</Text>
            </Button>
            
            <Button vertical active onPress={this.goProject}>
              <Icon active name="navigate" />
              <Text>Project</Text>
            </Button>
            
            <Button vertical onPress={this.goProfile}>
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}