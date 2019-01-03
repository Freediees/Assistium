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
        return (
          <Right style={{flex: 3, flexDirection: 'row'}}>
            <View style={{ flex: 1, height: 30, backgroundColor: 'grey', margin: 5}} />
            <View style={{ flex: 1, height: 30, backgroundColor: 'grey', margin: 5}} />
            <View style={{ flex: 1, height: 30, backgroundColor: '#00CEA8', margin: 5, justifyContent: 'center', alignItems:'center'}}>
              <Icon name="check-circle" type={'FontAwesome'} style={{color: '#fff'}} />
            </View>
          </Right>
        );
      case '2':
          return (
            <Right style={{flex: 3, flexDirection: 'row'}}>
              <View style={{ flex: 1, height: 30, backgroundColor: 'grey', margin: 5}} />
              <View style={{ flex: 1, height: 30, backgroundColor: '#FFCE00', margin: 5, justifyContent: 'center', alignItems:'center'}} >
                <Icon name="check-circle" type={'FontAwesome'} style={{color: '#fff'}} />
              </View>
              <View style={{ flex: 1, height: 30, backgroundColor: 'grey', margin: 5}} />
            </Right>
          );
      case '3':
          return (
            <Right style={{flex: 3, flexDirection: 'row'}}>
              <View style={{ flex: 1, height: 30, backgroundColor: '#FB2F23', margin: 5, justifyContent: 'center', alignItems:'center'}}>
                <Icon name="check-circle" type={'FontAwesome'} style={{color: '#fff'}} />
              </View>
              <View style={{ flex: 1, height: 30, backgroundColor: 'grey', margin: 5}} />
              <View style={{ flex: 1, height: 30, backgroundColor: 'grey', margin: 5}} />
            </Right>
          );
      default:
          return (
            <Right style={{flex: 3, flexDirection: 'row'}}>
              <View style={{ flex: 1, height: 30, backgroundColor: 'grey', margin: 5}} />
              <View style={{ flex: 1, height: 30, backgroundColor: 'grey', margin: 5}} />
              <View style={{ flex: 1, height: 30, backgroundColor: 'grey', margin: 5}} />
            </Right>
          );
    }
  }

  renderItem(item){
    const { rekomendasi, kategorirecom, job_name } = item
    return(
        <View key={job_name} style={{marginBottom: 10}}>
          <View style={{ borderRadius: 5, marginBottom: 0, flexDirection: 'row', paddingHorizontal: 10 }}>
            <Left style={{flex: 1}}>
            </Left>
            <Right style={{flex: 3, flexDirection: 'row'}}>
              <View style={{flex: 1, margin: 5, justifyContent: 'flex-end'}}>
                <Text style={{ fontSize: 12, color: 'grey'}}>Not Ready</Text>
                <View style={{height: 2, backgroundColor: 'grey' }} />
              </View>
              <View style={{flex: 1, margin: 5, justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 12, color: 'grey' }}>Ready With Development</Text>
                <View style={{ height: 2, backgroundColor: 'grey' }} />
              </View>
              <View style={{flex: 1, margin: 5, justifyContent: 'flex-end'}}>
                <Text style={{ fontSize: 12, color: 'grey' }}>Ready Now</Text>
                <View style={{ height: 2, backgroundColor: 'grey' }} />
              </View>
            </Right>
          </View>
          <View style={{ borderRadius: 5, marginBottom: 0, paddingHorizontal: 10, flexDirection: 'row' }}>
            <Left style={{flex: 1}}>
              <Text style={{ fontSize: 10, color: 'grey', paddingLeft: 10}}>{job_name}</Text>
            </Left>
              {this.renderEmot(kategorirecom)}
              {
                // <Right style={{flex: 3, flexDirection: 'row'}}>
                // <View style={{ flex: 1, height: 30, backgroundColor: '#FB2F23', margin: 5}} />
                // <View style={{ flex: 1, height: 30, backgroundColor: '#FFCE00', margin: 5}} />
                // <View style={{ flex: 1, height: 30, backgroundColor: '#00CEA8', margin: 5}} />
                // </Right>
              }
          </View>
        </View>
    );
  }

  renderContent(data){
    return data.map( item => {
      return this.renderItem(item);
    });
  }
  render() {
    const { kategori, jobName, rekomendasi, kategorirecom, sample1 } = this.props;

    return (
      <View>
        {this.renderContent(sample1.MANAGERIAL)}
      </View>
    );
  }
}

export default RekomendasiProfil;
