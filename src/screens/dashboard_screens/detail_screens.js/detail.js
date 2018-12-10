import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  FlatList,
  AsyncStorage,
  Linking,
  PermissionsAndroid
} from 'react-native';

//library
import  { Container, Header, Content, Form, Item, Input,
  Label, Button, Text, Icon, Toast, Card, CardItem, Body,
  Right, Left, Title, Footer, FooterTab, Fab
} from 'native-base';
import {connect} from 'react-redux';
// import Carousel from 'react-native-looped-carousel';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import axios from 'axios';

//api services
import url from '../../../config/api_service';

//page styles header carousel
import { sliderWidth, itemWidth } from '../../../Assets/stylesHeader/sliderEntry.styles';
import { sliderWidthbody, itemWidthBody } from '../../../Assets/stylesHeader/sliderEntryBody.styles';
import stylesHeader, { colors } from '../../../Assets/stylesHeader/index.styles';
import RekomendasiProfil from '../../components/RekomendasiProfil';

//page chart
import RadarChartDetailScreen from '../../components/chart/radarDetailChart';

const { width, height } = Dimensions.get('window');
const SLIDER_1_FIRST_ITEM = 0;

class DetailFilter extends Component {
  constructor(props){
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      size: { width },
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      showLoader:true,

      //data user
      nik:params.nik,
      nama:'',
      posisi:'',
      foto:null,
      dataAssesment:[],
      dataWeakness:[],
      managerial:[],
      nonManagerial:[]
    };
  }

  componentWillMount(){
    const {token, compdep_id} = this.props;
    const {nik} = this.state;

    axios.get(`${url.API}/assessment/${compdep_id}/${nik}`, {
      headers: { 'x-Authorization': `bearer ${token}` }
    }).then((res) => {
      console.log(res.data);

      const namaUser      = res.data.data[0].nama;
      const posisiUser    = res.data.data[0].posisi;
      const dataAssesment = res.data.data[0].assessment;
      const fotoUser          = res.data.data[0].foto;

      this.setState({
        showLoader:false,

        //data user
        dataAssesment:dataAssesment,
        nama:namaUser,
        posisi:posisiUser,
        foto: fotoUser,
      })

      //proses pengambilan foto user
      // axios.get(`${foto}`).then((res) => {
      //   const resultImage = res.data.data.foto
      //   console.log(resultImage)
      // }).catch((err) => {
      //   alert(err)
      // })

    }).catch((error) => {
      console.log(error)
      this.setState({
        showLoader:false
      })
    });
  }



  getPDF() {
    //this.handleDownload();
    const url_pdf = 'https://apifactory.telkom.co.id:8243/HCM/Assistium/v1/external/getPdf/656103/26/0/ya';
    Linking.openURL(url_pdf);
  }


  goBack(){
    this.props.navigation.goBack();
  }

  _renderHeader ({item, index}) {
    return (
        <Card style={{borderRadius:30}}>
          <CardItem style={{borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius:30, borderBottomRightRadius:30}}>
            <Body style={{justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:18, textAlign:'center', fontWeight:'bold'}}>{item.job_target}</Text>
              <Text style={{fontSize:14, textAlign:'center'}}>{item.tanggal}</Text>
            </Body>
          </CardItem>
        </Card>
    );
  }

  headerBP() {
    const { slider1ActiveSlide } = this.state;

    return (
        <View>
          <Carousel
            ref={c => this._slider1Ref = c}
            data={this.state.dataAssesment} //data nya
            renderItem={this._renderHeader} //component tampilannya
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem={SLIDER_1_FIRST_ITEM} //component dimulai dari 0
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            // inactiveSlideShift={20}
            containerCustomStyle={stylesHeader.slider}
            contentContainerCustomStyle={stylesHeader.sliderContentContainer}
            loop={false}
            autoplay={false}
            onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
          />
          <Pagination
            dotsLength={this.state.dataAssesment.length}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={stylesHeader.paginationContainer}
            dotColor={'#FE000C'}
            dotStyle={stylesHeader.paginationDot}
            inactiveDotColor={colors.black}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
        </View>
    );
}


