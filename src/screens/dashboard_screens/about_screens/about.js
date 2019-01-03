import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  FlatList,
  BackHandler
} from 'react-native';

//library
import  { Container, Header, Content, Form, Item, Input,
  Label, Button, Text, Icon, Toast, Card, CardItem, Body,
  Right, Left, Title, Footer, FooterTab, Tabs, Tab
} from 'native-base';

class About extends Component {

  componentWillMount(){

      this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        this.goBack(); // works best when the goBack is async
        return true;
      });

  }

  goSearchPage() {
    this.props.navigation.navigate('Search');
  }


  componentWillUnmount() {
    this.backHandler.remove();
  }

  goBack(){
    this.props.navigation.goBack();
  }


  render() {
    const {navigation} = this.props;
    return (
      <Container>
          <Header style={{backgroundColor:'#FE000C'}}>
            <Left style={{flex:1}}>
              <Button transparent onPress={() => navigation.navigate('DrawerOpen')}>
                <Icon name='menu' style={{color:'#FFF'}} />
              </Button>
            </Left>
            <Body style={{flex: 2}}>
              <Image
                resizeMode={'contain'}
                style={{
                  height:40,
                  width:200,
                }}
                source={require('../../../Assets/logo/assistium-logo.png')}
              />
            </Body>
            <Right style={{flex:1}}>
              <Button transparent onPress={() => this.goSearchPage()}>
                <Icon name='search' style={{color:'#FFF'}}/>
              </Button>
            </Right>
          </Header>

          <View
              style={{
                height:100,
                width:'100%',
                backgroundColor: 'red',
                borderBottomRightRadius: 400,
                borderBottomLeftRadius: 400,
                marginBottom: 0
              }}
            >

              <View style={{ justifyContent: 'center', alignItems: 'center' }} >
              <Image
                resizeMode={'contain'}
                style={{
                  height:40,
                  width:120,
                }}
                source={require('../../../Assets/logo/assistium-logo.png')}
              />
              <Text style={{ fontSize: 12 }}>Exclusive for</Text>

            </View>
          </View>

            <Card transparent style={{ padding: 20 }}>
              <CardItem>
                <Body>
                  <Text style={{fontSize: 14, color:'grey'}}>Assistium adalah aplikasi mobile untuk delivery profile hasil assessment dari Assessment Center Indonesia (ACI)
                  Latest Version : 1.0.0
                  Latest Update : 6 Desember 2018
                  </Text>
                </Body>
              </CardItem>
            </Card>

            <Tabs tabBarUnderlineStyle={{backgroundColor: 'red'}} >
                <Tab activeTextStyle={{color:'black'}} textStyle={{color:'black'}} activeTabStyle={{backgroundColor: '#fff', color:'black'}} tabStyle={{ backgroundColor: '#fff', color: '#000'}} heading="Fitur">
                  <Card>
                    <CardItem>
                      <Text style={{fontSize: 14}}>+ Corporate Dashboard {'\n'}
                      + Searching {'\n'}
                      + Individual Profile {'\n'}
                      + Delivery Report Notification{'\n'}
                      + Unlimited Update Version {'\n'}
                      </Text>
                    </CardItem>
                  </Card>
                </Tab>
                <Tab  activeTextStyle={{color:'black'}} textStyle={{color:'black'}} activeTabStyle={{backgroundColor: '#fff', color:'black'}} tabStyle={{ backgroundColor: '#fff', color: '#000'}} heading="FA&Q">
                <Card>
                  <CardItem>
                    <Text style={{fontSize: 14}}>FAQ</Text>
                  </CardItem>
                </Card>
                </Tab>
                <Tab activeTextStyle={{color:'black'}} textStyle={{color:'black'}} activeTabStyle={{backgroundColor: '#fff', color:'black'}} tabStyle={{ backgroundColor: '#fff', color: '#000'}} heading="Log">
                <Card>
                  <CardItem>
                    <Text style={{fontSize: 14}}>Log</Text>
                  </CardItem>
                </Card>
              </Tab>
            </Tabs>



      </Container>
    );
  }
}

export default About;
