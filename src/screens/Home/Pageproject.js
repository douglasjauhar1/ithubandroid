import React, { Component } from 'react'
import { View,SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Tabs, Tab, FooterTab, Footer, Item, Input  ,Text, List, ListItem,} from 'native-base';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Axios from 'axios'
// Imports: Redux Actions
import { connect } from 'react-redux';

// Imports: Redux Actions
import { login } from '../../../redux/actions/authActions';
import { increaseCounter, decreaseCounter } from '../../../redux/actions/counterActions';
import { getEngineer } from '../../../redux/actions/engineerActions'
import { jwt } from '../../../redux/actions/tokenAction'

class Pageproject extends Component {
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

  _changeDone = async(id, done) =>{
    try{
      console.log(id);
      
      Axios.defaults.headers.common['Authorization'] = this.props.token;
      const auth = await Axios.put('http://192.168.1.20:5000/myhire/doneproject',
        {
          id,
          done
        }
      )
      this._getProject()
      alert('Project has been finished!')
    }catch(error){
        console.log(error);
    }
  }

  render() {
    const { project } = this.state;
    if(!project.length) {
      return(
        <Container>
          <Header>
            <Left>
              <Button
                onPress = {()=>{this.props.navigation.navigate('AddProject')}}
              >
                <Text>
                  Add Project
                </Text>
              </Button>
            </Left>
          </Header>
          <Content>
            <View>
              <Text>
                Project list is empty!
              </Text>
            </View>
          </Content> 
        </Container> 
      )
    }
    return (
      <Container>
      <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.create} onPress={() => this.props.navigation.navigate('Project')}>
              
          <Icon name='add' /><Text style={{ fontSize: 16, marginLeft: 10 }}>Create</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.conten}>

      
        <Content>
        {
                project.map((data, index) => (
          <List style={{backgroundColor : '#ccc', width : 320, height :120, left : 20, borderRadius : 15, marginTop : 20}}>
            <ListItem avatar key={index}>
              {/* <Left>
                <Thumbnail source={{ uri: 'Image URL' }} />
              </Left> */}
              <Body>
                <Text>{data.name}</Text>
                <Text note>{data.description}</Text>
                <Text note>{data.price}</Text>
              </Body>
              <Right>
                    {
                        (data.done != '1')?
                          <Button style={{width : 90, height : 30, borderRadius : 10, marginBottom : 10}}     
                            onPress={() => {this._changeDone(data.id, 1)}}
                          >
                          <Text style={{fontSize : 11}}>Progress</Text>
                          </Button>
                          :
                          <Button style={{width : 90, height : 30, borderRadius : 10, marginBottom : 10, backgroundColor : 'green'}}      
                          onPress={() => {this._changeDone(data.id, 0)}}
                        >
                        <Text>Done</Text>
                        </Button>
                    }
                    {
                      (data.status != '1')?
                      <Button style={{width : 90, height : 30, borderRadius : 10, backgroundColor : '#ffd700'}}     
                    >
                    <Text style={{fontSize : 11, textAlign : 'center', left : 3}}>WAITING..</Text>
                    </Button>
                        :
                        <Button style={{width : 90, height : 30, borderRadius : 10, backgroundColor : 'green'}}     
                        >
                        <Text style={{fontSize : 11, textAlign : 'center', left : 3, color : 'white'}}>SUCCESS..</Text>
                        </Button>
                    }
                    </Right>
            </ListItem>
          </List>
               ))
              }
        </Content>
 
      </View>
  </View>
     <Footer>
     <FooterTab>
       <Button vertical onPress={() => this.props.navigation.navigate('Pageengineer')}>
         <Icon name="people" />
         <Text>Engineer</Text>
       </Button>
       <Button vertical onPress={() => this.props.navigation.navigate('Pageproject')}active>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 5,
        backgroundColor: '#3E51B5'
    },
    create: {
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "row",
        backgroundColor: '#fff',
        width: 105,
        padding: 5,
        borderRadius: 10,
    },
    conten: {
        flex: 1,
    }
})
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
export default connect(mapStateToProps, mapDispatchToProps)(Pageproject);