import React, { Component } from 'react';
import { View } from 'react-native';
import  { Container, Header, Content, Form, Item, Input,
  Label, Button, Text, Icon, Toast, Card, CardItem, Body,
  Right, Left, Title, Footer, FooterTab, Fab, Thumbnail
} from 'native-base';

class RekomendasiProfil extends Component {

  renderEmot(status){
    switch (status) {
      case '1':
        return <Thumbnail style={{ width: 20, height: 20 }} source={require('../../Assets/logo/smile.png')} />;
      case '2':
        return <Thumbnail style={{ width: 20, height: 20 }} source={require('../../Assets/logo/meh.png')} />;
      case '3':
        return <Thumbnail style={{ width: 20, height: 20 }} source={require('../../Assets/logo/sad.png')} />;
      default:
        return <Thumbnail style={{ width: 20, height: 20 }} source={require('../../Assets/logo/sad.png')} />;
    }
  }

  renderItem(item){
    const { rekomendasi, kategorirecom, job_name } = item
    return(
        <CardItem style={{ borderRadius: 5 }}>
          <Left style={{flex: 4}}>
            <Text style={{ fontSize: 14, color: 'grey' }}>{job_name}</Text>
          </Left>
          <Right style={{flex: 1}}>
            {this.renderEmot(kategorirecom)}
          </Right>
        </CardItem>
    );
  }

  renderContent(data){
    return data.map( item => {
      return this.renderItem(item);
    });
  }
  render() {
    const { kategori, jobName, rekomendasi, kategorirecom, sample1 } = this.props;

    console.log(sample1.MANAGERIAL);
    return (
      <View>
        {this.renderContent(sample1.MANAGERIAL)}
      </View>
    );
  }
}

export default RekomendasiProfil;
