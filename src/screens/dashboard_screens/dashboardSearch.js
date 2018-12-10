import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  processColor,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  FlatList,
  BackHandler,
  Alert,
  Linking,
  Dimensions
} from 'react-native';

//library
import { Container, Header, Content, Form, Item, Input,
          Label, Button, Text, Icon, Toast, Card, CardItem, Body,
          Right, Left, Title, Footer, FooterTab, Fab
        } from 'native-base';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Swiper from 'react-native-swiper';
import { connect } from "react-redux";


//import chart
import RekomendasiPieChart from '../components/chart/dashboardChart/pieDashboard/pieDashboardChart';
import KompetensibarChart  from '../components/chart/dashboardChart/barDashboard/barDashboardChart';

//global
import url from '../../config/api_service';
import KompetensiChart from '../components/chart/kompetensiChart';
import Confirm from '../components/Confirm';
import { sliderWidth, itemWidth } from '../../Assets/stylesHeader/sliderEntryDashboard.styles';
import stylesHeader, { colors } from '../../Assets/stylesHeader/index.styles';

const SLIDER_1_FIRST_ITEM = 0;

const deviceWidth = Dimensions.get('window').width;


class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      version:  '1.0',
      linkDownload: null,
      active         : 'true',
      statusUpdate  : false,
      dataKompetensi : [],
      dataRekomendasi: [],
      dataKeterangan:[],
      dataSlider: null,
      showLoader:true,
      slider1ActiveSlide:SLIDER_1_FIRST_ITEM,
      headerName:[
        {
          id: 1,
          title:'Jumlah Project',
          jumlah: '',
        },
        {
          id: 2,
          title:'Jumlah Peserta',
          jumlah: '',
        }
      ]
    };
  }

  componentWillMount(){
    const {compdep_id, token, nik_user} = this.props;
    const { params } = this.props.navigation.state;

    console.log(params.url);
    const begda = null;
    const endda = null;
    const expired = 1;
    const jt = null;


    axios.get(`https://apifactory.telkom.co.id:8243/HCM/Assistium/v1/external/getBannerAdvertise/${compdep_id}`,
      { headers: { 'x-Authorization': `bearer ${token}` }
    })
      .then((response) => {
        this.setState({ dataSlider: response.data.data.list_banner });
      });


      axios.get(`http://apifactory.telkom.co.id:8280/HCM/Assistium/v1/external/getVersion/${this.state.version}`,
        { headers: { 'x-Authorization': `bearer ${token}` }
      })
        .then((response) => {
          //console.log(response);

          console.log(response.data.status);
          if(response.data.status === 'failed'){
            this.setState({ statusUpdate: false});
          }else{
            this.setState({ statusUpdate: true});

            if(Platform.OS === 'ios'){
              //console.log('masuk ios');
              this.setState({ linkDownload: response.data.data.IOS.V_LINK});
            }else if(Platform.OS === 'android'){
              //console.log('masuk android');
              this.setState({ linkDownload: response.data.data.Android.V_LINK});
            }else{
              //console.log('masuk simulator');
            }
          }
          //this.setState({ dataSlider: response.data.data.list_banner });
        });



    this.props.dispatch({
      type:'BAR_DASHBOARD',
      payload:axios.get(`${params.url}`,{
        headers: { 'x-Authorization': `bearer ${token}`}
      })
    })


  }

  _renderItem(item){
    return(

      <View key={item.nama_banner} style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={() => Linking.openURL(item.link_banner)}>
        <Image
          resizeMode={'contain'}
          style={{
            height:140,
            width:null,
          }}
          source={{ uri: item.image_banner }}
        />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderCards(){
    return this.state.dataSlider.map( item => {
      return this._renderItem(item);
    });
  }

  checkDataSlider(){
    if(this.state.dataSlider){
      console.log('sekali');
      return(
          <Swiper paginationStyle={{ marginBottom: -25 }} height={140} autoplay autoplayTimeout={7}>
            {this.renderCards()}
          </Swiper>
      );
    }
  }


  goSearchPage(){
    this.props.navigation.navigate('Search');
  }

  goFilterPage(){
    this.props.navigation.navigate('FilterDashboard');
  }

  setModalVisible() {
    //const value = !this.state.statusUpdate;
    //this.setState({statusUpdate: value});

    Linking.openURL(this.state.linkDownload);
  }

  render() {
    console.log(this.state.dataSlider);
    const {navigation} = this.props;
    const { params } = this.props.navigation.state;
    console.log(params.urlKompetensi);
    console.log(params.urlRekomendasi);
    return (
      <Container>
        {/* {
          this.state.showLoader
            ?
        <View style={{justifyContent:'center', alignItems:'center', flex:1, padding:'10%', backgroundColor:'rgba(0, 0, 0, 0.5);'}}>
          <View style={{backgroundColor:'#092948', padding:20, width:'100%', flexDirection:'row', alignSelf:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="#FFFFFF" /><Text style={{color:'#FFFFFF'}}>    Loading Content...</Text>
          </View>
        </View>
            : */}
        <View style={{flex:1}}>
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
                source={require('../../Assets/logo/assistium-logo.png')}
              />
            </Body>
            <Right style={{flex:1}}>
              <Button transparent onPress={() => this.goSearchPage()}>
                <Icon name='search' style={{color:'#FFF'}}/>
              </Button>
            </Right>
          </Header>

          <View style={styles.container}>
            <ScrollView>
              <View style={{height:140, flex:1}}>
                  {this.checkDataSlider()}
              </View>
              <Card>
                <CardItem>
                  <Left>
                    <Text style={[styles.titleKompetensi,{fontWeight:'bold'}]}>
                      Profil
                    </Text>
                    <Text style={styles.titleKompetensi}>
                      Rekomendasi
                    </Text>
                  </Left>
                </CardItem>

                  <View style={{flexDirection: 'row', flex: 1}}>
                  <View style={{ justifyContent:'center', paddingLeft: 0, flex: 4}}>
                      <CardItem >
                      <View style={{ height: 10, width: 10, backgroundColor: '#00CEA8', borderRadius: 5 }} />
                      <Text style={{textAlign:'left', color:'#000', margin:3, fontSize: 14}}>Ready</Text>
                      </CardItem>
                      <CardItem>
                      <View style={{ height: 10, width: 10, backgroundColor: '#FFCE00', borderRadius: 5 }} />
                      <Body><Text style={{textAlign:'left', color:'#000', margin:3, fontSize: 14 }}>Ready With Development</Text></Body>
                      </CardItem>
                      <CardItem>
                      <View style={{ height: 10, width: 10, backgroundColor: '#FB2F23', borderRadius: 5 }} />
                      <Text style={{textAlign:'left', color:'#000', margin:3, fontSize: 14}}>Not Ready</Text>
                      </CardItem>

                  </View>
                  <CardItem style={{ flex: 6}}>
                    <Body style={{justifyContent:'center', alignItems:'flex-end'}}>
                      <RekomendasiPieChart data={params.urlRekomendasi}/>
                    </Body>
                  </CardItem>
                  </View>


              </Card>

              <Card>
                <CardItem>
                  <Left>
                    <Text style={[styles.titleKompetensi,{fontWeight:'bold'}]}>
                      Profil
                    </Text>
                    <Text style={styles.titleKompetensi}>
                      Kompetensi
                    </Text>
                  </Left>
                </CardItem>

                <CardItem>
                  <Body style={{justifyContent:'center', alignItems:'center'}}>
                    <KompetensibarChart />
                  </Body>
                </CardItem>
              </Card>
            </ScrollView>

              <Fab
                active={this.state.active}
                style={{ backgroundColor: '#404040' }}
                position="bottomRight"
                onPress={() => this.goFilterPage()}
              >
                <Icon name="filter" type={'FontAwesome'} />
              </Fab>



          </View>

          <Confirm
            visible={this.state.statusUpdate}
            onPress={this.setModalVisible.bind(this)}
          >
            Are You Sure
          </Confirm>
        </View>


        </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.LoginReducer.token,
  compdep_id:state.LoginReducer.compdep_id,
  nik_user:state.LoginReducer.nik_user
})

export default connect(mapStateToProps)(Dashboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F3F3F3'
  },
  buttonFilter:{
    color:'#000',
    fontSize:30
  },
  titleKompetensi:{
    fontSize:20
  },

  slider: {
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    flex: 1
  },
  slide2: {
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
