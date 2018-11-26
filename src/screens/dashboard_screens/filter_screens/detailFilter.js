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
  FlatList
} from 'react-native';

//library
import  { Container, Header, Content, Form, Item, Input, 
          Label, Button, Text, Icon, Toast, Card, CardItem, Body,
          Right, Left, Title, Footer, FooterTab, Fab
        } from 'native-base';
import axios from 'axios';
import Carousel, { Pagination } from 'react-native-snap-carousel';

//page
import url from '../../../config/api_service';
import KompetensiChart from '../../components/chart/kompetensiChart';
import RekomendasiChart from '../../components/chart/rekomendasiChart';
import { sliderWidth, itemWidth } from '../../../Assets/stylesHeader/sliderEntryDashboard.styles';
import stylesHeader, { colors } from '../../../Assets/stylesHeader/index.styles';
// import {CUSTOMER_KEY, BAND_KEY, DIVISI_FILTER, FU_KEY, KELJT_KEY, TOKEN_KEY, EXPIRED_KEY } from '../../../configs/constants';

const SLIDER_1_FIRST_ITEM = 0;

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active         : 'true',
      dataKompetensi : [],
      dataRekomendasi: [],
      dataKeterangan:[],
      showLoader:true,
      messageData:'',
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
    }
  }


  componentWillMount(){
    AsyncStorage.getItem(EXPIRED_KEY).then(res => {
      const expired = res;
      AsyncStorage.getItem(CUSTOMER_KEY).then(res => {
        const ctype = res;
        AsyncStorage.getItem(BAND_KEY).then(res => {
          const band = res;
          AsyncStorage.getItem(DIVISI_FILTER).then(res => {
            const divisi = res;  
            AsyncStorage.getItem(FU_KEY).then(res => {
              const fu = res;      
              AsyncStorage.getItem(KELJT_KEY).then(res => {
                const keljt = res;        
                AsyncStorage.getItem(TOKEN_KEY).then(res => {
                  const token = res;
                  const date = new Date().getDate();
                  const month = new Date().getMonth() + 1;
                  const year = new Date().getFullYear();
    
                  const begda  = '2018-01-01';
                  const endda  = `${year}-${month}-${date}`;
                  
                  axios.get(`${url.APIDEV}getProfileRekomendasi/${begda}/${endda}/${expired}/${divisi}/${fu}/${band}/${keljt}/${ctype}`,
                  { headers: { 'x-authorization': `bearer ${token}` } }).then((res) => {                 
                    const data = res.data.data;

                    //data akronim
                    const akro_beem = res.data.data.BE_EM.NOT_READY.akronim;
                    const akro_cr   = res.data.data.C_R.NOT_READY.akronim;
                    const akro_di   = res.data.data.D_I.NOT_READY.akronim;
                    const akro_rc   = res.data.data.R_C.NOT_READY.akronim;
                    const akro_spd  = res.data.data.SP_D.NOT_READY.akronim;

                    //data job family
                    const jf_beem = res.data.data.BE_EM.NOT_READY.job_family;
                    const jf_cr   = res.data.data.C_R.NOT_READY.job_family;
                    const jf_di   = res.data.data.D_I.NOT_READY.job_family;
                    const jf_rc   = res.data.data.R_C.NOT_READY.job_family;
                    const jf_spd  = res.data.data.SP_D.NOT_READY.job_family;

                    const dataKet = [
                      {
                        akronim:akro_beem,
                        job_family:jf_beem
                      },
                      {
                        akronim:akro_cr,
                        job_family:jf_cr                      
                      }
                      ,{
                        akronim:akro_di,
                        job_family:jf_di
                      }
                      ,{
                        akronim:akro_rc,
                        job_family:jf_rc                       
                      }
                      ,{
                        akronim:akro_spd,
                        job_family:jf_spd                    
                      }
                    ]
                    
                    this.setState({
                      dataRekomendasi:data,
                      dataKeterangan:dataKet
                    })
                  }).catch((error) => {
                    console.log(error)
                  });

                  axios.get(`${url.APIDEV}getProfileKompetensi/${begda}/${endda}/${expired}/${divisi}/${fu}/${band}/${keljt}/${ctype}`,
                  { headers: { 'x-authorization': `bearer ${token}` } }).then((res) => {   
                    const data = res.data.data;
                    if(data === "")
                      {
                        this.setState({
                          messageData:data,
                          showLoader:false                      
                        })
                      }
                    else 
                      {
                        this.setState({
                          messageData:1,
                          dataKompetensi:data,
                        })
                        axios.get(`${url.APIDEV}getJumlahProject/${begda}/${endda}/${expired}/${divisi}/${fu}/${band}/${keljt}/${ctype}`,
                        { headers: { 'x-authorization': `bearer ${token}` } }).then((res) => {
                          const data_project = res.data.data.jumlah_project
                          axios.get(`${url.APIDEV}getJumlahPeserta/${begda}/${endda}/${expired}/${divisi}/${fu}/${band}/${keljt}/${ctype}`, 
                          { headers: { 'x-authorization': `bearer ${token}` } }).then((res) => {
                            const data_peserta = res.data.data.jumlah_peserta;
                            this.setState({
                              headerName:[
                                {
                                  id: 1,
                                  title:'Jumlah Project',
                                  jumlah: data_project,
                                },
                                {
                                  id: 2,
                                  title:'Jumlah Peserta',
                                  jumlah: data_peserta,
                                }
                              ],
                              showLoader:false
                            })
                          }).catch((error) => {
                            console.log(error)
                            this.setState({
                              showLoader:false
                            })
                          });
                        }).catch((error) => {
                          console.log(error)
                          this.setState({
                            showLoader:false
                          })
                        });
                    }
                  }).catch((error) => {
                    console.log(error)
                    this.setState({
                      showLoader:false
                    })
                  });
                }).catch((error) => {
                  console.log(error)
                  this.setState({
                    showLoader:false
                  })
                });              
              }).catch((error) => {
                console.log(error)
                this.setState({
                  showLoader:false
                })
              });
            }).catch((error) => {
              console.log(error)
              this.setState({
                showLoader:false
              })
            });
          }).catch((error) => {
            console.log(error)
            this.setState({
              showLoader:false
            })
          });
        }).catch((error) => {
          console.log(error)
          this.setState({
            showLoader:false
          })
        });
      }).catch((error) => {
        console.log(error)
        this.setState({
          showLoader:false
        })
      });
    });
  }

  openDrawer(){
    this.props.navigation.openDrawer();
  }

  _renderHeader ({item, index}) {
    return (
      <Card style={{borderRadius:5}}>
        <CardItem style={{borderRadius:5, justifyContent:'center'}} header>
          <Text style={{fontSize:16, fontWeight:'bold', color:'#000000', textAlign:'center'}}>
            {item.title}
          </Text>
        </CardItem>

        <View style={{borderBottomColor:'#808080', borderBottomWidth:1, marginLeft:15, marginRight:15}}/>

        <CardItem>
          <Body>
            <View style={{paddingTop:5, paddingBottom:5, width:'100%', flexDirection:'row', justifyContent:'center'}}>
              <View>
                <Text style={{color:'#858585', fontSize:20, fontWeight:'bold'}}>
                  {item.jumlah}
                </Text>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
    );
}

  bodyCarousel() {
    const { slider1ActiveSlide, headerName} = this.state; 
      return (
          <View>
              <Carousel
                ref={c => this._slider1Ref = c}              
                firstItem={slider1ActiveSlide}                  
                data={this.state.headerName}
                renderItem={this._renderHeader}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={'start'}
                containerCustomStyle={stylesHeader.slider}
                contentContainerCustomStyle={stylesHeader.sliderContentContainer}
                loop={this.state.headerName.length === 2 ? false : true}
                scrollEnabled={this.state.headerName.length === 2 ? false : true}              
              />
          </View>
      );
  }

  goFilterPage(){
    this.props.navigation.navigate('FilterDashboard');
  }

  render() {
    const bodyDetail = this.bodyCarousel();

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
        <View style={{flex:1}}>
          <Header style={{backgroundColor:'#092948'}}>
            <Left style={{flex:1}}>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
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
              <Button transparent onPress={() => this.props.navigation.navigate('Search')}>
                <Icon name='search' />
              </Button>
            </Right>            
          </Header>

          <View style={styles.container}>
            <ScrollView>
              {
                this.state.messageData === ""
                ?
                  <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text>
                      Data tidak ditemukan.
                    </Text>
                  </View>
                :
              <View style={{flex:1}}>
                {bodyDetail} 

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

                  <CardItem>
                    <Body style={{justifyContent:'center', alignItems:'center'}}>
                      <RekomendasiChart datanya={this.state.dataRekomendasi} />
                    </Body>
                  </CardItem>

                  <CardItem>
                    <Text>Keterangan :</Text>                
                  </CardItem>
                
                  <CardItem>
                    <FlatList
                      data={this.state.dataKeterangan}
                      keyExtractor={item => item.akronim}     
                      renderItem={({ item }) => ( 
                        <View style={{flexDirection:'row', width:'100%'}}>
                          <View style={{width:'20%'}}>
                            <Text>{item.akronim}</Text>                         
                          </View>

                          <View style={{width:'10%'}}>
                            <Text>=</Text>                          
                          </View>

                          <View style={{width:'70%'}}>
                            <Text>{item.job_family}</Text>                          
                          </View>
                        </View>
                      )}
                    />
                  </CardItem>
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
                      <KompetensiChart datanya={this.state.dataKompetensi}/>
                    </Body>
                  </CardItem>
                </Card>
              </View>
              }
            </ScrollView>   
            <Fab
              active={this.state.active}
              style={{ backgroundColor: '#092948' }}
              position="bottomRight"
              onPress={() => this.goFilterPage()}
            >         
              <Icon name="filter" type={'FontAwesome'} /> 
            </Fab>
                 
          </View>
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










