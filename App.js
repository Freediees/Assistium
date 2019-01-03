import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import OneSignal from 'react-native-onesignal';
import {
    Container, Header, Title, Content, Text,
    Button, Icon, Left, Right, Body, Badge,
    List, ListItem, CheckBox, AsyncStorage
} from 'native-base';
import { View, ListView } from 'react-native';

class App extends React.Component {

  constructor(properties) {
    super(properties);
    OneSignal.init('f004d3ec-6a4a-48b9-bd1b-e9786823d2de');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }


  async componentWillMount(){
    //firebase.messaging().subscribeToTopic("assistiumperuri");
    //this.checkPermission();
    //this.createNotificationListeners();
  }

  componentWillUnmount() {
    //this.notificationListener();
    //this.notificationOpenedListener();
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

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  async createNotificationListeners() {



      this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
          console.log('oke1');

          const channel = new firebase.notifications.Android.Channel('vtrz', 'vtrChannel', firebase.notifications.Android.Importance.High)
            .setDescription('vtrChannel');

          firebase.notifications().android.createChannel(channel);

          const abc = new firebase.notifications.Notification()
          .setNotificationId('fcmNotification.data.notificacionId')
          .setTitle('abc')
          .setBody('abc');


          console.log(channel.channelId);
          abc
          .android.setChannelId(channel.channelId)
          .android.setBigPicture('https://nomortelepon.id/wp-content/uploads/2016/10/telkom-indonesia.jpg')
          .android.setLargeIcon('https://nomortelepon.id/wp-content/uploads/2016/10/telkom-indonesia.jpg')
          .android.setColor('red');

      });
      this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
          // Process your notification as required
          console.log('oke2');
          const channel = new firebase.notifications.Android.Channel('vtrz', 'vtrChannel', firebase.notifications.Android.Importance.High)
            .setDescription('vtrChannel');

          firebase.notifications().android.createChannel(channel);

          const abc = new firebase.notifications.Notification()
          .setNotificationId('fcmNotification.data.notificacionId')
          .setTitle('abc')
          .setBody('abc');


          console.log(channel.channelId);
          abc
          .android.setChannelId(channel.channelId)
          .android.setBigPicture('https://nomortelepon.id/wp-content/uploads/2016/10/telkom-indonesia.jpg')
          .android.setLargeIcon('https://nomortelepon.id/wp-content/uploads/2016/10/telkom-indonesia.jpg')
          .android.setColor('red');

          firebase.notifications().displayNotification(abc);
      });



      /*
      * Triggered when a particular notification has been received in foreground
      * */
      this.notificationListener = firebase.notifications().onNotification((notification) => {
          console.log(notification);
          const { title, body } = notification;

          // const channel = new firebase.notifications.Android.Channel('vtrz', 'vtrChannel', firebase.notifications.Android.Importance.High)
          //   .setDescription('vtrChannel');
          //
          // firebase.notifications().android.createChannel(channel);
          //
          // const abc = new firebase.notifications.Notification()
          // .setNotificationId('fcmNotification.data.notificacionId')
          // .setTitle(title)
          // .setBody(body);
          //
          //
          // console.log(channel.channelId);
          // abc
          // .android.setChannelId(channel.channelId)
          // .android.setBigPicture('https://nomortelepon.id/wp-content/uploads/2016/10/telkom-indonesia.jpg')
          // .android.setLargeIcon('https://nomortelepon.id/wp-content/uploads/2016/10/telkom-indonesia.jpg')
          // .android.setColor('red');
          //
          // firebase.notifications().displayNotification(abc);
          //this.showAlert(title, body);
      });





      /*
      * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
      * */
      this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
          const { title, body } = notificationOpen.notification;
          //this.showAlert(title, body);
          console.log(notificationOpen.notification);


      });

      /*
      * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
      * */
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
          const { title, body } = notificationOpen.notification;
          console.log(notificationOpen.notification);
          //this.showAlert(title, body);
      }
      /*
      * Triggered for data only payload in foreground
      * */
      this.messageListener = firebase.messaging().onMessage((message) => {
        //process data message
        console.log(JSON.stringify(message));
      });
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
            <View />
        );
    }
}


export default App;
