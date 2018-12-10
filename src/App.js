import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";
import { Root } from "native-base";
import firebase from 'react-native-firebase';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import AppNavigation from "./navigations";
import configureStore from "./store/store";

const { store, persistor } = configureStore();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      platformSystem:'',
      versionApps:'',
    };
  }

  async componentWillMount(){
    firebase.messaging().subscribeToTopic("assistiumperuri");
    this.checkPermission();
  }
  async checkPermission(){
    firebase.messaging().hasPermission()
    .then(enabled => {
      if (enabled) {
          console.log('Permission Granted');
          this.getToken();
      } else {
          console.log('Permission Request');
        this.requestPermission();
      }
    });

    // const enabled = await firebaase.messaging().hasPermission();
    // if(enabled){
    //   this.getToken();
    // }else{
    //   this.requestPermission();
    // }
  }

  async getToken(){
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log('before fcmtoken :', fcmToken);
    if(!fcmToken){
      fcmToken = await firebase.messaging().getToken();
      console.log('after fcmtoken :', fcmToken);
      if(fcmToken){
        await AsyncStorage.setItem( 'fcmToken', fcmToken);
      }
    }
  }

  async requestPermission(){
    firebase.messaging().requestPermission()
      .then(() => {
        // User has authorised
        this.getToken();
      })
      .catch(error => {
        // User has rejected permissions
        console.log('permission Rejected');
      });
    }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<View style={{justifyContent:'center', alignItems:'center', flex:1}}><Text style={{textAlign:'center'}}>Loading...</Text></View>} persistor={persistor}>
          <Root>
            <AppNavigation />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}
