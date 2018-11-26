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
  FlatList
} from 'react-native';

//library
import  { Container, Header, Content, Form, Item, Input, 
  Label, Button, Text, Icon, Toast, Card, CardItem, Body,
  Right, Left, Title, Footer, FooterTab
} from 'native-base';
// import Carousel from 'react-native-looped-carousel';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import axios from 'axios';

//api services
import url from '../../../config/api_service';

//page styles header carousel
import { sliderWidth, itemWidth } from '../../../Assets/stylesHeader/sliderEntry.styles';
import { sliderWidthbody, itemWidthBody } from '../../../Assets/stylesHeader/sliderEntryBody.styles';
import stylesHeader, { colors } from '../../../Assets/stylesHeader/index.styles';

//page chart 
import RadarChartDetailScreen from '../../components/chart/radarDetailChart';

//const NIK
// import {NIK_KEY, TOKEN_KEY} from '../../../configs/constants';

const { width, height } = Dimensions.get('window');
const SLIDER_1_FIRST_ITEM = 0;

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: { width },
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      showLoader:true,

      //data user
      nik:'',  
      band:'',
      cfu_fu:'',    
      nama:'',
      posisi:'',
      divisi:'',
      foto:null,
      dataAssesment:[],
      dataWeakness:[],
      managerial:[],
      nonManagerial:[]
    };
  }

  componentWillMount(){

    AsyncStorage.getItem(NIK_KEY).then(res => {
      const nik = res;
      AsyncStorage.getItem(TOKEN_KEY).then(res => {
        const token = res;
        axios.get(`${url.APIDEV}getAssessment/${nik}`,{
          headers: { 'x-authorization': `bearer ${token}` }
        })
        .then((res) => {
          console.log(res.data);
    
          const namaUser      = res.data.data[0].nama;
          const band          = res.data.data[0].band;
          const cfu_fu        = res.data.data[0].cfu_fu;
          const posisiUser    = res.data.data[0].posisi;
          const divisi        = res.data.data[0].divisi;
          const dataAssesment = res.data.data[0].assessment;
          const foto          = res.data.data[0].foto;
    
          this.setState({
            dataAssesment:dataAssesment,
            showLoader:false,
    
            //data user
            nama:namaUser,
            posisi:posisiUser,
            band:band,
            cfu_fu:cfu_fu,
            divisi:divisi,
            foto:foto
          })
        })
        .catch((error) => {
          console.log(error)
          this.setState({
            showLoader:false
          })
        });
      })
    }).catch((error) => {
      console.log(error)
      this.setState({
        showLoader:false
      })
    })

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
            dotColor={'#000'}
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

      <Card style={{borderRadius:5}}>
        <CardItem style={{borderRadius:5}} header>
          <Text style={{fontSize:18, fontWeight:'bold', color:'#65d34c'}}>
            Strength
          </Text>
        </CardItem>

        <View style={{borderBottomColor:'#808080', borderBottomWidth:1, marginLeft:15, marginRight:15}}/>

        <CardItem>
          <Body>
            {
              item.strength_kompetensi.length === 0
                ?
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#858585', fontSize:14, textAlign:'center'}}>
                  -
                </Text>
              </View>
                :
            <FlatList
              data={item.strength_kompetensi}
              keyExtractor={item => item.id}     
              renderItem={({ item }) => ( 
                <View style={{paddingTop:5, paddingBottom:5, width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={{width:'90%', alignSelf:'center'}}>
                    <Text style={{color:'#858585', fontSize:14, textAlignVertical: 'center'}}>
                      {item.comp_name}
                    </Text>
                  </View>
                  <View style={{width:'10%'}}>
                    <Text style={{color:'#858585',fontSize:16, fontWeight:'bold'}}>
                      {item.jumlah}X
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
          <Text style={{fontSize:18, fontWeight:'bold', color:'#D2864b'}}>
            Weakness
          </Text>
        </CardItem>

        <View style={{borderBottomColor:'#808080', borderBottomWidth:1, marginLeft:15, marginRight:15}}/>

        <CardItem>
          <Body>
            {
            item.weakness_kompetensi.length === 0
                ?
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#858585', fontSize:14, textAlign:'center'}}>
                  -
                </Text>
              </View>
                :
            <FlatList
              data={item.weakness_kompetensi}
              keyExtractor={item => item.id}     
              renderItem={({ item }) => ( 
                <View style={{paddingTop:5, paddingBottom:5, width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={{width:'90%', alignSelf:'center'}}>
                    <Text style={{color:'#858585', fontSize:14, textAlignVertical: 'center'}}>
                      {item.comp_name}
                    </Text>
                  </View>
                  <View style={{width:'10%'}}>
                    <Text style={{color:'#858585',fontSize:16, fontWeight:'bold'}}>
                      {item.jumlah}X
                    </Text>
                  </View>
                </View>
              )}
            />
            }
          </Body>
        </CardItem>
      </Card>

      <Card noShadow style={{backgroundColor:'transparent', borderWidth:0, borderColor:'transparent'}}>
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
              keyExtractor={item => item.id.toString()}     
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
      <Container>
        <Header style={{backgroundColor:'#092948'}} noShadow={true}>
          <Left style={{flex: 2}}>
            <Button transparent onPress={() => this.goBack()}>
              <Icon name='arrow-back' type={'Ionicons'}/>
            </Button>
          </Left>
          <Body style={{flex: 4}}>
            <Title>Profile Assessment</Title>
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
            <View style={{backgroundColor:'#F3F3F3'}}>
                <View style={styles.header}>
                  <ImageBackground
                    style={{
                      height:'100%',
                      width:'100%',
                    }} 
                    resizeMode='cover' 
                    source={require('../../../Assets/logo/bg.png')}          
                  >
                    <View style={styles.headerContent}>
                      <View style={{width:'25%'}}>
                        <Image style={styles.avatar} source={{uri: this.state.foto}}/>                      
                      </View>

                      <View style={{flexDirection:'column', marginLeft:5, width:'75%', paddingLeft:5}}>
                        <Text style={styles.name}>
                          {this.state.nama}
                        </Text>
                        <Text style={styles.descUser}>
                          {this.state.nik}
                        </Text>
                        <Text style={styles.descUser}>
                          Band {this.state.band}
                        </Text>
                        <Text style={styles.descUser}>
                          {this.state.divisi}
                        </Text>
                        <Text style={styles.descUser}>
                          {this.state.cfu_fu}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
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

const styles = StyleSheet.create({
  header:{
    width:'100%',
    backgroundColor: "#092948",
    height:180
  },
  headerContent:{
    width:'100%',
    marginTop:20,
    padding:13,
    alignItems: 'flex-start',
    flexDirection:'row'
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 4,
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
    marginTop:140,
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
    marginTop:60,
    paddingLeft:10,
    paddingRight:10,
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
    fontSize:14
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
 