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
import url from '../../../config/api_service';
import Tabs from '../../components/tabs';
// import {
//   dataFilterDashboard, dataFilterBand, dataFilterDivisi, dataFilterFU, dataFilterKELJT, dataFilterExpired
// } from '../../../configs/connections';
// import {TOKEN_KEY} from '../../../configs/constants';


export default class FilterDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoader:true,
      
      //data expired
      dataExpired:'',
      selectedExpired:false,

      //data Customer
      dataCustomer:[],
      selectedCustomer: [],

      //data Band
      dataBand:[],
      selectedBand: [],

      //data Divisi
      dataDivisi:[],
      selectedDivisi: [],

      //data FU
      dataFu:[],
      selectedFu: [],

      //data KELJT
      dataKELJT:[],
      selectedKELJT: [],


    };
  }

  // componentWillMount(){
  //   AsyncStorage.getItem(TOKEN_KEY).then(res => {
  //     const token = res;

  //     //data customer
  //     axios.get(`${url.APIDEV}getCustomer`,{
  //       headers: { 'x-authorization': `bearer ${token}` }
  //     }).then((res) => {
  //       const dataCustomer = res.data.data
        
  //       this.setState({
  //         dataCustomer:dataCustomer
  //       })
  //     }).catch((error) => {
  //       console.log(error)
  //     });

  //     //data band
  //     axios.get(`${url.APIDEV}getBand`,{
  //       headers: { 'x-authorization': `bearer ${token}` }
  //     }).then((res) => {
  //       const data = res.data.data
        
  //       this.setState({
  //         dataBand:data
  //       })
  //     }).catch((error) => {
  //       console.log(error)
  //     });

  //     //data divisi
  //     axios.get(`${url.APIDEV}getDivisi`,{
  //       headers: { 'x-authorization': `bearer ${token}` }
  //     }).then((res) => {
  //       const data = res.data.data
        
  //       this.setState({
  //         dataDivisi:data
  //       })
  //     }).catch((error) => {
  //       console.log(error)
  //     });

  //     //data FU
  //     axios.get(`${url.APIDEV}getFU`,{
  //       headers: { 'x-authorization': `bearer ${token}` }
  //     }).then((res) => {
  //       const data = res.data.data
        
  //       this.setState({
  //         dataFu:data
  //       })
  //     }).catch((error) => {
  //       console.log(error)
  //     });

  //     //data KELJT
  //     axios.get(`${url.APIDEV}getKeljt`,{
  //       headers: { 'x-authorization': `bearer ${token}` }
  //     }).then((res) => {
  //       const data = res.data.data
        
  //       this.setState({
  //         dataKELJT:data,
  //         showLoader:false
  //       })
  //     }).catch((error) => {
  //       console.log(error)
  //       this.setState({
  //         showLoader:false
  //       })
  //     });

  //   })
  // }

  goBack(){
    this.props.navigation.goBack()
  } 

  //on check expired data
  onCheckExpiredData() {
    this.setState({
      selectedExpired: !this.state.selectedExpired
    },() => {
      if(this.state.selectedExpired === true)
        {
          this.setState({
            dataExpired:'0.1'
          })
        }
      else
        {
          this.setState({
            dataExpired:'1'
          })
        }
    });
    
  }
  //on check Customer
  onCheckBoxCompany(id) {
    let tmp = this.state.selectedCustomer;

    if ( tmp.includes( id ) ) {
      tmp.splice( tmp.indexOf(id), 1 );
    } else {
      tmp.push( id );
    }
    
    const data = tmp;
    this.setState({
      selectedCustomer: data
    });
    console.log(data);
  }
  //on Check Band
  onCheckBoxBand(id) {
    let tmp = this.state.selectedBand;

    if ( tmp.includes( id ) ) {
      tmp.splice( tmp.indexOf(id), 1 );
    } else {
      tmp.push( id );
    }
    
    const data = tmp;
    this.setState({
      selectedBand:tmp
    });
    console.log(data);
  }
  //on Check Divisi
  onCheckBoxDivisi(id) {
    let tmp = this.state.selectedDivisi;

    if ( tmp.includes( id ) ) {
      tmp.splice( tmp.indexOf(id), 1 );
    } else {
      tmp.push( id );
    }
    
    const data = tmp;
    this.setState({
      selectedDivisi:tmp
    });
    console.log(data);
  }
  //on Check FU
  onCheckBoxFU(id) {
    let tmp = this.state.selectedFu;

    if ( tmp.includes( id ) ) {
      tmp.splice( tmp.indexOf(id), 1 );
    } else {
      tmp.push( id );
    }
    
    const data = tmp;
    this.setState({
      selectedFu:tmp
    });
    console.log(data);
  }
  //on Check KELJT 
  onCheckBoxKELJT(id) {
    let tmp = this.state.selectedKELJT;

    if ( tmp.includes( id ) ) {
      tmp.splice( tmp.indexOf(id), 1 );
    } else {
      tmp.push( id );
    }
    
    const data = tmp;
    this.setState({
      selectedKELJT:tmp
    });
    console.log(data);
  }

  goTerapkanFilter(){
    dataFilterExpired(this.state.dataExpired);

    if(this.state.selectedCustomer.length === 0)
      {
        dataFilterDashboard('null');
      }
    else 
      {
        dataFilterDashboard(this.state.selectedCustomer.join('.'));       
      }

    if(this.state.selectedBand.length === 0)
      {
        dataFilterBand('null')
      }
    else 
      {
        dataFilterBand(this.state.selectedBand.join('.'));                     
      }

    if(this.state.selectedDivisi.length === 0)
      {
        dataFilterDivisi('null')
      }
    else 
      {
        dataFilterDivisi(this.state.selectedDivisi.join('.'));         
      }

    if(this.state.selectedFu.length === 0)
      {
        dataFilterFU('null')
      }
    else 
      {
        dataFilterFU(this.state.selectedFu.join('.'));        
      }

    if(this.state.selectedKELJT.length === 0)
      {
        dataFilterKELJT('null')
      }
    else 
      {
        dataFilterKELJT(this.state.selectedKELJT.join('.'));  
      }
    setTimeout(() => { 
      this.props.navigation.navigate('DetailFilterDashboard');          
    }, 500); 
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
          
          <View style={styles.container}>
            <Tabs style={{flexDirection:'column'}}>
              <View title="Data Type" style={styles.contentFilter}>
                <ListItem style={{borderBottomWidth: 0}}>
                  <CheckBox 
                    color="#092948"                  
                    checked={this.state.selectedExpired} 
                    onPress={() => this.onCheckExpiredData()}
                  />
                  <Body>
                    <Text>Include Expired Data</Text>
                  </Body>
                </ListItem>
              </View>

              <View title="Company Type" style={styles.contentFilter}>
                <ListView
                  style={{borderBottomWidth: 0}}
                  enableEmptySections={true} 
                  dataSource={ds.cloneWithRows(this.state.dataCustomer)}
                  renderRow={(item) =>
                    <ListItem style={{borderBottomWidth: 0}}>
                      <CheckBox
                        color="#092948"
                        checked={this.state.selectedCustomer.includes(item.CUSTOMER_ID) ? true : false}
                        onPress={()=>this.onCheckBoxCompany(item.CUSTOMER_ID)}
                      />
                      <Body>
                        <Text>{item.CUSTOMER_NAME}</Text>
                      </Body>
                    </ListItem>
                  }
                />
              </View>
              
              <View title="Band" style={styles.contentFilter}>
                <ListView
                  enableEmptySections={true} 
                  dataSource={ds.cloneWithRows(this.state.dataBand)}
                  renderRow={(item) =>
                    <ListItem>
                      <CheckBox
                        color="#092948"
                        checked={this.state.selectedBand.includes(item.V_BAND_POSISI) ? true : false}
                        onPress={()=>this.onCheckBoxBand(item.V_BAND_POSISI)}
                      />
                      <Body>
                        <Text>{item.V_BAND_POSISI}</Text>
                      </Body>
                    </ListItem>
                  }
                />
              </View>

              <View title="Divisi" style={styles.contentFilter}>
                <ListView
                  enableEmptySections={true} 
                  dataSource={ds.cloneWithRows(this.state.dataDivisi)}
                  renderRow={(item) =>
                    <ListItem>
                      <CheckBox
                        color="#092948"
                        checked={this.state.selectedDivisi.includes(item.C_KODE_DIVISI) ? true : false}
                        onPress={()=>this.onCheckBoxDivisi(item.C_KODE_DIVISI)}
                      />
                      <Body>
                        <Text>{item.C_KODE_DIVISI}</Text>
                      </Body>
                    </ListItem>
                  }
                />
              </View>

              <View title="Function Unit" style={styles.contentFilter}>
                <ListView
                  enableEmptySections={true} 
                  dataSource={ds.cloneWithRows(this.state.dataFu)}
                  renderRow={(item) =>
                    <ListItem>
                      <CheckBox
                        color="#092948"
                        checked={this.state.selectedFu.includes(item.C_FUNCTION_UNIT) ? true : false}
                        onPress={()=>this.onCheckBoxFU(item.C_FUNCTION_UNIT)}
                      />
                      <Body>
                        <Text>{item.C_FUNCTION_UNIT}</Text>
                      </Body>
                    </ListItem>
                  }
                />
              </View>

              <View title="Job Target" style={styles.contentFilter}>
                <ListView
                  enableEmptySections={true} 
                  dataSource={ds.cloneWithRows(this.state.dataKELJT)}
                  renderRow={(item) =>
                    <ListItem>
                      <CheckBox
                        color="#092948"
                        checked={this.state.selectedKELJT.includes(item.KELJT_ID) ? true : false}
                        onPress={()=>this.onCheckBoxKELJT(item.KELJT_ID)}
                      />
                      <Body>
                        <Text>{item.NAMA_KELJT}</Text>
                      </Body>
                    </ListItem>
                  }
                />
              </View>
            </Tabs>
          </View>

          <Footer>
            <FooterTab>
              <Button full onPress={() => this.goTerapkanFilter()} style={{backgroundColor:'#092948'}}>
                <Text style={{fontSize:14, color:'#fff'}}>Terapkan</Text>
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
    backgroundColor:'#F9F9F9'
  },
  contentFilter: {
    flex: 1,                 
    padding:20,           // Center horizontally
    backgroundColor: '#F3F3F3',         // Darker background for content area
  },
  buttonFilter:{
    color:'#000', 
    fontSize:30
  },
  titleKompetensi:{
    fontSize:20
  },
});