_renderBodyProfile ({item, index}) {

  const dataChart = item.profile_kompetensi
  return (
    <View style={{marginBottom:10}}>
      <Card style={{borderRadius:5}}>
        <CardItem style={{borderRadius:5}}>
          <Left>
            <Text style={[styles.titleKompetensi,{fontWeight:'bold'}]}>
              Profil Kompetensi
            </Text>
            <Text style={styles.titleKompetensi}>
              {item.job_target}
            </Text>
          </Left>
        </CardItem>

        <CardItem>
          <Body style={{justifyContent:'center', alignItems:'center'}}>
            <RadarChartDetailScreen dataRadar={dataChart}/>
          </Body>
        </CardItem>
      </Card>

      <Card style={{ borderRadius: 5 }} >
        <CardItem style={{ borderRadius: 5 }}>
        <Left>
          <Text style={[styles.titleKompetensi, { fontWeight: 'bold' }]} >
            Profil Rekomendasi
          </Text>
        </Left>
        </CardItem>

      { /*
        <CardItem style={{ borderRadius: 5 }}>
        <Left>
          <Text style={[styles.titleKompetensi, { fontWeight: 'default' }]} >
            Kategori : {item.profile_recommendation.MANAGERIAL[0].kategori}
          </Text>
        </Left>
        </CardItem>

        <CardItem style={{ borderRadius: 5 }}>
        <Left>
        <Text style={[styles.titleKompetensi, { fontWeight: 'default' }]} >
          Job Name : {item.profile_recommendation.MANAGERIAL[0].job_name}
        </Text>
        </Left>
        </CardItem>

        <CardItem style={{ borderRadius: 5 }}>
        <Left>
          <Text style={[styles.titleKompetensi, { fontWeight: 'default' }]} >
            Rekomendasi : {item.profile_recommendation.MANAGERIAL[0].rekomendasi}
          </Text>
        </Left>
        </CardItem>
        */
      }
          <RekomendasiProfil
            kategori={item.profile_recommendation.MANAGERIAL[0].kategori}
            jobName={item.profile_recommendation.MANAGERIAL[0].job_name}
            rekomendasi={item.profile_recommendation.MANAGERIAL[0].rekomendasi}
            kategorirecom={item.profile_recommendation.MANAGERIAL[0].kategorirecom}
            sample1={item.profile_recommendation}
          />

        <CardItem style={{ borderRadius: 5, flex: 1 }}>
          <Button
            block
            rounded
            info
            style={{ margin: 10, flex: 1 }}
            onPress={() => {
              const urlPdf = `https://apifactory.telkom.co.id:8243/HCM/Assistium/v1/external/getPdf/${item.projpart_id}/26/0/ya`;
              Linking.openURL(urlPdf);
              }
            }
          >
            <Text>Download Report</Text>
          </Button>
        </CardItem>
      </Card>



      {/* <Card noShadow style={{backgroundColor:'transparent', borderWidth:0, borderColor:'transparent'}}>
        <CardItem style={{backgroundColor:'transparent'}} header>
          <Text style={{fontSize:18, fontWeight:'bold', color:'#2c3e50'}}>
            Profil Rekomendasi
          </Text>
        </CardItem>
      </Card>

      <Card style={{borderRadius:5}}>
        <CardItem style={{borderRadius:5}} header>
          <Text style={{fontSize:18, fontWeight:'bold', color:'#2c3e50'}}>
            MGR
          </Text>
        </CardItem>

        <View style={{borderBottomColor:'#808080', borderBottomWidth:1, marginLeft:15, marginRight:15}}/>

        <CardItem>
          <Body>
            {
            item.profile_recommendation.MANAGERIAL.length === 0
                ?
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#858585', fontSize:14, textAlign:'center'}}>
                  -
                </Text>
              </View>
                :
            <FlatList
              data={item.profile_recommendation.MANAGERIAL}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={{paddingTop:5, paddingBottom:5, width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={{width:'90%', alignSelf:'center'}}>
                    <Text style={{color:'#858585', fontSize:14, textAlignVertical: 'center'}}>
                      {item.job_name}
                    </Text>
                  </View>
                  <View style={{width:'10%'}}>
                    <Text style={{color:'#858585',fontSize:16, fontWeight:'bold'}}>
                      {
                        item.rekomendasi === 'READY WITH DEVELOPMENT'
                          ?
                            <Icon name={'emoticon-neutral'} type={'MaterialCommunityIcons'} style={{color:'#f1c40f'}}/>
                          :
                        item.rekomendasi === 'READY NOW'
                          ?
                            <Icon name={'emoticon-happy'} type={'MaterialCommunityIcons'} style={{color:'#2ecc71'}}/>
                          :
                            <Icon name={'emoticon-sad'} type={'MaterialCommunityIcons'} style={{color:'#e74c3c'}}/>
                      }
                    </Text>
                  </View>
                </View>
              )}
            />
            }
          </Body>
        </CardItem>
      </Card>

      <Card style={{borderRadius:5}}>
        <CardItem style={{borderRadius:5}} header>
          <Text style={{fontSize:18, fontWeight:'bold', color:'#2c3e50'}}>
            NON MGR
          </Text>
        </CardItem>

        <View style={{borderBottomColor:'#808080', borderBottomWidth:1, marginLeft:15, marginRight:15}}/>

        <CardItem>
          <Body>
            {
              item.profile_recommendation.NON_MANAGERIAL.length === 0
                ?
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#858585', fontSize:14, textAlign:'center'}}>
                  -
                </Text>
              </View>
                :
            <FlatList
              data={item.profile_recommendation.NON_MANAGERIAL}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={{paddingTop:5, paddingBottom:5, width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={{width:'90%', alignSelf:'center'}}>
                    <Text style={{color:'#858585', fontSize:14, textAlignVertical: 'center'}}>
                      {item.job_name}
                    </Text>
                  </View>
                  <View style={{width:'10%'}}>
                    <Text style={{color:'#858585',fontSize:16, fontWeight:'bold'}}>
                      {
                        item.rekomendasi === 'READY WITH DEVELOPMENT'
                          ?
                            <Icon name={'emoticon-neutral'} type={'MaterialCommunityIcons'} style={{color:'#f1c40f'}}/>
                          :
                        item.rekomendasi === 'READY NOW'
                          ?
                            <Icon name={'emoticon-happy'} type={'MaterialCommunityIcons'} style={{color:'#2ecc71'}}/>
                          :
                            <Icon name={'emoticon-sad'} type={'MaterialCommunityIcons'} style={{color:'#e74c3c'}}/>
                      }
                    </Text>
                  </View>
                </View>
              )}
            />
            }
          </Body>
        </CardItem>
      </Card>
     */}
    </View>
  );
}

