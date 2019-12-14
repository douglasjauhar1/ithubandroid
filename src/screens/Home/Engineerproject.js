import Axios from 'axios'
// Imports: Redux Actions
import { connect } from 'react-redux';

// Imports: Redux Actions
import { login } from '../../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../../redux/actions/counterActions';
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'

import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, View, Button, Footer, FooterTab, Icon } from 'native-base';

class EngineerProject extends React.Component {
    constructor(props){
      super(props);
      this.state={
        project: []
      }
    }

    componentDidMount(){
      this._getProject()  
    }

    _getProject = async () => {
        try{
          Axios.defaults.headers.common['Authorization'] = this.props.token;
          const auth = await Axios.get('http://192.168.1.20:5000/myhire/readproject')
          console.log(auth.data.result);
          await this.setState({
            project: auth.data.result
          })
        }catch(error){
            console.log(error);
        }
    }

    _changeStatus = async(id, status) =>{
      try{
        console.log(id);
        
        Axios.defaults.headers.common['Authorization'] = this.props.token;
        const auth = await Axios.put('http://192.168.1.20:5000/myhire/statusproject',
          {
            id,
            status 
          }
        )
        this._getProject()
      }catch(error){
          console.log(error);
      }
    }

    render() {
      const { project } = this.state;
      if(!project.length) {
        return(
          <Container>
            <Header />
            <Content>
              <View>
                <Text>
                 Uh... Maaf belum ada project
                </Text>
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
        )
      }
      return (
        <Container>
        <Header />
        <Content>
        <Text style={{color : 'black', fontStyle : 'italic', fontSize : 18, textAlign : 'center', marginTop : 10}}>
                 List about your project
                </Text>
     
            {
              
                project.map((data, index) => (
                  <List style={{backgroundColor : '#ccc', width : 320, height :120, left : 20, borderRadius : 15, marginTop : 20}}>
                  
                  <ListItem key={index}>
                    <Body>
                      <Text>{data.name}</Text>
                      <Text note>{data.id_company}</Text>
                      <Text note>Rp.{data.price}</Text>
                    </Body>
                    <Right>
                    {
                        (data.status != '1')?
                          <Button style={{width : 90, height : 30, borderRadius : 10, marginBottom : 10, backgroundColor : 'yellow'}}      
                            onPress={() => {this._changeStatus(data.id, 1)}}
                          >
                          <Text style={{fontSize : 12, color : 'black'}}>Decline</Text>
                          </Button>
                          :
                          <Button style={{width : 90, height : 30, borderRadius : 10, marginBottom : 10, backgroundColor : 'green'}}     
                          onPress={() => {this._changeStatus(data.id, 0)}}
                        >
                        <Text>Accept</Text>
                        </Button>
                    }
                    </Right>
                  </ListItem>
                  </List>
                ))
            }
        
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

// Map State To Props (Redux Store Passes State To Component)
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
  
        reduxEngineer: (id) => dispatch(getEngineer(id))
     };
  };
  
  // Exports
  export default connect(mapStateToProps, mapDispatchToProps)(EngineerProject);

