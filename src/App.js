import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Root } from "native-base";
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