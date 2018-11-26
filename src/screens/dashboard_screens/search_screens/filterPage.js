import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  Image,
  ListView,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

//library
import  { Container, Header, Content, Form, Item, Input, 
  Label, Button, Text, Icon, Toast, Card, CardItem, Body,
  Right, Left, Title, Footer, FooterTab
} from 'native-base';
import axios from 'axios';

//data constant
// import { TOKEN_KEY } from '../../../configs/constants';

//url
import url from '../../../config/api_service';

export default class FilterInSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data:[],
      nikUser:'',
      dataCoba:'',
      showLoader:false,
      statusButton:false,
      statusButton2:false,    
      messageButton:'Tampilkan',
      token:'',
    };
  }

  componentWillMount(){
    AsyncStorage.getItem(TOKEN_KEY).then(res => {
      const token = res;
      this.setState({
        token:token
      })
    }).catch((error) => {
      console.log(error)
    });
  }

  goBack(){
    this.props.navigation.goBack();
  }

  renderDataAPi(data){
    const token = this.state;
    
    axios.get(`${url.APIDEV}search/${data}/10/0`, {
      headers: { 'x-authorization': `bearer ${token}` }
    })
    .then((res) => {
      console.log(res);
      const data = res.data.message;
      this.setState({
        messageButton:data
      })
    })
    .catch((error) => {
      console.log(error)
    }); 
  }

  renderButton(data){
    this.setState({
      statusButton:!this.state.statusButton
    })
    this.renderDataAPi(data);
  }

  renderButton2(data){
    this.setState({
      statusButton2:!this.state.statusButton2
    })
    this.renderDataAPi(data);    
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor:'#092948'}}>
          <Left style={{flex: 1}}>
            <Button transparent onPress={() => this.goBack()}>
              <Icon name='arrow-back' type={'Ionicons'}/>          
            </Button>
          </Left>
          <Body style={{flex: 1}}>
            <Title>      Filters</Title>
          </Body>
          <Right style={{flex: 1}}/>
        </Header>

        <Content padder> 
          <View style={styles.container}>
            <Button block style={this.state.statusButton ? styles.buttonFiltersActive : styles.buttonFilters} onPress={() => this.renderButton('ctr')}>
              <Text style={this.state.statusButton ? styles.buttonTextActive : styles.buttonTextNoActive}>CTR</Text>
            </Button>

            <Button block style={this.state.statusButton2 ? styles.buttonFiltersActive2 : styles.buttonFilters2} onPress={() => this.renderButton2('ctr-aci')}>
              <Text style={this.state.statusButton2 ? styles.buttonTextActive2 : styles.buttonTextNoActive2}>CTR-ACI</Text>
            </Button>
          </View>
        </Content>

        <Footer> 
          <FooterTab style={{backgroundColor:'#092948'}}>
            <Button full onPress={() => alert('Filter')}>
              <Text style={{fontSize:14, color:'#fff'}}>{this.state.messageButton}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginBottom:20
  },
  buttonFilters:{
    borderBottomColor:'#f3f3f3', 
    borderBottomWidth:1, 
    backgroundColor:'transparent'
  },
  buttonFiltersActive:{
    borderBottomColor:'#2c3e50', 
    borderBottomWidth:1, 
    backgroundColor:'#2c3e50'
  },
  buttonFiltersActive:{
    fontSize:14, color:'#fff'
  },
  buttonTextNoActive:{
    fontSize:14, color:'#000'
  },
  
  buttonFilters2:{
    borderBottomColor:'#f3f3f3', 
    borderBottomWidth:1, 
    backgroundColor:'transparent',
    marginTop:10
  },
  buttonFiltersActive2:{
    borderBottomColor:'#2c3e50', 
    borderBottomWidth:1, 
    backgroundColor:'##2c3e50',
    marginTop:10
  },
  buttonFiltersActive2:{
    fontSize:14, color:'#fff'
  },
  buttonTextNoActive2:{
    fontSize:14, color:'#000'
  },
}); 