bodyCarousel() {
  const { slider1ActiveSlide } = this.state;
    return (
        <View>
          <Carousel
            carouselRef={this._slider1Ref}
            firstItem={slider1ActiveSlide}
            data={this.state.dataAssesment}
            renderItem={this._renderBodyProfile}
            sliderWidth={sliderWidthbody}
            itemWidth={itemWidthBody}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={1}
            enableMomentum={true}
            activeSlideAlignment={'start'}
            // containerCustomStyle={styles.slider}
            // contentContainerCustomStyle={styles.sliderContentContainer}
            activeAnimationType={'spring'}
            activeAnimationOptions={{
                friction: 4,
                tension: 40
            }}
            scrollEnabled={false}
          />
        </View>
    );
}



  render() {
    const header = this.headerBP();
    const bodyDetail = this.bodyCarousel();

    return (
      <Container style={{backgroundColor:'#FFF'}}>
        <Header style={{backgroundColor:'#FE000C', borderBottomWidth:0}} noShadow>
          <Left style={{flex: 2}}>
            <Button transparent onPress={() => this.goBack()}>
              <Icon name='arrow-back' type={'Ionicons'} style={{color:'#FFF'}}/>
            </Button>
          </Left>
          <Body style={{flex: 4}}>
            <Title style={{color:'#FFF'}}>Detail Assessment</Title>
          </Body>
          <Right style={{flex: 2}}/>
        </Header>

        {
          this.state.showLoader
            ?
        <ActivityIndicator size="large" color="#2c3e50" />
            :
        <ScrollView>
          <Content>
            <View>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <Image style={styles.avatar} source={{uri: this.state.foto}}/>
                  </View>

                  <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.name}>
                      {this.state.nama}
                    </Text>
                    <Text style={styles.descUser}>
                      {this.state.posisi}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.profileDetail}>
                <View style={styles.detailContent}>
                  { header }
                </View>
              </View>

              <View style={styles.bodyContent}>
                {bodyDetail}
              </View>

            </View>
          </Content>
        </ScrollView>
      }
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.LoginReducer.token,
  compdep_id:state.LoginReducer.compdep_id,
  nik_user:state.LoginReducer.nik_user
})

export default connect(mapStateToProps)(DetailFilter);

const styles = StyleSheet.create({
  header:{
    width:'100%',
    backgroundColor: "#FE000C",
    height:150,
    borderBottomRightRadius:100,
    borderBottomLeftRadius:100,
    marginBottom:20
  },
  headerContent:{
    justifyContent:'center',
    width:'100%',
    alignItems: 'center',
    flexDirection:'column'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:16,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:150,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    borderRadius:30,
    backgroundColor: 'transparent',
    // elevation:3
  },
  detailContent:{
    alignItems: 'center',
    borderRadius:30
  },
  title:{
    fontSize:20,
    color: "#00CED1"
  },
  bodyContent: {
    marginTop:100,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#ecf0f1'
  },
  cardContainer: {
    marginTop:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  },
  description:{
    fontSize:20,
    color: "#00CED1",
    marginTop:10,
    textAlign: 'center'
  },
  containerCarousels:{
    height:70,
    width:338,
    borderRadius:5,
  },
  headerButton:{
    backgroundColor: '#000000',
    height:80,
    borderRadius:5,
    elevation:3 ,
  },
  descUser:{
    color:'#FFFFFF',
    fontSize:12
  },
  titleKompetensi:{
    fontSize:16
  },
  containerTwoCard:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:10,
    marginBottom:20
  },
  containerStrengthTable:{
    backgroundColor:'#fff',
    // height:150,
    width:'45%',
    borderRadius:5,
    elevation:3,
  },
  containerWeaknessTable:{
    backgroundColor:'#fff',
    // height:150,
    width:'45%',
    borderRadius:5,
    elevation:3
  },
  headerCardStrength:{
    backgroundColor:'#65d34c',
    alignItems:'center',
    justifyContent:'center',
    padding:5,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  headerCardWeakness:{
    backgroundColor:'#d2864b',
    alignItems:'center',
    justifyContent:'center',
    padding:5,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  }
});
