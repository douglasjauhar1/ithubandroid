import { connect } from 'react-redux';
import Axios from 'axios'
import React, { Component } from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import { Container, Header, Content, Form, Item, Picker, Icon, Button, Text, Footer, FooterTab } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { jwt } from '../../../redux/actions/tokenAction'
import { getEngineer } from '../../../redux/actions/engineerActions'

class Hire extends Component {
    constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      project: []
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
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

   _sendProject = async (id) => {
    const {project} = this.state;
    const selected = project[id];
    console.log(selected);
    console.log(id);
    try{
      Axios.defaults.headers.common['Authorization'] = this.props.token;
      const auth = await Axios.put('http://192.168.1.20:5000/myhire/changeproject',
        {
          id: selected.id,
          done: selected.done,
          name: selected.name,
          price: selected.price,
          description: selected.description,
          skill: selected.skill,
          id_engineer: this.props.id,
        }
      )
      alert('Project has been sent!, Wait engineer ..')
      this.props.navigation.navigate('Preview')
    }catch(error){
      console.log(error)
    }
   }

  
   render() {
    const {project} = this.state;
    
    const { goBack } = this.props.navigation;
    return (
      <Container>
          <View style={styles.titleBar}>
                        <TouchableOpacity onPress={() => goBack()}><Ionicons name="ios-arrow-back" size={27} color="#52575D"style={{marginTop: 12, marginLeft : 16, marginBottom : 12, color : 'white'}}></Ionicons></TouchableOpacity>
                    </View>

        <Content contentContainerStyle={{justifyContent : 'center', alignItems : 'center', flex : 1, backgroundColor : '#CCC'}}>
        
          <View style={styles.wrap}>
            <View style={{width : 280,
    height : 40,
    borderRadius : 10,
    backgroundColor : '#3E51B5'}}>
          <Text style={{ fontSize : 20, textAlign : 'center', marginTop : 5, fontWeight : 'bold', color : '#FFFF'}}>Choose The Project </Text>
          </View>
          <Form style={styles.forms}>
            <Item picker style={{ borderBottomColor : '#bbb', marginTop : 30, }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{color : 'black', marginBottom : 50 ,border : 'none', fontSize : 40 }}
                placeholder="Select your Project"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#bbb"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                {
                  project.map((data, index) => (
                    <Picker.Item label={data.name} value={index} key={index}/>
                  ))
                }
              </Picker>
            </Item>
          </Form>
          <Button 
                style={{marginBottom: 10, borderRadius: 10, width : 100, height : 40}} 
                onPress = {()=>{this._sendProject(this.state.selected2)}}
                // onPress={()=>{ this._sendProject(data.id, data.name, data.skill, data.description, data.budget, data.done)}}
            >
              <Text style={{left : 15}}>
                Send
              </Text>
            </Button>
            {/* <Text style={{left : 15}}> */}
           
{/* Guide if you want to send the project:
1. Make sure the engineer is an expert in the skills you need,
2. See the high project rate
3. Give your project in detail so that the engineer understands */}
              {/* </Text> */}
            </View>
        </Content>
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
    );
  }
}

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
export default connect(mapStateToProps, mapDispatchToProps)(Hire)

const styles = StyleSheet.create({
  form : {
    width : 200,
  
  },
  forms : {
    marginTop : 30,
    width : 220,
    justifyContent : 'center',
    textAlign : 'center',
    flex : 1,
   
    
  },
  wrap : {
    width : 280,
    height : 200,
    borderRadius : 10,
    backgroundColor : '#BBB',
    alignItems : 'center',
    fontSize : 20
  
  },
  titleBar: {
    backgroundColor : '#3E51B5'
},

})