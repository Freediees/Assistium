import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
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
  Right, Left, Title, Footer, FooterTab, InputGroup, Thumbnail, Fab
} from 'native-base';
import { connect } from "react-redux";
import axios from 'axios';

//url
import url from '../../../config/api_service';

class Search extends Component {

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    console.log(params.url);

    this.state = {
      dataSearch:null,
      showLoader:true,
      showLoaderLoad:false,
      showData:20,
      page:0,
      textHasilSearch:'',
      refreshing:false,
      dataInputnya:'',
      token:''
    };
  }

  componentWillMount(){
    const { params } = this.props.navigation.state;
    const {compdep_id, token} = this.props;
    axios.get(`${params.url}`,{
      headers: { 'x-Authorization': `bearer ${token}` }
    })
    .then((res) => {
      const status = res.data.status;
      if(status === 'failed'){
        const textSearch = res.data.message
        this.setState({
          showLoader:false,
          textHasilSearch:textSearch,
          dataSearch:null
        })

        console.log(res)
      } else {
        console.log(res)
        const dataHasil  = res.data.data;
        const textSearch = res.data.message;
        this.setState({
          showLoader:false,
          dataSearch:this.state.page === 0 ? dataHasil : [...this.state.dataSearch, ...dataHasil],
            // dataSearch:dataHasil,
          textHasilSearch:textSearch,
        })
      }
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        showLoader:false,
        refreshing:false
      })
    });
  }
  goBack(){
    this.props.navigation.goBack();
  }

  goFilterPage(){
    this.props.navigation.navigate('FilterPageSearch',{default:`${this.state.dataInputnya}`});
  }

  renderGetData(){
    if(this.state.dataInputnya === ''){
      Toast.show({
        text: "Silahkan masukan data yang ingin dicari",
        duration: 3000
      });
    } else {
        const {compdep_id, token} = this.props;
        let {dataInputnya} = this.state;
        this.setState({
          showLoader:true
        })

        axios.get(`${url.API}/search/${compdep_id}/null/null/null/0/${dataInputnya}/10/0`,{
          headers: { 'x-Authorization': `bearer ${token}` }
        })
        .then((res) => {
          const status = res.data.status;
          if(status === 'failed'){
            const textSearch = res.data.message
            this.setState({
              showLoader:false,
              textHasilSearch:textSearch,
              dataSearch:[]
            })

            console.log(res)
          } else {
            console.log(res)
            const dataHasil  = res.data.data;
            const textSearch = res.data.message;
            this.setState({
              showLoader:false,
              dataSearch:this.state.page === 0 ? dataHasil : [...this.state.dataSearch, ...dataHasil],
                // dataSearch:dataHasil,
              textHasilSearch:textSearch,
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.setState({
            showLoader:false,
            refreshing:false
          })
        });
    }
  }

  // dataCoba = () => {
  //   const token = this.state.token;
  //   axios.get(`${url.APIDEV}search/${this.state.dataInputnya}/${this.state.showData}/${this.state.page}`,{
  //     headers: { 'x-authorization': `bearer ${token}` }
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       const status = res.data.status;
  //       if(status === 'failed')
  //         {
  //           const textSearch = res.data.message
  //           this.setState({
  //             showLoaderLoad:false,
  //             refreshing:false,
  //             textHasilSearch:textSearch
  //           })
  //         }
  //       else
  //         {
  //           const dataHasil  = res.data.data
  //           const textSearch = res.data.message
  //           this.setState({
  //             showLoaderLoad:false,
  //             dataSearch:this.state.page === 0 ? dataHasil : [...this.state.dataSearch, ...dataHasil],
  //             // dataSearch:dataHasil,
  //             textHasilSearch:textSearch,
  //             refreshing:false
  //           })
  //         }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       this.setState({
  //         showLoaderLoad:false,
  //         refreshing:false
  //       })
  //     });
  // }

  // renderFooter = () => {
  //   if(this.state.dataSearch.length < 10)
  //     {
  //       return null
  //     }

  //   else
  //     {
  //       if (!this.state.showLoaderLoad) return null;

  //       return (
  //         <View
  //           style={{
  //             paddingVertical: 20,
  //           }}
  //         >
  //           <ActivityIndicator animating size="large" color={'#2c3e50'}/>
  //         </View>
  //       );
  //     }

  // };

  // handleRefresh = () => {
  //   this.setState(
  //     {
  //       refreshing: true
  //     },() => {
  //       // setTimeout(() => {
  //         this.dataCoba();
  //       // }, 100);
  //     }
  //   );
  // };

  // handleLoadMore = () => {
  //   this.setState(
  //     {
  //       showData:this.state.showData + 10
  //     },() => {
  //       // setTimeout(() => {
  //         this.dataCoba();
  //       // }, 100);
  //     }
  //   );
  // };

  renderHeader = () => {
    return <View style={{margin:5}}><Text style={{color:'#e74c3c', textAlign:'center'}}>{this.state.textHasilSearch || 'Data Tidak Ditemukan'}</Text></View>
  };

  renderDetail(data){
    this.props.navigation.navigate('Detail',{nik:`${data}`});
  }

  renderFlatlist(){
    console.log(this.state.dataSearch);
    if(this.state.dataSearch !== null){
      console.log('masuk');
      return(
        <FlatList
        data={this.state.dataSearch}
        keyExtractor={item => item.nik}
        renderItem={({ item }) => (


          <Card style={{borderRadius: 5 }}>
          <CardItem style={{borderRadius: 5 }} button onPress={() => this.renderDetail(item.nik)}>
            <Left>
              <Thumbnail large source={{uri: item.foto}} style={{marginRight: 10}}/>
              <Body style={{ margin: 0, height: 70}}>
                <Text>{item.nama} / {item.nik}</Text>
                <Text note>{item.posisi}</Text>
              </Body>
            </Left>

          </CardItem>
          </Card>

        )}
        ListHeaderComponent={() => this.renderHeader()}

        />
      );
    } else {
      return <View style={{margin:5}}><Text style={{color:'#e74c3c', textAlign:'center'}}>{this.state.textHasilSearch}</Text></View>;
    }


  }

  render() {
    return (
      <Container style={{backgroundColor:'#FFF'}}>
        <Header style={{backgroundColor:'#FE000C'}} searchBar>
          <Left>
            <Button transparent onPress={() => this.goBack()}>
              <Icon name='arrow-back' type={'Ionicons'} style={{color:'#FFF'}}/>
            </Button>
          </Left>

          <Body searchBar style={{flex:Platform.OS === 'ios' ? 6 : 3}}>
            {/* <Title>Pencarian</Title> */}
            <InputGroup regular style={{backgroundColor:'#fff', elevation:2, width:'100%',borderRadius:10}}>
                <Input
                  placeholder={'Search People'}
                  style={{height:40, fontSize:14}}
                  // onChangeText={this.renderText.bind(this)}
                  onChangeText={(text) => this.setState({dataInputnya: text})}
                  onSubmitEditing={() => this.renderGetData()}
                />
                <TouchableOpacity onPress={() => this.renderGetData()} style={{marginRight:10}}>
                  <Icon name='search' style={{color:'#080808'}} />
                </TouchableOpacity>
            </InputGroup>
          </Body>
        </Header>

        <View style={{padding:10}}>
          {this.renderFlatlist()}
        </View>

        <Fab
          active={this.state.active}
          style={{ backgroundColor: '#404040' }}
          position="bottomRight"
          onPress={() => this.goFilterPage()}
        >
          <Icon name="filter" type={'FontAwesome'} />
        </Fab>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.LoginReducer.token,
  compdep_id:state.LoginReducer.compdep_id,
  nik_user:state.LoginReducer.nik_user
})

export default connect(mapStateToProps)(Search);

const styles = StyleSheet.create({
  image: {
    width: 100,
    height:100,
    borderRadius:50
  },
  box: {
    padding:20,
    margin:5,
    borderRadius:5,
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation:3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  boxContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
  },
  description:{
    fontSize:15,
    color: "#646464",
  },
  title:{
    fontSize:18,
    color:"#151515",
  }
});
