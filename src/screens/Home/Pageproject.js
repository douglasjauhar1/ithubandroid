import React, { Component } from 'react'
import { Modal, View, StyleSheet,TouchableOpacity } from 'react-native';
import {
    Container, Header, Content, Card, Input,
    CardItem, Text, Right, Icon, Row,
    Left, Body, Title, Button, Label, Form, Item,  }
  from 'native-base';
import Engineer from '../Form/Engineer';

export default class Pageproject extends Component {
 constructor(props) {
        super(props);
        this.state = {
          tenantData: {
          FirstName: 'Jonh', LastName: 'Doe', Email: 'jonh@test.com', Phone: 'xxx-xxx-xxxx',
          Unit: '101', MiddleName: '',
          },
          visibleModal: false,
          modalField: '',
          modalLabel: '',
        };
      }
      Alert(){
         alert('')
      } 

      renderModalContent() {  //CHANGE_HERE
        return (
        <View style={{ flex: 1 }}>
          <Form>
            <Text>Hello!</Text>
            <Item fixedLabel>
              <Label>First Name</Label>
              <Input 
                value={this.state.tenantData.FirstName}
                onChangeText={(text) => { 
                  const myTenantData = {...this.state.tenantData, FirstName: text};
                  this.setState({tenantData: myTenantData})}}
              />
            </Item>
            <Button
              onPress={() => this.setState({
                visibleModal: false
              })}
            >
            <Text>Hide Modal</Text>
            </Button>
          </Form>
        </View>
        )
      }
    render() {
        const {
            FirstName, LastName, Email, Phone, Unit, MiddleName
          } = this.state.tenantData;
          return (
            <Container>
              <Header>
                <Left>
                  <Button
                    transparent
                  >
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body>
                  <Title>{FirstName} {LastName}</Title>
                </Body>
                <Right />
              </Header>
              <Content>
  
                <Modal
                    transparent={false}
                    visible={this.state.visibleModal}
                    animationType="slide"
                >
                    {this.renderModalContent()}
                </Modal>
                <Card>
                  <View style={styles.containerTextHeader}>
                    <Text style={styles.infoTextHeader}>Tenant Details</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => this.setState({
                      visibleModal: true,
                      modalField: 'FirstName',
                      modalLabel: { FirstName },
                    })}
                  >
                    <CardItem>
                      <Left>
                       
                        <Text>First Name</Text>
                      </Left>
                      <Right>
                        <Row>
                          <Text style={styles.valueText}>{FirstName}   </Text>
                          <Icon name="arrow-forward" />
                        </Row>
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert('OK')} >
                    <CardItem>
                      <Left>
                      
                        <Text>Middle Name</Text>
                      </Left>
                      <Right>
                        <Row>
                          <Text style={styles.valueText}>{MiddleName}   </Text>
                          <Icon name="arrow-forward" />
                        </Row>
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert('OK')} >
                    <CardItem>
                      <Left>
                     
                        <Text>Last Name</Text>
                      </Left>
                      <Right>
                        <Row>
                          <Text style={styles.valueText}>{LastName}   </Text>
                          <Icon name="arrow-forward" />
                        </Row>
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert('OK')} >
                    <CardItem>
                      <Left>
                       
                        <Text>Email</Text>
                      </Left>
                      <Right>
                        <Row>
                          <Text style={styles.valueText}>{Email}   </Text>
                          <Icon name="arrow-forward" />
                        </Row>
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert('OK')} >
                    <CardItem>
                      <Left>
                       
                        <Text>Phone</Text>
                      </Left>
                      <Right>
                        <Row>
                          <Text style={styles.valueText}>{Phone}   </Text>
                          <Icon name="arrow-forward" />
                        </Row>
                      </Right>
                    </CardItem>
                  </TouchableOpacity>
                </Card>
              </Content>
            </Container>
          );
        }
      }
      const styles = StyleSheet.create({
        infoTextHeader : {
            left : 20,
            fontSize : 20,
            fontWeight : 'bold'
        }
      })
    

