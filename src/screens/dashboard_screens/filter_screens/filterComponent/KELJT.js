import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  processColor,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ListView
} from 'react-native';

//library
import  { Container, Header, Content, Form, Item, Input, 
          Label, Button, Text, Icon, Toast, Card, CardItem, Body,
          Right, Left, Title, Footer, FooterTab, Fab, ListItem, CheckBox
        } from 'native-base';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';

//page
import url from '../../../../config/api_service';
// import {
//   dataFilterKELJT
// } from '../../../../configs/connections';
// import {TOKEN_KEY} from '../../../../configs/constants';

export default class KELJTFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoader:true,

      //data Customer
      data:[],
      selectedData: []
    };
  }

  componentWillMount(){
    AsyncStorage.getItem(TOKEN_KEY).then(res => {
      const token = res;
      axios.get(`${url.APIDEV}getKeljt`,{
        headers: { 'x-authorization': `bearer ${token}` }
      }).then((res) => {
        const data = res.data.data
        
        this.setState({
          showLoader:false,
          data:data
        })
      }).catch((error) => {
        console.log(error)
        this.setState({
          showLoader:false
        })
      });
    });
  }

  onCheckBoxPress(id) {
    let tmp = this.state.selectedData;

    if ( tmp.includes( id ) ) {
      tmp.splice( tmp.indexOf(id), 1 );
    } else {
      tmp.push( id );
    }
    
    const data = tmp;
    this.setState({
      selectedData: data
    });
  }

  goBackDashboard(){
    dataFilterKELJT(this.state.selectedData);          
    setTimeout(() => { 
      this.props.navigation.navigate('FilterDashboard');          
    }, 100); 
  }

  goBack(){
    this.props.navigation.goBack()
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    return (
      <Container>
        {
          this.state.showLoader 
            ?
        <View style={{justifyContent:'center', alignItems:'center', flex:1, padding:'10%', backgroundColor:'rgba(0, 0, 0, 0.5);'}}>
          <View style={{backgroundColor:'#092948', padding:20, width:'100%', flexDirection:'row', alignSelf:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="#FFFFFF" /><Text style={{color:'#FFFFFF'}}>    Loading Content...</Text>                           
          </View>
        </View>
            :
        <View style={{flex:1, backgroundColor:'#f3f3f3'}}>
          <Header style={{backgroundColor:'#092948'}} noShadow={true}>
            <Left style={{flex: 3}}>
              <Button transparent onPress={() => this.goBack()}>
                <Icon name='arrow-back' type={'Ionicons'}/>
              </Button>
            </Left>
            <Body style={{flex:1}}>
              <Title>Filter</Title>
            </Body>
            <Right style={{flex:3}} />        
          </Header>
        
          <Content>
            <View>
              <ListView
                enableEmptySections={true} 
                dataSource={ds.cloneWithRows(this.state.data)}
                renderRow={(item) =>
                  <ListItem>
                    <CheckBox
                      checked={this.state.selectedData.includes(item.KELJT_ID) ? true : false}
                      onPress={()=>this.onCheckBoxPress(item.KELJT_ID)}
                    />
                    <Body>
                      <Text>{item.NAMA_KELJT}</Text>
                    </Body>
                  </ListItem>
                }
              />
            </View>
          </Content>

          <Footer>
            <FooterTab>
              <Button full onPress={() => this.goBackDashboard()} style={{backgroundColor:'#092948'}}>
                <Text style={{fontSize:14, color:'#fff'}}>SIMPAN</Text>
              </Button>
            </FooterTab>
          </Footer>
        </View>
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor:'#F3F3F3'
  },
  buttonFilter:{
    color:'#000', 
    fontSize:30
  },
  titleKompetensi:{
    fontSize:20
  },
});










