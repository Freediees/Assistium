import React, { Component } from 'react';
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

//library
import DeviceInfo from 'react-native-device-info';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, Icon, Toast} from 'native-base';
import axios from 'axios';
import { connect } from "react-redux";

//component
import renderIf from '../components/renderIf';

//configs
import url from '../../config/api_service';
const token = '';
const uniqueId = DeviceInfo.getUniqueID();

class Login extends Component {



  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:'',
      token:'',
      validationUsername:false,
      validationPassword:false,
    }
  }

  componentWillMount(){
    var value =  AsyncStorage.getItem('fcmToken');
    value.then((e)=>{
      this.setState({
       token: e,
      })
    })


  }

  validationForm(){
    const {username, password} = this.state;

    if (username === '' && password === '')
      {
        this.setState({
          validationUsername:true,
          validationPassword:true,
        })
        Toast.show({
          text: "Username / Password tidak boleh kosong",
          duration: 3000
        });
      }
    else{
      this.setState({
        validationUsername:false,
        validationPassword:false,
      }, () => {
        this.getLogin();
      })
    }
  }

  getLogin(){
    const {username, password, token} = this.state;

    this.props.dispatch({
      type:'LOGIN',
      payload:axios.post(`${url.API}/token`,{
        username: username,
        password: password,
        imei: uniqueId,
      }),
    })
  }



  render() {
    console.log( uniqueId );
    const {statusForm, loaderStatus, messageStatus} = this.props;
    return (
      <Container style={styles.containerNativeBase}>
        <ImageBackground
            style={{
              height:'100%',
              width:'100%',
              alignItems:'center',
              position: 'absolute',
              justifyContent:'center'
            }}
            resizeMode='stretch'
            source={require('../../Assets/logo/bg-login-mob.jpg')}
          >

          <Image
            resizeMode={'contain'}
            style={{
              marginTop: 20,
              height:100,
              width:350,
            }}
            source={require('../../Assets/logo/logo-aci.png')}
          />

          <Content padder style={{paddingLeft:15, paddingRight:15}}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

              <View style={styles.logoContainer}>
                <Image
                  resizeMode={'stretch'}
                  style={{
                    height:70,
                    width:280,
                  }}
                  source={require('../../Assets/logo/assistium-logo.png')}
                />
              </View>
              <View>
                <Form>
                  <Item last error={this.state.validationUsername} style={[styles.inputStyle,{marginTop:10}]}>
                    <Icon name='user' type={'FontAwesome'} style={{color:'#fff'}} />
                    <Input onChangeText={(text) => {this.setState({username:text})}} style={{color:'#fff'}} placeholder={'Username'} placeholderTextColor={'#FFF'} keyboardType={'email-address'}/>
                  </Item>

                  <Item last error={this.state.validationPassword} style={[styles.inputStyle,{marginTop:15}]}>
                    <Icon name='lock' type={'FontAwesome'} style={{color:'#fff'}}/>
                    <Input onChangeText={(text) => {this.setState({password:text})}} secureTextEntry style={{color:'#fff'}} placeholder={'Password'} placeholderTextColor={'#FFF'}/>
                  </Item>
                </Form>
              </View>

              <View>
                <Button full style={styles.buttonLogin} primary onPress={() => {this.validationForm()}}>
                  {
                    loaderStatus
                      ?
                        <ActivityIndicator size="small" color="#000" />
                      :
                        <Text style={{color:'#000'}}>LOGIN</Text>
                  }
                </Button>
              </View>

              {renderIf(!statusForm)(
                <View style={styles.containerStatusError}>
                  <Text style={styles.statusError}>
                    {messageStatus}
                  </Text>
                </View>
              )}
            </KeyboardAvoidingView>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.LoginReducer.status,
  loaderStatus:state.LoginReducer.loaderStatus,
  statusForm:state.LoginReducer.statusErrorFrom,
  messageStatus:state.LoginReducer.messageStatus
})

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  containerNativeBase:{
    backgroundColor:'#FFF',
    flex:1
  },
  container: {
    marginTop:Platform.OS === 'ios' ? '40%' : 150
  },
  logoContainer:{
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    flexGrow:1,
  },
  loaderContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputStyle:{
    borderBottomWidth:2,
    borderBottomColor:'#FFF'
  },
  buttonLogin:{
    marginTop:15,
    backgroundColor:'#FFF',
    borderRadius:5
  },

  //keterangan status
  containerStatusError:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    backgroundColor:'rgba(0,0,0,0.4)',
  },
  statusError:{
    textAlign:'center',
    color:'#f1c40f',
    fontWeight:'bold'
  }
});
